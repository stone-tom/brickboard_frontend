import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
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
import Hint from '../../elements/core/components/Hint/Hint';
import MoviePresentations from '../../elements/forum/container/MoviePresentations/MoviePresentations';

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
    fallback: true,
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
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout title="Themen - Brickboard 2.0">
        <ViewWrapper>
          <h1>Bitte warten, die Seite lädt...</h1>
        </ViewWrapper>
      </Layout>
    );
  }
  const [pageIndex, setPageIndex] = useState(1);
  const { isAuthenticated, user, moderation_state } = useStoreState();
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
  const openTopic = (clickedTopic: ITopic) => {
    if (clickedTopic.attributes.moderation_state !== 'blocked' || user.attributes.admin) {
      router.push(`./${slug}/${clickedTopic.id}`);
    }
  };

  if (data.data.length === 0 || data.included === []) {
    return (
      <Layout title="Themen - Brickboard 2.0">
        <ViewWrapper>
          <Breadcrumbsbar slug={slug} messageboardname={messageboard.attributes.name} />
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

  if (slug === 'filmvorstellungen') {
    return (
      <Layout title={`${messageboard.attributes.name} - Brickboard 2.0`}>
        <ViewWrapper>
          <Breadcrumbsbar slug={slug} messageboardname={messageboard.attributes.name} />
          <ForumHeading title={`${messageboard.attributes.name}`} />
          <MoviePresentations
            movies={topicList}
            users={userList}
          />
          {isAuthenticated && (
            <FlexRight>
              <Link href={`./${slug}/neues-thema`} passHref>
                <Button disabled={moderation_state === 'blocked'}>
                  {moderation_state !== 'approved' ? (
                    <Hint hint="Dein Konto ist nicht freigeschalten">
                      Thema erstellen
                    </Hint>
                  )
                    : (
                      'Thema erstellen'
                    )}
                </Button>
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
        <Breadcrumbsbar slug={slug} messageboardname={messageboard.attributes.name} />

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
          if (topic.attributes.moderation_state === 'approved') {
            if (!isAuthenticated) {
              return (
                <TopicItem
                  key={topic.attributes.slug}
                  slug={slug}
                  topic={topic}
                  author={author}
                  lastCommentor={lastCommentor}
                  onClick={() => openTopic(topic)}
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
                onClick={() => openTopic(topic)}
              />
            );
          } if (isAuthenticated
            && (user.attributes.display_name === author.attributes.display_name
              || user.attributes.admin)) {
            return (
              <TopicItem
                key={topic.attributes.slug}
                slug={slug}
                topic={topic}
                author={author}
                lastCommentor={lastCommentor}
                markUnread={unread}
                isAuthenticated
                onClick={() => openTopic(topic)}
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
              <Button disabled={moderation_state === 'blocked'}>
                {moderation_state !== 'approved' ? (
                  <Hint hint="Dein Konto ist nicht freigeschalten">
                    Thema erstellen
                  </Hint>
                )
                  : (
                    'Thema erstellen'
                  )}
              </Button>
            </Link>
          </FlexRight>
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default Subforum;
