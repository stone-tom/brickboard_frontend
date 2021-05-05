import React, { useEffect, useMemo, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Params } from 'next/dist/next-server/server/router';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FlexRight, MarginBottom, ViewWrapper } from '../../styles/global.styles';
import TopicItem from '../../elements/forum/components/TopicItem/TopicItem';
import { useStoreDispatch, useStoreState } from '../../context/custom_store';
import Layout from '../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../elements/core/components/Breadcrumbs/Breadcrumbs';
import ForumHeading from '../../elements/forum/components/ForumHeading/ForumHeading';
import {
  backendURL,
  getMessageBoardGroups,
  getTopicViews,
  markAllAsReadMessageboard,
} from '../../util/api';
import filterContent from '../../util/filter';
import { get } from '../../util/methods';
import findObject from '../../util/finder';
import Button from '../../elements/core/components/Button/Button';
import ITopic from '../../models/ITopic';
import IMessageboard from '../../models/IMessageboard';
import IUser from '../../models/IUser';
import Hint from '../../elements/core/components/Hint/Hint';
import MoviePresentations from '../../elements/forum/container/MoviePresentations/MoviePresentations';
import Pagination from '../../elements/core/container/Pagination/Pagination';
import { MessageType } from '../../models/IMessage';
import getCategories from '../../util/api/topic/get-categories';

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
  const { content: categoryData, fetchURL: categoryURL } = await getCategories();

  const topicsData = content;
  return {
    props: {
      topicsData,
      categoryData,
      categoryURL,
      slug: params.slug,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface SubforumProps {
  topicsData: any,
  slug: string,
  categoryData: any,
  categoryURL: string,
}

function Subforum({
  topicsData,
  slug,
  categoryData,
  categoryURL,
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
  const { setMessage } = useStoreDispatch();
  const {
    data,
  } = useSWR(
    `${backendURL}/${slug}/topics/page-${pageIndex}`,
    get,
    { initialData: topicsData, revalidateOnMount: true },
  );
  const messageboard: IMessageboard = filterContent(data, 'messageboard')[0];
  const topicViews = data.data;
  const topicList = filterContent(data, 'topic');
  const userList = filterContent(data, 'user');
  const readTopics = filterContent(data, 'user_topic_read_state');
  const openTopic = (clickedTopic: ITopic) => {
    if (clickedTopic.attributes.moderation_state !== 'blocked' || user.attributes.admin) {
      router.push(`./${slug}/${clickedTopic.id}`);
    }
  };

  const markAllAsRead = async () => {
    const { error } = await markAllAsReadMessageboard(messageboard.id);
    if (!error) {
      setMessage({
        content: 'Themen als gelesen markiert',
        type: MessageType.success,
      });
      mutate(`${backendURL}/${slug}/topics/page-${pageIndex}`, data, true);
    } else {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
  };

  if (data.data.length === 0 || data.included === []) {
    return (
      <Layout title="Themen - Brickboard 2.0">
        <ViewWrapper>
          <Breadcrumbsbar slug={slug} messageboardname={slug} />
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
    const [selected, setSelected] = useState<number[]>([]);
    const { data: allCategories } = useSWR(
      categoryURL,
      get,
      { revalidateOnMount: true, initialData: categoryData },
    );
    const { data: filteredMovies } = useSWR(`${backendURL}/topics/filter-movies?category_ids=[${selected}]`, get);
    const [filterLoading, setFilterLoading] = useState<boolean>(false);

    const currentMovies = useMemo(() => {
      if (filteredMovies && selected.length > 0) {
        return filteredMovies.data;
      }
      return topicList;
    }, [selected, topicList, filteredMovies]);

    useEffect(() => {
      if (!filteredMovies && selected.length > 0) {
        setFilterLoading(true);
      }
      if (filteredMovies) setFilterLoading(false);
    }, [selected, filteredMovies]);
    return (
      <Layout title={`${messageboard.attributes.name} - Brickboard 2.0`}>
        <ViewWrapper>
          <Breadcrumbsbar slug={slug} messageboardname={messageboard.attributes.name} />
          <ForumHeading title={`${messageboard.attributes.name}`} />
          <MoviePresentations
            filterLoading={filterLoading}
            movies={currentMovies}
            users={userList}
            categories={allCategories.data}
            onCategorySelect={(newCategories) => setSelected(newCategories)}
          />
          <Pagination
            totalLength={messageboard.attributes.movies_count}
            pageIndex={pageIndex}
            paginationSize={20}
            onClick={(index: number) => setPageIndex(index)}
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
        {isAuthenticated && (
          <MarginBottom>
            <Button
              reset
              onClick={() => markAllAsRead()}
            >
              Themen als gelesen markieren
            </Button>
          </MarginBottom>
        )}
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
        <Pagination
          totalLength={messageboard.attributes.topics_count}
          pageIndex={pageIndex}
          paginationSize={20}
          onClick={(index: number) => setPageIndex(index)}
        />
        {isAuthenticated && (
          <FlexRight>
            <Link href={`./${slug}/neues-thema`} passHref>
              <Button icon={faPlus} disabled={moderation_state === 'blocked'}>
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
