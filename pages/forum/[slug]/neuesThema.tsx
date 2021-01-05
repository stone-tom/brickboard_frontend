import React, { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ContentContainer } from "../../../global.styles";
import { Params } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthState } from "../../../context/auth";
import Layout from "../../../elements/core/container/Layout/Layout";
import CustomEditor from "../../../elements/core/container/Editor/Editor";


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://${process.env.BACKEND_URL}/messageboard-groups`);
  const messageboardData = await res.json();
  const messageboars=messageboardData.included;
  
    return {

        paths: messageboars.map(board=>({
          params:{ 
            slug: board.attributes.slug
          }
        })),
        fallback: false, 
      };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  //   const res = await fetch(`${process.env.BACKEND_URL}/messageboards`);
  //   const messageboardData = await res.json();
  // console.log("THIS IS MY RESPONSE");
  // console.log(messageboards.data[0].attributes);
  // const messageboardData = messageboards.data.[0].attributes.messageboards;
  return {
    props: {
      slug: params.slug,
    },
    revalidate: 1,
  };
};

function neuesThema({ slug }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message,setMessage]=useState("");
  const {isAuthenticated,user}=useAuthState();


  const sendTopic = async (title, content) => {
    let data = {
      topic: {
        title,
        content,
      },
    };

    const result = await fetch(
      `https://brickboard.herokuapp.com/${slug}/topics/`,
      {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (!response.ok) {
        console.log(response);
        return null;
      }
      return response.json();
    });

    if (result === null) {
      setMessage("Das hat leider nicht funktioniert");
    }
    else{
      router.push(`../${slug}`);
    }

  };

  if(!isAuthenticated){
    return(
      <>
        <h1>Tut uns leid</h1>
        <p>Du darfst diesen Inhalt leider nur sehen wenn du angemeldet bist</p>
        <Link href="/login">Login</Link> <Link href="/">Startseite</Link>
      </>
    );

  }

  return (
    <Layout title={`Neues Thema: ${slug} - Brickboard 2.0`}>
    <ContentContainer>
     
        <CustomEditor redirect={slug} />
     
    </ContentContainer>
    </Layout>
  );
}

export default neuesThema;
