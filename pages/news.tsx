import React, { useState } from 'react';
import useSWR from 'swr';
import { GetStaticProps } from 'next';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexRight, ViewWrapper } from '../styles/global.styles';
import { backendURL, deleteNews, getNews } from '../util/api';
import filter from '../util/filter';
import NewsArticle from '../elements/landing/components/NewsArticle/NewsArticle';
import findObject from '../util/finder';
import INewsItem from '../models/INewsItem';
import NewsCreator from '../elements/news/container/NewsCreator/NewsCreator';
import { NewsArticleContainer } from '../elements/landing/components/NewsArticle/NewsArticle.styles';
import { useStoreDispatch, useStoreState } from '../context/custom_store';
import Button from '../elements/core/components/Button/Button';
import Restrictions from '../config/file_upload_restrictions.json';
import { get } from '../util/methods';
import Prompt from '../elements/core/container/Prompt/Prompt';
import { MessageType } from '../models/IMessage';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getNews();

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
    `${backendURL}/news/page-${pageIndex}`,
    get,
    { revalidateOnMount: true, initialData: content },
  );
  const { isAuthenticated, user } = useStoreState();
  const { addComponent, setMessage } = useStoreDispatch();
  const [editorActive, setEditorActive] = useState(false);
  const toggleEditor = () => setEditorActive(!editorActive);

  if (data === undefined || data.data === undefined) {
    return (
      <Layout title="News - Brickboard 2.0">
        <ViewWrapper center column>
          <h1>Keine News vorhanden</h1>
        </ViewWrapper>
      </Layout>
    );
  }
  const userList = filter(data, 'user');
  const newsList = data.data;

  const mutateNews = (freshNews, updated = false) => {
    if (updated) {
      const updatedNews = {
        data: data.data.map((item) => {
          if (parseInt(item.id, 10) === parseInt(freshNews.data.id, 10)) {
            return {
              ...freshNews.data,
            };
          }
          return item;
        }),
        included: [
          ...data.included,
        ],
      };
      mutate(updatedNews, false);
      return;
    }
    newsList.unshift(freshNews.data);
    if (!findObject(userList, freshNews.data.relationships.user.data.id)) {
      mutate({
        ...data,
        included: [...data.included, freshNews.included[0]],
      }, false);
    }
    toggleEditor();
  };

  const performDelete = async (id) => {
    const { error } = await deleteNews(id);
    if (error) {
      setMessage({
        content: 'Fehler beim löschen',
        type: MessageType.error,
      });
    } else {
      setMessage({
        content: 'News erfolgreich gelöscht',
        type: MessageType.success,
      });
      const updatedNews = {
        data: data.data.filter((item) => {
          if (item.id === id) return null;
          return item;
        }),
        included: [
          ...data.included,
        ],
      };
      mutate(updatedNews, false);
    }
  };

  const onTryDeleting = (id) => {
    addComponent((
      <Prompt
        headline="Löschen bestätigen?"
        onAccept={() => performDelete(id)}
      >
        <div>
          <p>News löschen kann nicht rückgängig gemacht werden!</p>
        </div>
      </Prompt>));
  };

  return (
    <Layout title="Neuigkeiten aus der Brickfilmwelt - Brickboard 2.0">
      <ViewWrapper>
        <h1>Alle Neuigkeiten</h1>
        {isAuthenticated && user.attributes.admin && (
          <FlexRight>
            <Button onClick={() => toggleEditor()}>
              {editorActive ? 'Abbrechen' : 'News erstellen'}
            </Button>
          </FlexRight>
        )}
        <NewsArticleContainer>
          {editorActive && (
            <NewsCreator
              onCreateNews={({ content: freshNews }) => mutateNews(freshNews)}
              maxSize={Restrictions.max_size_news}
              allowedTypes={Restrictions.allowed_file_types_news}
            />
          )}
          {newsList.map((news: INewsItem) => {
            if (news !== null) {
              return (
                <NewsArticle
                  key={`news_${news.id}`}
                  news={news}
                  author={findObject(userList, news.relationships.user.data.id)}
                  onDelete={({ id }) => onTryDeleting(id)}
                  onUpdated={({ content: freshNews }) => mutateNews(freshNews, true)}
                />
              );
            }
            return null;
          })}
        </NewsArticleContainer>
        {pageIndex > 1 && (
          <Button small type="button" onClick={() => setPageIndex(pageIndex - 1)}>
            Vorige Seite
          </Button>
        )}
        {newsList.length >= 10 && (
          <Button small type="button" onClick={() => setPageIndex(pageIndex + 1)}>
            Nächste Seite
          </Button>
        )}
      </ViewWrapper>
    </Layout>
  );
};

export default NewsPage;
