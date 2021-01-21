import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../elements/core/container/Layout/Layout';
import { ContentContainer } from '../styles/global.styles';
import { useAuthDispatch } from '../context/auth';

function Logout() {
  const { logout } = useAuthDispatch();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Layout title="Logout">
      <ContentContainer>
        <h1>Du wurdest erfolgreich abgemeldet!</h1>
        <Link href="/">Zur Startseite</Link>
        <br />
        <Link href="/login">Wieder einloggen</Link>
      </ContentContainer>
    </Layout>
  );
}

export default Logout;
