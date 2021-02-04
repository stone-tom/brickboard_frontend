import React from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../styles/global.styles';
import SignInForm from '../elements/authentication/container/SignInForm/SignInForm';
import AuthImage from '../elements/authentication/components/AuthImage/AuthImage';

function Login() {
  return (
    <Layout title="Login">
      <ViewWrapper>
        <FlexEvenly>
          <SignInForm />
          <AuthImage path="/assets/images/login.webp" />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
}

export default Login;
