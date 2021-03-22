import React, { useState } from 'react';
import Layout from '../../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../../styles/global.styles';
import AuthImage from '../../elements/authentication/components/AuthImage/AuthImage';
import ForgotPasswortComponent from '../../elements/authentication/container/ForgotPasswordForm/ForgotPassword';
import AuthInfo from '../../elements/authentication/components/AuthInfo/AuthInfo';
import { SignInHeading } from '../../elements/authentication/container/SignInForm/SignInForm.styles';

function ForgotPasswordPage() {
  const [isSuccess, setSuccess] = useState(false);
  return (
    <Layout title="Passwort vergessen? - Brickboard 2.0">
      <ViewWrapper>
        <FlexEvenly>
          {!isSuccess ? (
            <ForgotPasswortComponent onSuccess={() => setSuccess(true)} />
          )
            : (
              <AuthInfo>
                <SignInHeading>E-Mail verschickt!</SignInHeading>
                <p>Du solltest eine Mail mit einem Link erhalten haben.</p>
                <p>Nutze diesen Link um den Passwort neu zu setzen.</p>
              </AuthInfo>
            )}

          <AuthImage path={!isSuccess ? '/assets/images/forgotpassword.webp' : '/assets/images/email.webp'} />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
}

export default ForgotPasswordPage;
