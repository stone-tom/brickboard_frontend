import React, { useState } from "react";
import Layout from "../elements/core/container/Layout/Layout";
import { ContentContainer } from "../global.styles";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuthDispatch } from "../context/auth";
import SignInForm from "../elements/core/container/SignInForm/SignInForm";


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
