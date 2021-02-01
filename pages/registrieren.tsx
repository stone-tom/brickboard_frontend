import React from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import SignUpForm from '../elements/authentication/container/SignUpForm/SignUpForm';

function Register() {
  return (
    <Layout title="Ein neues Konto anlegen - Brickboard 2.0">
      <ViewWrapper>
        <SignUpForm />
      </ViewWrapper>
    </Layout>
  );
}

export default Register;
