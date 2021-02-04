import React from 'react';
import { SignInForm } from '../../container/SignInForm/SignInForm.styles';

interface AuthInfoProps {
  children: any;
}

const AuthInfo = ({ children }:AuthInfoProps) => <SignInForm>{children}</SignInForm>;

export default AuthInfo;
