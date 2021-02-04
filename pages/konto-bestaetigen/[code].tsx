import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../../styles/global.styles';
import { useStoreDispatch } from '../../context/custom_store';
import AuthInfo from '../../elements/authentication/components/AuthInfo/AuthInfo';
import AuthImage from '../../elements/authentication/components/AuthImage/AuthImage';

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

export const CodeConfirmation = ({
  code,
}: CodeConfirmationProps) => {
  const [isSuccess, setSuccess] = useState(false);
  const { performAccountConfirmation } = useStoreDispatch();
  const [user, setUser] = useState(null);
  const [displayedError, setError] = useState(null);

  const tryConfirmation = async (confirmationCode: string) => {
    try {
      const res = await performAccountConfirmation(confirmationCode);
      console.log('RES', res);
      if (res) {
        setUser(res);
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    tryConfirmation(code);
  }, []);
  return (
    <Layout title="Konto bestätigen">
      <ViewWrapper>
        <FlexEvenly>
          <AuthInfo>
            <h1>Kontoaktivierung</h1>
            {isSuccess ? (
              <>
                <h2>{`Hallo  ${user.attributes.display_name}`}</h2>
                <p>Dein Konto wurde erfolgreich aktiviert!</p>
                <p>Du kannst dich jetzt anmelden!</p>
                <p>
                  <strong>Hinweis: </strong>
                  Bevor du etwas posten kannst, muss dich noch ein Moderator bestätigen.
                </p>
                <p>Du erhälst eine E-Mail wenn das passiert.</p>
              </>
            )
              : (
                <>
                  <h2>Whoops</h2>
                  <p>das hat leider nicht geklappt!</p>
                  <p>{displayedError}</p>
                </>
              )}
            <Link href="/">Zur Startseite</Link>
            {isSuccess && <Link href="/login">Zum Login</Link>}
          </AuthInfo>
          <AuthImage path={isSuccess ? '/assets/images/signupsuccess.webp' : '/assets/images/forgotpassword.webp'} />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
};

export default CodeConfirmation;
