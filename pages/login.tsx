import React from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import SignInForm from '../elements/authentication/container/SignInForm/SignInForm';

function Login() {
  return (
    <Layout title="Login">
      <ViewWrapper>
        <SignInForm />
      </ViewWrapper>
    </Layout>
  );
}

export default Login;
