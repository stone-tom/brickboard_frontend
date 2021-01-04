import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import ForumItem from "../elements/core/components/ForumItem/ForumItem";
import { ContentContainer } from "../global.styles";
import ForumHeading from "../elements/core/components/ForumHeading/ForumHeading";
import Fetcher from "../lib/data-client";
import useSWR from "swr";
import Link from "next/link";
import Layout from "../elements/core/container/Layout/Layout";
import { groupEnd } from "console";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `https://${process.env.BACKEND_URL}/messageboard-groups`
  );

  const getTopics=async(boards)=>{
    const promises = boards.map(async (mb)=>{
      return{
        topic: await (await fetch(`https://${process.env.BACKEND_URL}/${mb.attributes.slug}/topics/${mb.attributes.last_topic_id}`)).json(),
      }
    });
    return Promise.all(promises);
  }
  const messageboardData = await res.json();
  let topics= await getTopics(messageboardData.included);

  // console.log("THIS IS MY RESPONSE");
  // console.log(messageboards.data[0].attributes);
  // const messageboardData = messageboards.data.[0].attributes.messageboards;
  return {
    props: {
      messageboardData,
      topics,
    },
    revalidate: 1,
  };
};
const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

function Forum({ messageboardData, topics }) {
  let { data, error } = useSWR(
    "https://brickboard.herokuapp.com/messageboard-groups",
    fetcher,
    { initialData: messageboardData, revalidateOnMount: true }
  );
  
    const getTopic=(id: number)=>{
 
    return topics.find((topic)=> id==topic.topic.data.attributes.topic.data.attributes.topic.data.attributes.id)
  }

  const messageboards = data.included;

  const findMessageBoard = (id: number) => {
    return messageboards.find((mb) => mb.id == id);
  };
  const messageboadGroupViews = data.data;
  if (messageboadGroupViews.length == 0) {
    return <ContentContainer>Es gibt noch keine Beiträge!</ContentContainer>;
  }
  return (
    <Layout title="Forum - Brickboard 2.0">
      <ContentContainer>
        {messageboadGroupViews.map((group) => {
          return (
            <div key={group.attributes.name}>
              <ForumHeading
                title={group.attributes.name}
              />
              {group.relationships &&
                group.relationships.messageboards.data.map((mb) => {
                  let board = findMessageBoard(mb.id);
                  if (board != undefined) {
                    let lastTopic=getTopic(board.attributes.last_topic_id);
                    return (
                      <ForumItem
                        id={board.attributes.id}
                        key={board.attributes.slug}
                        title={board.attributes.name}
                        description={board.attributes.description}
                        topics={board.attributes.topics_count}
                        lastTopicTitle={lastTopic ? lastTopic.topic.data.attributes.topic.data.attributes.topic.data.attributes.title : "Fehler beim Laden"}
                        lastTopicDate={lastTopic ? new Date(lastTopic.topic.data.attributes.topic.data.attributes.topic.data.attributes.created_at) : new Date(Date.now())}
                        lastAuthor={lastTopic.topic.data.attributes.topic.data.attributes.topic.included[1].attributes.display_name}
                        slug={board.attributes.slug}
                      />
                    );
                  }
                })}
            </div>
          );
        })}
      </ContentContainer>
    </Layout>
  );
}

export default Forum;
