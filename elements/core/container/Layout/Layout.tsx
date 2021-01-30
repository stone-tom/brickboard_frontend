import React, { ReactNode } from 'react';
import Head from 'next/head';
import Menubar from '../Menubar/Menubar';
import { useAuthState } from '../../../../context/auth';
import Footer from '../Footer/Footer';
import { ViewWrapper } from '../../../../styles/global.styles';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  const { user } = useAuthState();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Menubar user={user} />
        <ViewWrapper>
          {children}
        </ViewWrapper>
      </main>

      <Footer />

    </>
  );
};

export default Layout;
