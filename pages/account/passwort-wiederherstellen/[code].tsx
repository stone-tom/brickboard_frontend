import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../../../styles/global.styles';
import AuthImage from '../../../elements/authentication/components/AuthImage/AuthImage';
import AuthInfo from '../../../elements/authentication/components/AuthInfo/AuthInfo';
import ResetPasswortComponent from '../../../elements/authentication/container/ResetPasswort/ResetPassword';
import { SignInHeading } from '../../../elements/authentication/container/SignInForm/SignInForm.styles';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params;
  return {
    props: {
      code,
    },
  };
};

interface CodeConfirmationProps {
  code: string,
}

function ResetPasswordPage({ code }: CodeConfirmationProps) {
  const [isSuccess, setSuccess] = useState(false);
  return (
    <Layout title="Passwort wiederherstellen - Brickboard 2.0">
      <ViewWrapper>
        <FlexEvenly>
          {!isSuccess ? (
            <ResetPasswortComponent code={code} onSuccess={() => setSuccess(true)} />
          )
            : (
              <AuthInfo>
                <SignInHeading>Erfolgreich wiederhergestellt!</SignInHeading>
                <p>Dein Passwort wurde erfolgreich gesetzt!</p>
                <p>Du kannst dich wieder anmelden!</p>
                <Link href="/login">Zum Login</Link>
              </AuthInfo>
            )}
          <AuthImage path={!isSuccess ? '/assets/images/signup.webp' : '/assets/images/signupsuccess.webp'} />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
}

export default ResetPasswordPage;
