import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LinkButtonProps {
  children: ReactNode;
  link: string;
}

const LinkButton = ({ children, link }: LinkButtonProps) => (
  <Link passHref href={`${link}`}>
    {children}
  </Link>
);

export default LinkButton;
