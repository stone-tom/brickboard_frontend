import React, { useState } from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../styles/global.styles';
import SignUpForm from '../elements/authentication/container/SignUpForm/SignUpForm';
import AuthImage from '../elements/authentication/components/AuthImage/AuthImage';
import AuthInfo from '../elements/authentication/components/AuthInfo/AuthInfo';

function Register() {
  const [isError, setError] = useState(false);
  const handleAuthImage = () => {
    setError(true);
  };
  const [email, setEmail] = useState('');

  return (
    <Layout title="Ein neues Konto anlegen - Brickboard 2.0">
      <ViewWrapper>
        {email ? (
          <FlexEvenly>
            <AuthInfo>
              <h1>Bitte bestätige dein Konto</h1>
              <p>
                Wir haben eine E-Mail an
                <strong>{` ${email} `}</strong>
                geschickt Bevor du dich das erste Mal
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
        ) : (
          <FlexEvenly>
            <SignUpForm
              onFailedRegistering={() => handleAuthImage()}
              onSuccess={({ email: passedMail }) => setEmail(passedMail)}
            />
            <AuthImage path={isError ? '/assets/images/servererror.webp' : '/assets/images/signup.webp'} />
          </FlexEvenly>
        )}

      </ViewWrapper>
    </Layout>
  );
}

export default Register;
