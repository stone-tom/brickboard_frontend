import React from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { ContentContainer } from '../styles/global.styles';
import SignInForm from '../elements/core/container/SignInForm/SignInForm';

function Login() {
  return (
    <Layout title="Login">
      <ContentContainer>
        <SignInForm />
      </ContentContainer>
    </Layout>
  );
}

export default Login;
