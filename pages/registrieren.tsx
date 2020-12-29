import React from "react";
import Layout from "../elements/core/container/Layout/Layout";
import { ContentContainer } from "../global.styles";
import SignUpForm from '../elements/core/container/SignUpForm/SignUpForm';


function Register() {

  return (
    <Layout title="Ein neues Konto anlegen - Brickboard 2.0">
      <ContentContainer>
        <SignUpForm />
      </ContentContainer>
    </Layout>
  );
}

export default Register;
