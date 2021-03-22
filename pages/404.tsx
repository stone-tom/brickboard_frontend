import Image from 'next/image';
import React from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';

const Custom404 = () => (
  <Layout title="Nicht gefunden - Brickboard 2.0">
    <ViewWrapper center column>
      <h1>404</h1>
      <h2>Die Seite konnte nicht gefunden werden.</h2>
      <Image src="/assets/images/404.webp" alt="Seite nicht gefunden" width="500px" height="450px" />
    </ViewWrapper>
  </Layout>
);

export default Custom404;
