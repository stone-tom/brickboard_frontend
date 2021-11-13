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
  const { user, notifications } = useStoreState();
  return (
    <>
      <Head>
        <title>
          {notifications.length > 0 ? `(${notifications.length}) ` : ''}
          {title}
        </title>
        <link rel="icon" href={notifications.length > 0 ? '/favicon_bell.ico' : '/favicon.ico'} />
      </Head>

      <main>
        <Menubar user={user} notifications={notifications} />
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
