import React from 'react';
import Link from 'next/link';
import { useAuthDispatch, useAuthState } from '../context/auth';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';

function Home() {
  const { isAuthenticated, user } = useAuthState();
  const { performLogout } = useAuthDispatch();

  return (
    <>
      <Layout title="Brickboard 2.0">
        <ViewWrapper>
          <h1>Be carefull, this is a construction site</h1>
          {isAuthenticated && (
            <>
              <h1>
                Hallo
                {user.name}
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
