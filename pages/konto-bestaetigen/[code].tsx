import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../elements/core/container/Layout/Layout";
import { ContentContainer } from "../../global.styles";
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
      await confirmAccount(code);
      setRedirect(true);
      setHint("Dein Konto wurde erfolgreich aktiviert!");
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
      </ContentContainer>
    </Layout>
  );
};

export default CodeConfirmation;
