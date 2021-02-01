import React from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import Button from '../elements/core/components/Button/Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const UserModeration = () => {
  return (
    <Layout title="User Moderation">
      <h1>User Moderation</h1>
      <Button small icon={faTimes}>
        Button
      </Button>
      <Button small>
        Button
      </Button>
    </Layout>
  )
};

export default UserModeration;