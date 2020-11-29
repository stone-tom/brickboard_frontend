import React from 'react';
import Head from 'next/head';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { ViewWrapper } from '../global.styles';
import useSwr from "swr";
import Link from 'next/link';
import { useAuthDispatch, useAuthState } from '../context/auth';
// import Navigation from '../elements/core/container/Navigation/Navigation';

// export const getStaticProps: GetStaticProps=async (context)=>{
//   const res=await fetch("https://iou-andreas.herokuapp.com/api/v1/users.json");
//   const userData= await res.json();
//   const users=userData.data;
//   return {
//     props:{
//       users,
//     },
//     revalidate: 1
//   }
// }


function Home() {
  const {isAuthenticated,user}=useAuthState();

  const {login, logout}=useAuthDispatch();

  return (
    <>
      <Head>
        <title>Brickboard 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Navigation /> */}
        <ViewWrapper>
        this is main

    
        {isAuthenticated ? <>
        <h1>Hallo {user.name}</h1>
        <button onClick={()=>logout()}>Abmelden</button></>
         : <button onClick={()=>login(
          "admin@brickboard.com",
          "123456")}>Anmelden</button>}      
        <Link href="/forum">Zum Forum</Link>

        </ViewWrapper>
      </main>

      <footer>
        this is footer
      
      </footer>
    </>
  )
};

export default Home;