import React, { useState } from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexEvenly, ViewWrapper } from '../styles/global.styles';
import SignUpForm from '../elements/authentication/container/SignUpForm/SignUpForm';
import AuthImage from '../elements/authentication/components/AuthImage/AuthImage';

function Register() {
  const [isError, setError] = useState(false);
  const handleAuthImage = () => {
    setError(true);
  };
  return (
    <Layout title="Ein neues Konto anlegen - Brickboard 2.0">
      <ViewWrapper>
        <FlexEvenly>
          <SignUpForm onFailedRegistering={() => handleAuthImage()} />
          <AuthImage path={isError ? '/assets/images/servererror.webp' : '/assets/images/signup.webp'} />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
}

export default Register;
