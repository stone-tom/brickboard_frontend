import React, { ReactNode } from 'react';
import { ViewWrapper } from '../../../../global.styles';
import Head from 'next/head';
import Menubar from "../Menubar/Menubar";
import { useAuthState } from "../../../../context/auth";
import Footer from '../Footer/Footer';


interface LayoutProps{
  title:string;
  children: ReactNode;
}

  const Layout = ({title, children}:LayoutProps)=>{
    const {isAuthenticated,user}=useAuthState();

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Menubar user={user}/>
        <ViewWrapper>
           {children}
        </ViewWrapper>
      </main>

      <Footer />
  
    

    </>
  )
};

export default Layout;