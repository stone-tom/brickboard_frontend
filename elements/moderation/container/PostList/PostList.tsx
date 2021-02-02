import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { backendURL } from '../../../../util/api';
import filter from '../../../../util/filter';
import { get } from '../../../../util/methods';
import Post from '../../../forum/container/Post/Post';

interface PostListProps {
  userId: string,
}

const PostListComponent = ({
  userId,
}: PostListProps) => {
  const [currentPage] = useState<number>(1);
  const { data } = useSWR(`${backendURL}/admin/moderation/users/${userId}/page-${currentPage}`, get);

  useEffect(() => {
    console.log('POSTS', data);
    console.log('POSTS', data && filter(data, 'post'));
  }, [data]);

  useEffect(() => {
    console.log('TEST');
  }, []);

  return (
    <>
      {data && filter(data, 'post').map((item) => (
        <Post post={item} author="TEST" />
      ))}
    </>
  );
};

export default PostListComponent;
