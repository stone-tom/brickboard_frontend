import React from 'react';
import Link from 'next/link';
import { useStoreDispatch, useStoreState } from '../context/custom_store';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';

function Home() {
  const { isAuthenticated, user } = useStoreState();
  const { performLogout } = useStoreDispatch();

  return (
    <>
      <Layout title="Brickboard 2.0">
        <ViewWrapper>
          <h1>Be carefull, this is a construction site</h1>
          {isAuthenticated && user && (
            <>
              <h1>
                Hallo
                {user.attributes.display_name}
              </h1>
              <button type="button" onClick={() => performLogout()}>Abmelden</button>
            </>
          )}
          <Link href="/forum">Zum Forum</Link>
        </ViewWrapper>
      </Layout>
    </>
  );
}

export default Home;
