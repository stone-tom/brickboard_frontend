import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import TopicItem from "../../elements/core/components/TopicItem/TopicItem";
import { Params } from "next/dist/next-server/server/router";
import { ContentContainer } from "../../global.styles";
import useSWR from "swr";
import Link from "next/link";
import { useAuthState } from "../../context/auth";
import Layout from "../../elements/core/container/Layout/Layout";
import Breadcrumbsbar from "../../elements/core/components/Breadcrumbs/Breadcrumbs";
import ForumHeading from "../../elements/core/components/ForumHeading/ForumHeading";

//Welche Pfade prerendered werden können
export const getStaticPaths: GetStaticPaths=async ()=>{

  const res = await fetch(`https://${process.env.BACKEND_URL}/messageboards`);
  const messageboardData = await res.json();
  const messageboards=messageboardData.data[0].attributes.messageboards.data;
  
    return {

        paths: messageboards.map(board=>({
          params:{ 
            slug: board.attributes.messageboard.data.attributes.slug
          }
        })),
        fallback: false, 
      };
};

export const getStaticProps: GetStaticProps = async ({params}:Params) => {

  const res = await fetch(`https://${process.env.BACKEND_URL}/${params.slug}/topics`);
  let topicsData = await res.json();
  let messageboardName=params.slug;
  if(topicsData!==undefined && topicsData !==null && topicsData.data !==undefined){
    messageboardName=topicsData.data[0].attributes.topic.included[0].attributes.name;
  }
  // console.log("THE TOPICS");
  // console.log(topicsData.data[0].attributes.topic.included[0].attributes.name);
  return {
    props: {
      topicsData,
      slug: params.slug,
      messageboardName
    },
    revalidate: 1,
  };
};

const fetcher = url => fetch(url).then(r => r.json())


function Subforum({ topicsData, slug, messageboardName }) {
  const {isAuthenticated,user}=useAuthState();
  let {data,error}=useSWR(`https://brickboard.herokuapp.com/${slug}/topics`,fetcher,{initialData: topicsData, revalidateOnMount: true});
  const topicList=data.data;

  return (
    <Layout title={`${messageboardName} - Brickboard 2.0`}>
    <ContentContainer>
    <Breadcrumbsbar slug={slug} />
      {isAuthenticated ? 
        <Link href={`./${slug}/neuesThema`}>Neues Thema erstellen</Link>
      :
      ""
      } 
      <ForumHeading title={`${messageboardName}`} />
      {topicList.map(topic=>{
        return(
          <TopicItem
          id={topic.attributes.topic.data.attributes.id}
          slug={slug}
          key={topic.attributes.topic.data.attributes.id}
          type={0}
          title={topic.attributes.topic.data.attributes.title}
          author={`${topic.attributes.topic.included[1].attributes.display_name}`}
          views={420}
          comments={topic.attributes.topic.data.attributes.posts_count}
          created={topic.attributes.topic.data.attributes.created_at}
          changed={topic.attributes.topic.data.attributes.last_post_at}
          updated
        />
        );
      })}
      <TopicItem
        id={1}
        type={0}
        slug="brickfilme-im-allgemeinen"
        title="Brickboard for president, community event"
        author="Knauser"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
        updated
      />
       <TopicItem
        id={1}  
        slug="brickfilme-im-allgemeinen"
        type={2}
        title="Das neue Brickboard ist da!"
        author="Andreas Bitzan"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
      />
       <TopicItem
        id={1}  
        slug="brickfilme-im-allgemeinen"
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
    </Layout>
  );
}

export default Subforum;
