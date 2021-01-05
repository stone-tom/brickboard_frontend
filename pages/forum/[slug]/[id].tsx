import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { Params } from "next/dist/next-server/server/router";
import { ContentContainer, Hint } from "../../../global.styles";
import  Post  from "../../../elements/core/components/Post/Post";
import Layout from "../../../elements/core/container/Layout/Layout";
import Breadcrumbsbar from "../../../elements/core/components/Breadcrumbs/Breadcrumbs";
import { useAuthState } from "../../../context/auth";
import Link from "next/link";
import BBButton from "../../../elements/core/components/BBButton/BBButton";

interface StaticParams{
    params:{ 
    slug:string;
    id: number;
    }
}
//Welche Pfade prerendered werden können
// export const getStaticPaths: GetStaticPaths=async ()=>{

//   const res = await fetch(`https://${process.env.BACKEND_URL}/messageboards`);
//   const messageboardData = await res.json();
//   const messageboards=messageboardData.data[0].attributes.messageboards;

//   let paths=messageboards.map(board=>{
//     return board.messageboard.slug
//   });


//     return {
//         paths: [
//             { params: { slug: 'brickfilme-im-allgemeinen', id: "1"} },
//             { params: { slug: 'neuigkeiten', id: "1" } }
//         ],
//         fallback: true, 
//       };
// };

// export const getStaticProps: GetStaticProps = async ({params}:Params) => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/Topics");
//   const userData = await res.json();
//   const users = userData;
//   return {
//     props: {
//       users,
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
    // console.log("SERVERSIDE TOPIC");
    // console.log
    return{
      props:{
        topic,
        slug
      },
    }
}


function Subforum({ topic, slug }) {
  const {isAuthenticated,user}=useAuthState();
  const isLocked=topic.topic.data.attributes.topic.data.attributes.locked;

  return (
    <Layout  title={`${topic.topic.data.attributes.topic.data.attributes.title} - Brickboard 2.0`}>
      <ContentContainer>
      <Breadcrumbsbar slug={slug} id={topic.topic.data.attributes.topic.data.attributes.id} topic={topic.topic.data.attributes.topic.data.attributes.title} />

      <h1>{topic.topic.data.attributes.topic.data.attributes.title}</h1>
      {isLocked && <Hint>Dieses Thema wurde von einem der Admins gesperrt. Du kannst keine Antwort posten.</Hint>}
      {topic.post_views.data.map((postWrapper,index)=>{
        if(index==0){
          return(
            <Post content={postWrapper.attributes.post.data.attributes.content}
            type={1}  author={topic.topic.data.attributes.topic.included[1].attributes.display_name} key={postWrapper.attributes.post.data.id}
           created={postWrapper.attributes.post.data.attributes.created_at} />
          );
        }else{
        return(
        <Post title={`Re: ${topic.topic.data.attributes.topic.data.attributes.title}`} content={postWrapper.attributes.post.data.attributes.content}
         type={1}  author={topic.topic.data.attributes.topic.included[1].attributes.display_name} key={postWrapper.attributes.post.data.id}
        created={postWrapper.attributes.post.data.attributes.created_at} />
        );
        }
      })}
        {isAuthenticated && !isLocked && <Link href={`/forum/${slug}/${topic.topic.data.attributes.topic.data.attributes.id}/antworten`} passHref><BBButton alignRight add>Antworten</BBButton></Link>}

    </ContentContainer>
    </Layout>
  );
  }

export default Subforum;


//  <ContentContainer>
//       <h1>Brickboard for president, community event</h1>
//       <Post title="Brickboard for president, community event" content='
//       Prinzipiell ist die Umsetzung frei, jeder kann machen was er will. Wer will kann auch Peter wieder in ein Abenteuer schicken.

//       Folgende Eckdaten hatte ich mir überlegt:
      
//       - Laufzeit ist egal (10 Sekunden bis unbegrenzt)
//       - Inhaltlich geht es um Wahlen, Präsidenten und alles dazwischen
//       - Ich stelle noch den Aufmacher vom Trailer zur Verfügung, wer will kann den zu Beginn seines Videos einbauen.
      
//       Intro: http://ray-productions.de/brickboard/br ... _intro.zip
      
//       Um das koordinieren zu können, machen wir folgendes:
      
//       - Hier unten als Antwort sammeln wir Ankündigungen, wer Lust hat sich zu beteiligen, bzw Links zu den fertigen Beiträgen
//       - Den fertigen Beitrag postet jeder in seinem Youtube Kanal und stellt es auf "Premiere" am Dienstag den 3.11. am besten zwischen 20 und 22 Uhr. (Damit die Premierengang von Film zu Film wandern kann :-) )
//       - "Brickboard for president: XX" könnte der Titel sein. (XX Ersetzt durch euren Titel) muss aber nicht zwangsläufig.
//       - Eine Playlist wird auf dem Steinerei Kanal erstellt und diese überall veröffentlicht. -> XXX
//       - In der Beschreibung der einzelnen Filme wird auf die Playlist verwiesen. https://www.youtube.com/playlist?list=P ... xVhkahPOR1
//       - Natürlich könnt/dürft ihr euer eigenes Intro und Abspann in den Film integrieren, so wie ihr wollt.
      
//       Ihr könnt natürlich sofort losbricken 
//       '
//       type={1}
//       author="Knauser"
//       created={new Date(2020, 10, 14, 16, 5)}
//       ></Post>
//     </ContentContainer>