import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../../styles/global.styles';
import { useStoreDispatch } from '../../context/custom_store';

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
  const [hint, setHint] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { performAccountConfirmation } = useStoreDispatch();

  const tryConfirmation = async (confirmationCode: string) => {
    try {
      const user = await performAccountConfirmation(confirmationCode);
      setRedirect(true);
      setHint(`Willkommen ${user.attributes.display_name}! Dein Konto wurde erfolgreich aktiviert! Du kannst dich jetzt einloggen!`);
    } catch (error) {
      setHint(error.message);
    }
  };

  useEffect(() => {
    tryConfirmation(code);
  }, []);

  return (
    <Layout title="Konto bestätigen">
      <ViewWrapper>
        <h1>Kontoaktivierung</h1>
        <p>{hint}</p>
        {redirect && <Link href="/">Zur Startseite</Link>}
        {redirect && <Link href="/login">Zum Login</Link>}
      </ViewWrapper>
    </Layout>
  );
};

export default CodeConfirmation;
