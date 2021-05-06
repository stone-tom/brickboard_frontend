import React, { ReactNode } from 'react';
import Head from 'next/head';
import Menubar from '../Navigation/Navigation';
import { useStoreState } from '../../../../context/custom_store';
import Footer from '../Footer/Footer';
import { ViewWrapper } from '../../../../styles/global.styles';

interface LayoutProps {
  title: string;
  children: ReactNode;
  fullWidth?: boolean,
}

const Layout = ({ title, children, fullWidth }: LayoutProps) => {
  const { user } = useStoreState();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Menubar user={user} />
        <ViewWrapper
          fullWidth={fullWidth}
          navMargin
        >
          {children}
        </ViewWrapper>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
