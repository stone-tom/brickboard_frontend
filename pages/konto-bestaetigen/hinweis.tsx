import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../elements/core/container/Layout/Layout';
import { ContentContainer } from '../../styles/global.styles';
import { useAuthDispatch } from '../../context/auth';

function ConfirmationHint() {
  const { isAuthenticated } = useAuthDispatch();
  const router = useRouter();
  if (isAuthenticated) {
    router.push('/');
  }
  return (
    <Layout title="Bitte bestätige deine Email - Brickboard 2.0">
      <ContentContainer>
        <h1>Bitte bestätige dein Konto</h1>
        <p>
          Du solltest eine E-Mail erhalten haben. Bevor du dich das erste Mal
          anmelden kannst, klicke bitte auf den Bestätigungslink in deiner
          E-Mail.
        </p>
        <p>
          Manchmal dauert es etwas bis eine E-Mail ankommt. Solltest du nach
          längerer Zeit keine Mail erhalten, wende dich bitte an den
          Administrator.
        </p>
      </ContentContainer>
    </Layout>
  );
}

export default ConfirmationHint;
