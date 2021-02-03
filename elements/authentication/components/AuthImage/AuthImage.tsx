import Image from 'next/image';
import React from 'react';
import { AuthImageWrapper } from './AuthImage.styles';

interface AuthImageProps {
  path: string;
}

const AuthImage = ({ path }: AuthImageProps) => (
  <AuthImageWrapper>
    <Image src={path} layout="fill" objectFit="contain" />
  </AuthImageWrapper>
);

export default AuthImage;
