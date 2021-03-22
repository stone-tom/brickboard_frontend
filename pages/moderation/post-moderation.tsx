import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../context/custom_store';
import Accordion from '../../elements/core/components/Accordion/Accordion';
import Loader from '../../elements/core/components/Loader/Loader';
import Layout from '../../elements/core/container/Layout/Layout';
import Prompt from '../../elements/core/container/Prompt/Prompt';
import AccordionUserHeader from '../../elements/moderation/components/AccordionUserHeader/AccordionUserHeader';
import PostListComponent from '../../elements/moderation/container/PostList/PostList';
import { MessageType } from '../../models/IMessage';
import IUser from '../../models/IUser';
import { Wrapper } from '../../styles/global.styles';
import { backendURL } from '../../util/api';
import updateModerationUser from '../../util/api/moderation/update-moderation-user';
import { get } from '../../util/methods';

export const getModerationState = (data: any, user: IUser) => {
  if (!user.relationships.thredded_user_detail.data) return 'pending_moderation';
  if (data && data.data) {
    for (const item of data.included) {
      if (item.id === user.relationships.thredded_user_detail.data.id) {
        return item.attributes.moderation_state;
      }
    }
    return 'pending_moderation';
  }
  return 'pending_moderation';
};

const PostModeration = () => {
  const router = useRouter();
  const { user: authUser } = useStoreState();
  if (authUser && !authUser.attributes.admin) router.push('/404');

  const { data, mutate } = useSWR(`${backendURL}/admin/moderation/users/page-1`, get);
  const { setMessage, addComponent } = useStoreDispatch();
  const onUpdateStatus = async (user: IUser, modStatus: string) => {
    addComponent((
      <Prompt
        headline="Moderation Status ändern?"
        onAccept={async () => {
          try {
            await updateModerationUser(parseInt(user.id, 10), modStatus);
            const updateData = {
              ...data,
              included: data.included.map((item) => {
                if (item.id === user.relationships.thredded_user_detail.data.id) {
                  return {
                    ...item,
                    attributes: {
                      moderation_state: modStatus,
                    },
                  };
                }
                return item;
              }),
            };
            mutate(updateData, false);
            setMessage({
              content: 'Moderation Status erfolgreich geändert',
              type: MessageType.success,
            });
          } catch (e) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
      >
        Wollen Sie den Moderation Status wirklich ändern?
      </Prompt>));
  };

  return (
    <Layout title="Pending Posts">
      <h2>Post Moderation</h2>
      <p>
        Hier können Sie die Posts von allen Benutzern
        lesen und den Moderation Status des Benutzers anpasen.
      </p>
      <Wrapper>
        <Loader isLoading={!data}>
          {data && data.data && data.data.map((currentUser: IUser) => (
            <Accordion
              toggleIcon={faCaretDown}
              header={(
                <AccordionUserHeader
                  onUpdateStatus={(user, status) => onUpdateStatus(user, status)}
                  user={currentUser}
                  status={getModerationState(data, currentUser)}
                />
              )}
            >
              <PostListComponent user={currentUser} />
            </Accordion>
          ))}
        </Loader>
      </Wrapper>
    </Layout>
  );
};

export default PostModeration;
