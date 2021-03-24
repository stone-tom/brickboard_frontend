import React, { useState } from 'react';
import useSWR from 'swr';
import { GetStaticProps } from 'next';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexRight, ViewWrapper } from '../styles/global.styles';
import { backendURL, getEvents } from '../util/api';
import filter from '../util/filter';
import NewsArticle from '../elements/landing/components/NewsArticle/NewsArticle';
import findObject from '../util/finder';
import INewsItem from '../models/INewsItem';
import NewsCreator from '../elements/news/container/NewsCreator/NewsCreator';
import { NewsArticleContainer } from '../elements/landing/components/NewsArticle/NewsArticle.styles';
import { useStoreDispatch, useStoreState } from '../context/custom_store';
import { Button } from '../elements/core/components/Button/Button.styles';
import Restrictions from '../config/file_upload_restrictions.json';
import { get } from '../util/methods';
import Prompt from '../elements/core/container/Prompt/Prompt';
import { MessageType } from '../models/IMessage';
import IEvent from '../models/IEvent';
import EventItem from '../elements/landing/components/EventItem/EventItem';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getEvents();

  return {
    props: {
      content,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface NewsProps {
  content: any;
}
const NewsPage = ({ content }: NewsProps) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, mutate } = useSWR(
    `${backendURL}/events/page-${pageIndex}`,
    get,
    { revalidateOnMount: true, initialData: content },
  );
  const { isAuthenticated, user } = useStoreState();
  const { addComponent, setMessage } = useStoreDispatch();
  const [editorActive, setEditorActive] = useState(false);
  const toggleEditor = () => setEditorActive(!editorActive);

  if (data === undefined || data.data === undefined) {
    return (
      <Layout title="Events - Brickboard 2.0">
        <ViewWrapper center column>
          <h1>Keine Events vorhanden</h1>
        </ViewWrapper>
      </Layout>
    );
  }
  const userList = filter(data, 'user');
  const eventList = data.data;

  return (
    <Layout title="Brickfilm-Events - Brickboard 2.0">
      <ViewWrapper>
        <h1>Alle Brickfilming Events</h1>
        {isAuthenticated && user.attributes.admin && (
          <FlexRight>
            <Button onClick={() => toggleEditor()}>
              {editorActive ? 'Abbrechen' : 'Event erstellen'}
            </Button>
          </FlexRight>
        )}
        <NewsArticleContainer>
          {editorActive && (
            <p>sds</p>
          )}
          {eventList.map((eventItem: IEvent) => {
            if (news !== null) {
              return (
                <EventItem
                  key={`event_${eventItem.id}`}
                  
                />
              );
            }
            return null;
          })}
        </NewsArticleContainer>
        {pageIndex > 1 && (
          <button type="button" onClick={() => setPageIndex(pageIndex - 1)}>
            Vorige Seite
          </button>
        )}
        {newsList.length >= 10 && (
          <button type="button" onClick={() => setPageIndex(pageIndex + 1)}>
            Nächste Seite
          </button>
        )}
      </ViewWrapper>
    </Layout>
  );
};

export default NewsPage;
