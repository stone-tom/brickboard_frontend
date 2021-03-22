import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexRight, ViewWrapper } from '../styles/global.styles';
import { getNews } from '../util/api';
import filter from '../util/filter';
import NewsArticle from '../elements/landing/components/NewsArticle/NewsArticle';
import findObject from '../util/finder';
import INewsItem from '../models/INewsItem';
import NewsCreator from '../elements/news/container/NewsCreator/NewsCreator';
import { NewsArticleContainer } from '../elements/landing/components/NewsArticle/NewsArticle.styles';
import { useStoreState } from '../context/custom_store';
import { Button } from '../elements/core/components/Button/Button.styles';
import Restrictions from '../config/file_upload_restrictions.json';
import useSWR from 'swr';
import { get } from '../util/methods';

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
  fetchUrl: string,
}
const NewsPage = ({ content, fetchUrl }: NewsProps) => {
  const { data, mutate } = useSWR(
    fetchUrl,
    get,
    { revalidateOnMount: true, initialData: content },
  );
  const { isAuthenticated, user } = useStoreState();
  const [editorActive, setEditorActive] = useState(false);
  const toggleEditor = () => setEditorActive(!editorActive);

  console.log("THE DATA", data);

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

  const mutateNews = (freshNews) => {
    console.log("Triggered mutate");
    console.log({
      ...data,
      data: [...data.data, freshNews.data],
      included: [...data.included, freshNews.included[0]],
    });
    if (!findObject(userList, freshNews.data.relationships.user.data.id)) {
      mutate({
        ...data,
        data: [...data.data, freshNews.data],
        included: [...data.included, freshNews.included[0]],
      }, false);
    } else {
      mutate({
        ...data,
        data: [...data.data, freshNews.data],
      }, false);
    }
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
          {newsList.map((news: INewsItem) => (
            <NewsArticle
              news={news}
              author={findObject(userList, news.relationships.user.data.id)}
            />
          ))}
        </NewsArticleContainer>
      </ViewWrapper>
    </Layout>
  );
};

export default NewsPage;
