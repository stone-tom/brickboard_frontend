import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import { useAuthDispatch } from '../context/auth';

function Logout() {
  const { performLogout } = useAuthDispatch();

  useEffect(() => {
    performLogout();
  }, []);

  return (
    <Layout title="Logout">
      <ViewWrapper>
        <h1>Du wurdest erfolgreich abgemeldet!</h1>
        <Link href="/">Zur Startseite</Link>
        <br />
        <Link href="/login">Wieder einloggen</Link>
      </ViewWrapper>
    </Layout>
  );
}

export default Logout;
