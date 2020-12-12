import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import ForumItem from "../elements/core/components/ForumItem/ForumItem";
import { ContentContainer } from "../global.styles";
import ForumHeading from "../elements/core/components/ForumHeading/ForumHeading";
import Fetcher from "../lib/data-client";
import useSWR from "swr";
import Link from "next/link";
import Layout from "../elements/core/container/Layout/Layout";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`https://${process.env.BACKEND_URL}/messageboards`);
  const messageboardData = await res.json();
  // console.log("THIS IS MY RESPONSE");
  // console.log(messageboards.data[0].attributes);
  // const messageboardData = messageboards.data.[0].attributes.messageboards;
  return {
    props: {
      messageboardData,
    },
    revalidate: 1,
  };
};
const fetcher = url => fetch(url,{credentials:'include'}).then(r => r.json())


function Forum({ messageboardData }) {

  let {data,error}=useSWR("https://brickboard.herokuapp.com/messageboards",fetcher,{initialData: messageboardData, revalidateOnMount: true});
  // data=JSON.stringify(data);
  // console.log(data.data[0].attributes.messageboards);
  // const messageboards=data.data[0].attributes;
  const messageboards= data.data[0].attributes.messageboards;


  if(messageboardData.length==0){
    return(
      <ContentContainer>
        Es gibt noch keine Beiträge!
      </ContentContainer>
    );
  }
  return (
    <Layout title="Forum - Brickboard 2.0" >
      
      <ContentContainer>
        <Link href="/">Zur Startseite</Link>
        <ForumHeading title="Ankündigungen" />
        <ForumItem
          id={1}
          title="Neuigkeiten"
          description="Neuigkeiten und Ankündigungen um das Brickboard."
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumItem
        id={1}
          title="Steinerei und Wettbewerbe"
          description="Informationen, Ankündigungen und Diskussionen rund um die Steinerei und andere Wettbewerbe!"
          topics={1337}
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumHeading title="Das Board" />
        {messageboards.map(board=>{
          return(
            <ForumItem id={board.messageboard.id} key={board.messageboard.id} title={board.messageboard.name} description={board.messageboard.description} topics={board.messageboard.topics_count} lastTopic={new Date(2020, 10, 14, 16, 5)} lastAuthor={"Was tuama da"} slug={board.messageboard.slug}/>
          );
        })}
      </ContentContainer>
      </Layout>
  );
}

export default Forum;
