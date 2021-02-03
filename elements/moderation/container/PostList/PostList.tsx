import React, { useState } from 'react';
import useSWR from 'swr';
import IPost from '../../../../models/IPost';
import IUser from '../../../../models/IUser';
import { backendURL } from '../../../../util/api';
import filter from '../../../../util/filter';
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

  if (data && filter(data, 'post').length > 0) {
    return (
      <>
        {data && filter(data, 'post').map((item: IPost) => (
          <Post post={item} author={user} />
        ))}
      </>
    );
  }
  return (<p>Dieser Benutzer hat noch keine Posts gemacht.</p>);
};

export default PostListComponent;
