import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import ForumItem from "../elements/core/components/ForumItem/ForumItem";
import { ContentContainer } from "../global.styles";
import ForumHeading from "../elements/core/components/ForumHeading/ForumHeading";
import Fetcher, { getMessageboardGroups } from "../lib/data-client";
import useSWR from "swr";
import Link from "next/link";
import Layout from "../elements/core/container/Layout/Layout";

const getTopics=async(boards)=>{
  const promises = boards.map(async (mb)=>{
    return{
      topic: await (await fetch(`https://brickboard.herokuapp.com/${mb.attributes.slug}/topics/${mb.relationships.last_topic.data.id}`)).json(),
    }
  });
  return Promise.all(promises);
}

export const getStaticProps: GetStaticProps = async (context) => {

  
  const messageboardData = await getMessageboardGroups();
  // console.log(messageboardData);
  let topics= await getTopics(messageboardData.included);

  // console.log(topics);
  return {
    props: {
      messageboardData,
      topics,
    },
    revalidate: 1,
  };
};

//TODO: FETCH TOPICS WITH SWR AT PAGE LOAD

function Forum({ messageboardData, topics }) {
  let { data, error } = useSWR(
    "https://brickboard.herokuapp.com/messageboard-groups",
    getMessageboardGroups,
    { initialData: messageboardData, revalidateOnMount: true }
  );
  
    const getTopic=(id: number)=>{
    return topics.find((topic)=> id==topic.topic.data.attributes.topic.data.attributes.topic.data.id)
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
                    let lastTopic=getTopic(board.relationships.last_topic.data.id);
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
