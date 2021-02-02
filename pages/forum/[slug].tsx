import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import useSWR from 'swr';
import Link from 'next/link';
import { ViewWrapper } from '../../styles/global.styles';
import TopicItem from '../../elements/forum/components/TopicItem/TopicItem';
import { useStoreState } from '../../context/custom_store';
import Layout from '../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../elements/core/components/Breadcrumbs/Breadcrumbs';
import ForumHeading from '../../elements/forum/components/ForumHeading/ForumHeading';
import { backendURL, getMessageBoardGroups, getTopicViews } from '../../util/api';
import filterContent from '../../util/filter';
import { get } from '../../util/methods';
import findObject from '../../util/finder';

// Welche Pfade prerendered werden können
export const getStaticPaths: GetStaticPaths = async () => {
  const { content } = await getMessageBoardGroups();

  const messageboards = filterContent(content, 'messageboard');

  return {
    paths: messageboards.map((board) => ({
      params: {
        slug: board.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { content, fetchURL } = await getTopicViews(params.slug);

  const topicsData = content;
  const messageboardName = params.slug;
  return {
    props: {
      topicsData,
      slug: params.slug,
      messageboardName,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface SubforumProps {
  topicsData: any,
  slug: string,
  messageboardName: string,
}

function Subforum({
  topicsData,
  slug,
  messageboardName,
}: SubforumProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const { isAuthenticated } = useStoreState();
  const {
    data,
  } = useSWR(
    `${backendURL}/${slug}/topics/page-${pageIndex}`,
    get,
    { initialData: topicsData, revalidateOnMount: true },
  );
  const topicViews = data.data;
  const topicList = filterContent(data, 'topic');
  const userList = filterContent(data, 'user');
  const readTopics = filterContent(data, 'user_topic_read_state');
  return (
    <Layout title={`${messageboardName} - Brickboard 2.0`}>
      <ViewWrapper>
        <Breadcrumbsbar slug={slug} />

        <ForumHeading title={`${messageboardName}`} />

        {topicViews.map((topicView) => {
          const topic = findObject(topicList, topicView.relationships.topic.data.id);
          const author = findObject(userList, topic.relationships.user.data.id);
          const lastCommentor = findObject(userList, topic.relationships.last_user.data.id)
          let readstate = null;

          
          if (topicView.relationships.read_state !== undefined) {
            readstate = findObject(readTopics, topicView.relationships.read_state.data.id);
          }
          let unread = false;
          if ((readstate === null && isAuthenticated) || (readstate !== null && readstate.attributes.unread_posts_count > 0)) {
            unread = true;
          }
          if(topic.attributes.title=="Ein Test"){
            console.log("TOPIC",topic.attributes.title);
            console.log("TOPICVIEW",topicView)
            console.log("READSTATE", readstate);
            console.log("UNREAD?", unread);
            console.log("IS AUTHENTICATED?", isAuthenticated);
          }
       
          // console.log("READSTATE",readstate);
          // console.log(isAuthenticated);
          return (
            <TopicItem
              key={topic.attributes.slug}
              slug={slug}
              topic={topic}
              author={author}
              lastCommentor={lastCommentor}
              readstate={readstate}
              markUnread={unread}
              isAuthenticated={isAuthenticated}
            />
          );
        })}
        {pageIndex > 1 && (
          <button type="button" onClick={() => setPageIndex(pageIndex - 1)}>
            Vorige Seite
          </button>
        )}
        {topicList.length >= 20 && (
          <button type="button" onClick={() => setPageIndex(pageIndex + 1)}>
            Nächste Seite
          </button>
        )}
        {isAuthenticated && (
          <Link href={`./${slug}/neues-thema`} passHref>Neues Thema erstellen</Link>

        )}
      </ViewWrapper>
    </Layout>
  );
}

export default Subforum;
