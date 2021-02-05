import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import IPost from '../../../../models/IPost';
import IUser from '../../../../models/IUser';
import { backendURL } from '../../../../util/api';
import { get } from '../../../../util/methods';
import Post from '../../../forum/container/Post/Post';

interface PostListProps {
  user: IUser,
}

const PostListComponent = ({
  user,
}: PostListProps) => {
  const [currentPage] = useState<number>(1);
  const { data } = useSWR(`${backendURL}/admin/moderation/users/${user.id}/page-${currentPage}`, get);
  const posts = useMemo(() => {
    if (data) return data.included.filter((item) => item.type === 'post' && item.attributes.moderation_state !== 'approved');
    return null;
  }, [data]);

  if (posts && posts.length > 0) {
    return (
      <>
        {posts && posts.map((item: IPost) => {
          if (item.attributes.moderation_state !== 'approved') {
            return (
              <Post post={item} author={user} />
            );
          }

          return null;
        })}
      </>
    );
  }
  return (
    <p>
      Dieser Benutzer hat keine Posts mit dem Status &quot;blockiert&quot; oder &quot;wartend&quot;
    </p>
  );
};

export default PostListComponent;
