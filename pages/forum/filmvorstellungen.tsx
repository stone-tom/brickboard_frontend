import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FlexRight, MarginBottom, ViewWrapper } from '../../styles/global.styles';
import { useStoreDispatch, useStoreState } from '../../context/custom_store';
import Layout from '../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../elements/core/components/Breadcrumbs/Breadcrumbs';
import {
  backendURL,
  getTopicViews,
  markAllAsReadMessageboard,
} from '../../util/api';
import filterContent from '../../util/filter';
import { get } from '../../util/methods';
import Button from '../../elements/core/components/Button/Button';
import IMessageboard from '../../models/IMessageboard';
import Hint from '../../elements/core/components/Hint/Hint';
import MoviePresentations from '../../elements/forum/container/MoviePresentations/MoviePresentations';
import Pagination from '../../elements/core/container/Pagination/Pagination';
import { MessageType } from '../../models/IMessage';
import getCategories from '../../util/api/topic/get-categories';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getTopicViews('filmvorstellungen');
  const { content: categoryData, fetchURL: categoryURL } = await getCategories();

  const topicsData = content;
  return {
    props: {
      topicsData,
      categoryData,
      categoryURL,
      slug: 'filmvorstellungen',
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

function Filmvorstellungen({
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
  const { isAuthenticated, moderation_state } = useStoreState();
  const { setMessage } = useStoreDispatch();
  const {
    data,
  } = useSWR(
    `${backendURL}/${slug}/topics/page-${pageIndex}`,
    get,
    { initialData: topicsData, revalidateOnMount: true },
  );
  const messageboard: IMessageboard = filterContent(data, 'messageboard')[0];
  let topicViews = data.data;
  const topicList = filterContent(data, 'topic');
  let userList = filterContent(data, 'user');
  let readTopics = filterContent(data, 'user_topic_read_state');

  const [selected, setSelected] = useState<number[]>([]);
  const { data: allCategories } = useSWR(
    categoryURL,
    get,
    { revalidateOnMount: true, initialData: categoryData },
  );
  const { data: filteredMovies } = useSWR(`${backendURL}/topics/filter-movies?category_ids=[${selected}]`, get);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  let currentMovies = topicList;
  if (filteredMovies && selected.length > 0) {
    currentMovies = filterContent(filteredMovies, 'topic');
    topicViews = filteredMovies.data;
    readTopics = filterContent(filteredMovies, 'user_topic_read_state');
    userList = filterContent(filteredMovies, 'user');
  }

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
        <MoviePresentations
          messageboard={messageboard}
          filterLoading={filterLoading}
          movies={currentMovies}
          users={userList}
          categories={allCategories.data}
          readStates={readTopics}
          topicViews={topicViews}
          displayReadstates={data !== topicsData}
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
              <Button icon={faPlus} disabled={moderation_state === 'blocked'}>
                {moderation_state !== 'approved' ? (
                  <Hint hint="Dein Konto ist nicht freigeschalten">
                    Thema erstellen
                  </Hint>
                )
                  : (
                    'Film vorstellen'
                  )}
              </Button>
            </Link>
          </FlexRight>
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default Filmvorstellungen;
