import React from 'react';
import Head from 'next/head';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { ViewWrapper } from '../global.styles';
import { signIn, signOut, useSession } from 'next-auth/client';
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
  const [ session, loading ] = useSession();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Navigation /> */}
        <ViewWrapper>
        this is main
        {!session && <>
          <button onClick={signIn}>Anmelden</button>
        </>}
        {session && <>
        {console.log(session)}
        {console.log(session.user)}
          <h1>{session.user.email}</h1>
          <button onClick={signOut}>Abmelden</button>
        </>}
        
        </ViewWrapper>
      </main>

      <footer>
        this is footer
      
      </footer>
    </>
  )
}

export default Home;