import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../../styles/global.styles';
import { useStoreDispatch } from '../../context/custom_store';

function ConfirmationHint() {
  const { isAuthenticated } = useStoreDispatch();
  const router = useRouter();
  if (isAuthenticated) {
    router.push('/');
  }
  return (
    <Layout title="Bitte bestätige deine Email - Brickboard 2.0">
      <ViewWrapper>
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
      </ViewWrapper>
    </Layout>
  );
}

export default ConfirmationHint;
