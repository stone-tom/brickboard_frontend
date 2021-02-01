import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import { useStoreDispatch } from '../context/custom_store';

function Logout() {
  const { performLogout } = useStoreDispatch();

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
