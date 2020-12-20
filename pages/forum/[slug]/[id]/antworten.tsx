import React, { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../../elements/core/container/Layout/Layout";
import { useAuthState } from "../../../../context/auth";
import { ContentContainer } from "../../../../global.styles";


// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`https://${process.env.BACKEND_URL}/messageboards`);
//   const messageboardData = await res.json();
//   // console.log("THE SLUG PAGE GETS");
//   // console.log(messageboardData.data[0].attributes.messageboards);
//   const messageboards = messageboardData.data[0].attributes.messageboards;
//   // console.log(messageboards);
//   return {
//     paths: messageboards.map((board) => ({
//       params: {
//         slug: board.messageboard.slug,
//       },
//     })),
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
//   //   const res = await fetch(`${process.env.BACKEND_URL}/messageboards`);
//   //   const messageboardData = await res.json();
//   // console.log("THIS IS MY RESPONSE");
//   // console.log(messageboards.data[0].attributes);
//   // const messageboardData = messageboards.data.[0].attributes.messageboards;
//   return {
//     props: {
//       slug: params.slug,
//     },
//     revalidate: 1,
//   };
// };
export const getServerSideProps: GetServerSideProps = async (context) => {
    
    let slug=context.params.slug;
    let id=context.params.id;

    const res = await fetch(`https://${process.env.BACKEND_URL}/${slug}/topics/${id}`);
    const topicData = await res.json();

    const topic=topicData.data.attributes;

    return{
      props:{
        topic,
        slug,
        id
      },
    }
}

function Respond({ slug,id }) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [message,setMessage]=useState("");
  const {isAuthenticated,user}=useAuthState();


  const sendAnswer = async (content) => {
    let data = {
      post: {
        content,
      },
    };

    const result = await fetch(
      `https://brickboard.herokuapp.com/${slug}/topics/${id}`,
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
      router.push(`/forum/${slug}/${id}`);
    }

  };

  if(!isAuthenticated){
    return(
      <Layout title="Fehler beim Aufrufen der Seite">
        <h1>Tut uns leid</h1>
        <p>Du darfst diesen Inhalt leider nur sehen wenn du angemeldet bist</p>
        <Link href="/login">Login</Link> <Link href="/">Startseite</Link>
        </Layout>
    );

  }

  return (
    <Layout title={`Antwort erstellen - Brickboard 2.0`}>
    <ContentContainer>
      <h1>Eine Antwort erstellen:</h1>
      <p>{message}</p>

        <label htmlFor="content">Deine Antwort:</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="content"
        ></textarea>
        <button onClick={() => sendAnswer(content)}>
          Absenden
        </button>
     
    </ContentContainer>
    </Layout>
  );
}

export default Respond;
