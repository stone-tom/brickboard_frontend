import React from 'react';
import useSWR from 'swr';
import Layout from '../../elements/core/container/Layout/Layout';
import Spoiler from '../../elements/moderation/components/Spoiler/Spoiler';
import IModerationUser from '../../models/IModerationUser';
import { backendURL } from '../../util/api';
import { get } from '../../util/methods';

const PostModeration = () => {
  const { data } = useSWR(`${backendURL}/admin/moderation/users/page-1`, get);

  const getModerationState = (user: IModerationUser) => {
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

  return (
    <Layout title="Pending Posts">
      <h2>User Moderation</h2>
      <p>Hier können Sie die Posts von allen Benutzern lesen und den Moderation Status anpasen.</p>
      {data && data.data && data.data.map((user: IModerationUser) => (
        <Spoiler
          key={user.id}
          user={user}
          status={
            getModerationState(user)
          }
        />
      ))}
    </Layout>
  );
};

export default PostModeration;
