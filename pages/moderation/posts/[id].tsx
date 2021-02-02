import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import Loader from '../../../elements/core/components/Loader/Loader';
import Layout from '../../../elements/core/container/Layout/Layout';
import Spoiler from '../../../elements/moderation/components/Spoiler/Spoiler';
import { backendURL } from '../../../util/api';
import { get } from '../../../util/methods';

const PostModeration = () => {
  const router = useRouter();
  const { id } = router.query;
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isValidating } = useSWR(`${backendURL}/admin/moderation/users/page-1`, get);

  useEffect(() => {
    console.log('DATA', data);
    if (data) {
      // console.log(filter(data, 'user'));
    }
  }, [data, id]);

  return (
    <Layout title="Pending Posts">
      There will be the list of user spoilers
      <Loader isLoading={isValidating}>
        {data && data.data.map((user) => (
          <Spoiler user={user} />
        ))}
      </Loader>

    </Layout>
  );
};

export default PostModeration;
