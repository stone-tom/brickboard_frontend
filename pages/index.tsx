import React from 'react';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { ContentContainer, ViewWrapper } from '../global.styles';
import useSwr from "swr";
import Link from 'next/link';
import { useAuthDispatch, useAuthState } from '../context/auth';
import Layout from '../elements/core/container/Layout/Layout';

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
    
    <Layout title="Brickboard 2.0">
      <ContentContainer>
      <h1>Be carefull, this is a construction site</h1>
    {isAuthenticated ? <>
        <h1>Hallo {user.name}</h1>
        <button onClick={()=>logout()}>Schnell Anmeldung</button></>
         : <button onClick={()=>login(
          "admin@brickboard.com",
          "123456")}>Anmelden</button>}      
        <Link href="/forum">Zum Forum</Link>
        </ContentContainer>
    </Layout>
    
  )
};

export default Home;