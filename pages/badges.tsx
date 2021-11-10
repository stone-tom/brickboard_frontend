import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GetStaticProps } from 'next';
import router from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../context/custom_store';
import { BadgeList } from '../elements/badges/components/BadgeList/BadgeList.styles';
import { BadgeHeading } from '../elements/badges/components/BadgePage.styles';
import UserList from '../elements/badges/container/UserList/UserList';
import ButtonComponent from '../elements/core/components/Button/Button';
import FormInput from '../elements/core/components/FormInput/FormInput';
import Layout from '../elements/core/container/Layout/Layout';
import { CheckboxWrapper } from '../elements/news/container/NewsCreator/NewsCreator.styles';
import Badge from '../elements/profile/components/Badge/Badge';
import IBadge from '../models/IBadge';
import { MessageType } from '../models/IMessage';
import IUser from '../models/IUser';
import { FlexLeft, FlexRight } from '../styles/global.styles';
import {
  assignUsersToBadge,
  backendURL,
  createBadge,
  deleteBadge,
  getBadges,
  removeUsersFromBadge,
} from '../util/api';
import Restrictions from '../config/file_upload_restrictions.json';
import File from '../elements/core/components/File/File';
import Prompt from '../elements/core/container/Prompt/Prompt';
import { get } from '../util/methods';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getBadges();
  const badges = content;
  return {
    props: {
      badges,
      fetchURL,
    },
    revalidate: 3600,
  };
};
interface BadgesPageProps {
  badges: any,
}

