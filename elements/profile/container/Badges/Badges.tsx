import React, { useMemo } from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import IBadge from '../../../../models/IBadge';
import { MessageType } from '../../../../models/IMessage';
import IUser from '../../../../models/IUser';
import { backendURL } from '../../../../util/api';
import chooseMainBadge from '../../../../util/api/user/choose-main-badge';
import { get } from '../../../../util/methods';
import LoaderComponent from '../../../core/components/Loader/Loader';
import Prompt from '../../../core/container/Prompt/Prompt';
import { Empty } from '../../../forum/container/MoviePresentations/MoviePresentations.styles';
import Badge from '../../components/Badge/Badge';
import { PersonalInformationWrapper } from '../PersonalInformation/PersonalInformation.styles';
import {
  BadgesWrapper,
} from './Badges.styles';

const Badges = ({
  userBadges,
  user,
}: {
  userBadges: IBadge[],
  user: IUser
}) => {
  const { data } = useSWR(`${backendURL}/badges`, get);
  const { addComponent, setMessage, updateMainBadge } = useStoreDispatch();
  const { user: authUser, badge: mainBadge, isAuthenticated } = useStoreState();

  const handleSetMainBadge = async (badgeId: string) => {
    if (authUser && authUser.id === user.id) {
      addComponent((
        <Prompt
          headline="Badge auswählen?"
          onAccept={async () => {
            try {
              const { content } = await chooseMainBadge(badgeId);
              if (content) {
                updateMainBadge(content.data);
                setMessage({
                  content: 'Anzeigebadge erfolgreich geändert',
                  type: MessageType.success,
                });
              }
            } catch (e) {
              setMessage({
                content: 'Es ist ein Fehler aufgetreten',
                type: MessageType.error,
              });
            }
          }}
        >
          <div>
            <p>Wollen Sie dieses Badge wirklich als Anzeigebadge verwenden?</p>
          </div>
        </Prompt>));
    }
  };

  const badges = useMemo(() => {
    if (!isAuthenticated && userBadges) {
      return userBadges;
    }
    if (isAuthenticated && authUser && authUser.id !== user.id) {
      return userBadges;
    }
    // eingeloggt & eigenes Profil
    if (isAuthenticated && authUser.id === user.id) {
      if (authUser.attributes.admin && data) return data.data;
      if (data) {
        return data.data.filter((item: IBadge) => {
          if (!item.attributes.secret
            || item.relationships.users.data
              .some((owner) => owner.id === authUser.id)) {
            return item;
          }
          return null;
        });
      }
    }
    return [];
  }, [data, userBadges]);

  return (
    <PersonalInformationWrapper>
      <LoaderComponent isLoading={!data}>
        <BadgesWrapper>
          {badges && badges.length > 0 ? (
            badges.map((badge: IBadge) => (
              <Badge
                onClick={() => handleSetMainBadge(badge.id)}
                key={badge.id}
                badge={badge}
                active={
                  authUser && mainBadge && mainBadge.id === badge.id && authUser.id === user.id
                }
                owned={!isAuthenticated || badge.relationships.users.data
                  .some((owner) => owner.id === authUser.id)}
              />
            ))
          ) : (
            <Empty>Dieser Benutzer hat noch keine Badges</Empty>
          )}
        </BadgesWrapper>
      </LoaderComponent>
    </PersonalInformationWrapper>
  );
};

export default Badges;
