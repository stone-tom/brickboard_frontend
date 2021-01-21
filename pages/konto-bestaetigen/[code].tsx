import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../elements/core/container/Layout/Layout";
import { ContentContainer } from "../../styles/global.styles";
import { useAuthDispatch } from "../../context/auth";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let code = context.params.code;
  return {
    props: {
      code,
    },
  };
};

export const CodeConfirmation = (props) => {
  const [hint, setHint] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { confirmAccount } = useAuthDispatch();

  const tryConfirmation =async (code) => {
    try {
      let user= await confirmAccount(code);
      setRedirect(true);
      setHint(`Willkommen ${user.name}! Dein Konto wurde erfolgreich aktiviert! Du kannst dich jetzt einloggen!`);
    } catch (error) {
      setHint(error.message);
    }
  };

  useEffect(() => {
    tryConfirmation(props.code);
  },[]);

  return (
    <Layout title="Konto bestätigen">
      <ContentContainer>
        <h1>Kontoaktivierung</h1>
        <p>{hint}</p>
        {redirect && <Link href="/">Zur Startseite</Link>}
        {redirect && <Link href="/login">Zum Login</Link>}
      </ContentContainer>
    </Layout>
  );
};

export default CodeConfirmation;
