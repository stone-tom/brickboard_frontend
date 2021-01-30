import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthDispatch, useAuthState } from '../context/auth';
import Layout from '../elements/core/container/Layout/Layout';
import { ContentContainer } from '../styles/global.styles';

function Home() {
  const { isAuthenticated, user } = useAuthState();
  const { performLogin, performLogout } = useAuthDispatch();
  const router = useRouter();

  console.log(router.pathname);

  return (
    <>
      <Layout title="Brickboard 2.0">
        <ContentContainer>
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
        </ContentContainer>
      </Layout>
    </>
  );
}

export default Home;
