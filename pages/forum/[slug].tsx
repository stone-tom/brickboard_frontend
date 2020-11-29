import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import TopicItem from "../../elements/core/components/TopicItem/TopicItem";
import { Params } from "next/dist/next-server/server/router";
import { ContentContainer } from "../../global.styles";
import useSWR from "swr";
import {useSession} from "next-auth/client";
import Link from "next/link";

//Welche Pfade prerendered werden können
export const getStaticPaths: GetStaticPaths=async ()=>{

  const res = await fetch(`https://${process.env.BACKEND_URL}/messageboards`);
  const messageboardData = await res.json();
  // console.log("THE SLUG PAGE GETS");
  // console.log(messageboardData.data[0].attributes.messageboards);
  const messageboards=messageboardData.data[0].attributes.messageboards;
  // console.log(messageboards);
    return {

        paths: messageboards.map(board=>({
          params:{ 
            slug: board.messageboard.slug
          }
        })),
        fallback: false, 
      };
};

export const getStaticProps: GetStaticProps = async ({params}:Params) => {
  console.log("THE PARAMS:");
  console.log(params)
  const res = await fetch(`https://${process.env.BACKEND_URL}/${params.slug}/topics`);
  let topicsData = await res.json();
  topicsData = topicsData.data;
  // console.log("THE TOPICS");
  // console.log(topics);
  return {
    props: {
      topicsData,
      slug: params.slug
    },
    revalidate: 1,
  };
};

const fetcher = url => fetch(url).then(r => r.json())


function Subforum({ topicsData, slug }) {

  const [session,loading]=useSession();
  let {data,error}=useSWR(`https://${process.env.BACKEND_URL}/${slug}/topics`,fetcher,{initialData: topicsData, revalidateOnMount: true});
  const topicList=topicsData.attributes.topic_views;

  return (
    <>
    <ContentContainer>
      {session && <>
        <Link href={`./${slug}/neuesThema`}>Neues Thema erstellen</Link>
      </>
      }

      {topicList.map(topic=>{
        return(
          <TopicItem
          key={topic.topic.id}
          type={0}
          title={topic.topic.title}
          author={`User mit id: ${topic.topic.user_id}`}
          views={420}
          comments={topic.topic.posts_count}
          created={new Date(topic.topic.created_at)}
          changed={new Date(2020,10,26,8,14)}
          updated
        />
        );
      })}
      <TopicItem
        type={0}
        title="Brickboard for president, community event"
        author="Knauser"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
        updated
      />
       <TopicItem
        type={2}
        title="Das neue Brickboard ist da!"
        author="Andreas Bitzan"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
      />
       <TopicItem
        type={1}
        title="Wer macht alles bei meinem Wettberwerb mit"
        author="Legostudio01"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
        updated
      />
    </ContentContainer>
    </>
  );
}

export default Subforum;