const BadgesPage = ({
  badges,
}: BadgesPageProps) => {
  const { data, mutate } = useSWR(
    `${backendURL}/badges`,
    get,
    { revalidateOnMount: true, initialData: badges },
  );
  const [chosenBadges, setChosenBadges] = useState<IBadge[]>([]);
  const [file, setFile] = useState<File | null>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { setMessage, addComponent } = useStoreDispatch();
  const { user: authUser } = useStoreState();
  const [secret, setSecret] = useState(false);
  const [editor, setEditorVisibility] = useState(false);
  if (authUser && !authUser.attributes.admin) router.push('/404');

  const toggleBadge = (badge: IBadge) => {
    if (chosenBadges.includes(badge)) {
      const filteredBadges = chosenBadges.filter((currentBadge) => currentBadge.id !== badge.id);
      setChosenBadges([...filteredBadges]);
    } else {
      chosenBadges.push(badge);
      setChosenBadges([...chosenBadges]);
    }
  };

  const applyBadges = async (userList: IUser[]) => {
    if (chosenBadges.length > 0) {
      let errors = false;
      for (const badge of chosenBadges) {
        const { error } = await assignUsersToBadge(badge, userList);
        if (error) {
          errors = true;
          setMessage({
            content: 'Fehler beim zuweisen',
            type: MessageType.error,
          });
        }
      }
      if (!errors) {
        setChosenBadges([]);
        setMessage({
          content: 'Badge zugewiesen',
          type: MessageType.success,
        });
      }
    }
  };

  const removeBadges = async (userList: IUser[]) => {
    if (chosenBadges.length > 0) {
      let errors = false;
      for (const badge of chosenBadges) {
        const { error } = await removeUsersFromBadge(badge, userList);
        if (error) {
          errors = true;
          setMessage({
            content: 'Fehler beim zuweisen',
            type: MessageType.error,
          });
        }
      }
      if (!errors) {
        setChosenBadges([]);
        setMessage({
          content: 'Badge erfolgreich entfernt',
          type: MessageType.success,
        });
      }
    }
  };

  const handleFileUpload = (newFile: File) => {
    if (!Restrictions.allowed_file_types_badges.includes(newFile.type)) {
      setMessage({
        content: `Das Bild muss einen der folgenden Dateitypen haben: ${Restrictions.allowed_file_types_badges.join(' ')}`,
        type: MessageType.error,
      });
    } else if (newFile.size > Restrictions.max_size_badges) {
      setMessage({
        content: `Das Bild darf die Maximalgröße von ${Restrictions.max_size_badges / 1000}KB nicht übersteigen`,
        type: MessageType.error,
      });
    } else {
      setFile(newFile);
    }
  };

  const sendBadgeRequest = async () => {
    const badgeData = new FormData();
    if (file) {
      badgeData.append('badge[badge_icon]', file);
    }
    badgeData.append('badge[title]', title);
    badgeData.append('badge[secret]', secret ? 'true' : 'false');
    badgeData.append('badge[description]', description);

    const { content, error } = await createBadge(badgeData, true);
    if (content) {
      setMessage({
        content: 'Badge wurde erstellt',
        type: MessageType.success,
      });
      setEditorVisibility(false);
      data.data.push(content.data);
      mutate(data, false);
    }
    if (error) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    }
  };

  const performBadgeDelete = async () => {
    let occured_error = false;
    const deletedIds = [];
    for (const badge of chosenBadges) {
      const { error } = await deleteBadge(badge.id);
      if (error) {
        occured_error = true;
      } else {
        deletedIds.push(badge.id);
      }
    }
    if (occured_error) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    } else {
      setMessage({
        content: 'Erfolgreich gelöscht',
        type: MessageType.success,
      });
      const updatedBadges = {
        data: data.data.filter((item) => {
          if (deletedIds.includes(item.id)) return null;
          return item;
        }),
      };
      mutate(updatedBadges, false);
      setChosenBadges([]);
    }
  };

  const onTryDeleting = () => {
    addComponent((
      <Prompt
        headline="Löschen bestätigen?"
        onAccept={() => performBadgeDelete()}
      >
        <div>
          <p>
            Sollen folgende Badges wirklich gelöscht werden?
            {chosenBadges.map((badge) => <p>{badge.attributes.title}</p>)}
          </p>
        </div>
      </Prompt>));
  };

  return (
    <Layout title="Badges">
      <BadgeHeading>Badges</BadgeHeading>
      <FlexLeft>
        <UserList
          onClick={(userList: IUser[]) => applyBadges(userList)}
          onRemoveClick={(userList: IUser[]) => removeBadges(userList)}
        />
        <div>
          <FlexRight>
            <ButtonComponent
              onClick={() => setEditorVisibility(!editor)}
              icon={editor ? faMinus : faPlus}
              small
              reset={editor}
            >
              {editor ? 'Abbrechen' : 'Badge erstellen'}
            </ButtonComponent>
            <ButtonComponent
              onClick={() => onTryDeleting()}
              icon={faTrash}
              disabled={chosenBadges.length === 0}
            >
              Badges löschen
            </ButtonComponent>
          </FlexRight>
          {editor && (
            <div>
              <FormInput placeholder="Name" type="text" name="title" onChange={(value) => setTitle(value)} />
              <FormInput placeholder="Kurzbeschreibung" type="text" name="Beschreibung" onChange={(value) => setDescription(value)} />
              <CheckboxWrapper>
                <label htmlFor="visible">
                  <input type="checkbox" name="visible" id="visible" checked={secret} onChange={() => setSecret(!secret)} />
                  Geheim
                </label>
              </CheckboxWrapper>
              <File onFileUpload={(newFile) => handleFileUpload(newFile)} />
              <ButtonComponent
                onClick={() => sendBadgeRequest()}
                disabled={
                  !title
                  || !description
                  || !file
                }
              >
                Abschicken
              </ButtonComponent>
            </div>
          )}
          <h2>Öffentliche Badges</h2>
          <BadgeList>
            {data.data.filter((badge: IBadge) => !badge.attributes.secret).map((badge: IBadge) => (
              <li key={`badge_li_${badge.id}`}>
                <Badge
                  badge={badge}
                  owned
                  onClick={() => toggleBadge(badge)}
                  active={chosenBadges.includes(badge)}
                />
              </li>
            ))}
          </BadgeList>
          <h2>Geheime Badges</h2>
          <BadgeList>
            {data.data.filter((badge: IBadge) => badge.attributes.secret).map((badge: IBadge) => (
              <li key={`badge_li_${badge.id}`}>
                <Badge
                  badge={badge}
                  owned
                  onClick={() => toggleBadge(badge)}
                  active={chosenBadges.includes(badge)}
                />
              </li>
            ))}
          </BadgeList>
        </div>
      </FlexLeft>
    </Layout>
  );
};

export default BadgesPage;
