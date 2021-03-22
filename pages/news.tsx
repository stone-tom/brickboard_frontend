import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import { getNews } from '../util/api';
import filter from '../util/filter';
import NewsArticle from '../elements/landing/components/NewsArticle/NewsArticle';
import findObject from '../util/finder';
import INewsItem from '../models/INewsItem';
import { NewsArticleContainer } from '../elements/landing/components/NewsArticle/NewsArticle.styles';

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
  if (content === undefined || content.data === undefined) {
    return (
      <Layout title="News - Brickboard 2.0">
        <ViewWrapper center column>
          <h1>Keine News vorhanden</h1>
        </ViewWrapper>
      </Layout>
    );
  }
  const userList = filter(content, 'user');
  const newsList = content.data;
  return (
    <Layout title="Neuigkeiten aus der Brickfilmwelt - Brickboard 2.0">
      <ViewWrapper>
        <h1>Alle Neuigkeiten</h1>
        <NewsArticleContainer>
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
