import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import useSWR from 'swr';
import Link from 'next/link';
import { FlexRight, ViewWrapper } from '../../styles/global.styles';
import TopicItem from '../../elements/forum/components/TopicItem/TopicItem';
import { useStoreState } from '../../context/custom_store';
import Layout from '../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../elements/core/components/Breadcrumbs/Breadcrumbs';
import ForumHeading from '../../elements/forum/components/ForumHeading/ForumHeading';
import { backendURL, getMessageBoardGroups, getTopicViews } from '../../util/api';
import filterContent from '../../util/filter';
import { get } from '../../util/methods';
import findObject from '../../util/finder';
import { Button } from '../../elements/core/components/Button/Button.styles';
import ITopic from '../../models/ITopic';
import IMessageboard from '../../models/IMessageboard';
import IUser from '../../models/IUser';

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
  return {
    props: {
      topicsData,
      slug: params.slug,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface SubforumProps {
  topicsData: any,
  slug: string,
}

function Subforum({
  topicsData,
  slug,
}: SubforumProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const { isAuthenticated, user } = useStoreState();
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
  const messageboard: IMessageboard = filterContent(data, 'messageboard')[0];

  if (data.data.length === 0 || data.included === []) {
    return (
      <Layout title="Themen - Brickboard 2.0">
        <ViewWrapper>
          <Breadcrumbsbar slug={slug} />
          <h1>Dieses Board hat leider noch keine Themen...</h1>
          {isAuthenticated && (
            <FlexRight>
              <Link href={`./${slug}/neues-thema`} passHref>
                <Button>Thema erstellen</Button>
              </Link>
            </FlexRight>
          )}
        </ViewWrapper>
      </Layout>
    );
  }

  return (
    <Layout title={`${messageboard.attributes.name} - Brickboard 2.0`}>
      <ViewWrapper>
        <Breadcrumbsbar slug={slug} />

        <ForumHeading title={`${messageboard.attributes.name}`} />

        {topicViews.map((topicView) => {
          const topic: ITopic = findObject(topicList, topicView.relationships.topic.data.id);
          const author: IUser = findObject(userList, topic.relationships.user.data.id);
          const lastCommentor: IUser = findObject(userList, topic.relationships.last_user.data.id);
          let readstate = null;

          if (topicView.relationships.read_state !== undefined) {
            readstate = findObject(readTopics, topicView.relationships.read_state.data.id);
          }
          let unread = false;
          if ((readstate === null && isAuthenticated)
            || (readstate !== null && readstate.attributes.unread_posts_count > 0)) {
            unread = true;
          }
          if (topic.attributes.moderation_state !== 'blocked') {
            if (!isAuthenticated) {
              return (
                <TopicItem
                  key={topic.attributes.slug}
                  slug={slug}
                  topic={topic}
                  author={author}
                  lastCommentor={lastCommentor}
                />
              );
            }
            return (
              <TopicItem
                key={topic.attributes.slug}
                slug={slug}
                topic={topic}
                author={author}
                lastCommentor={lastCommentor}
                markUnread={unread}
                isAuthenticated
              />
            );
          }
          if (isAuthenticated && user.attributes.admin) {
            return (
              <TopicItem
                key={topic.attributes.slug}
                slug={slug}
                topic={topic}
                author={author}
                lastCommentor={lastCommentor}
                markUnread={unread}
                isAuthenticated
              />
            );
          }
          return null;
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
          <FlexRight>
            <Link href={`./${slug}/neues-thema`} passHref>
              <Button>Thema erstellen</Button>
            </Link>
          </FlexRight>
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default Subforum;
