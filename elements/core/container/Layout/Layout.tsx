import React, { ReactNode } from 'react';
import { ViewWrapper } from '../../../../global.styles';
import Head from 'next/head';

interface LayoutProps{
  title:string;
  children: ReactNode;
}

  const Layout = ({title, children}:LayoutProps)=>{
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Navigation /> */}
        <ViewWrapper>
           {children}
        </ViewWrapper>
      </main>

      <footer>
        this is footer
      
      </footer>
  
    

    </>
  )
};

export default Layout;