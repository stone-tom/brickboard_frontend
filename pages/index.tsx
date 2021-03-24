import React from 'react';
import Link from 'next/link';
import { useStoreState } from '../context/custom_store';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import VideoCard from '../elements/core/container/VideoCard/VideoCard';

function Home() {
  const { isAuthenticated, user } = useStoreState();
  return (
    <>
      <Layout title="Brickboard 2.0">
        <ViewWrapper>
          {isAuthenticated && user && user && (
            <>
              <h1>
                {`Hallo ${user.attributes.display_name}`}
              </h1>
            </>
          )}
          <h1>Willkommen auf der Baustelle des Brickboard`s (2.0).</h1>
          <p>Die Startseite wird leider erst in den kommenden Monaten programmiert.</p>
          <p>Das Forum und die Profile sind jedoch schon voll funktionsfähig!</p>
          <Link href="/forum">Zum Forum</Link>
        </ViewWrapper>
      </Layout>
    </>
  );
}

export default Home;
