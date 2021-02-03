import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../../styles/global.styles';
import { useStoreDispatch } from '../../context/custom_store';
import AuthInfo from '../../elements/authentication/components/AuthInfo/AuthInfo';
import AuthImage from '../../elements/authentication/components/AuthImage/AuthImage';

function ConfirmationHint() {
  const { isAuthenticated } = useStoreDispatch();
  const router = useRouter();
  if (isAuthenticated) {
    router.push('/');
  }
  return (
    <Layout title="Bitte bestätige deine Email - Brickboard 2.0">
      <ViewWrapper>

        <FlexEvenly>
          <AuthInfo>
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
          </AuthInfo>
          <AuthImage path="/assets/images/email.webp" />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
}

export default ConfirmationHint;
