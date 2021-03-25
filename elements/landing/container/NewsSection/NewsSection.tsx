import React, { useState } from 'react';
import Link from 'next/link';
import INewsItem from '../../../../models/INewsItem';
import NewsItem from '../../components/NewsItem/NewsItem';
import {
  AllNewsItem,
  NewsListing,
  NewsSectionWrapper,
  ShowCase,
} from './NewsSection.styles';
import Button from '../../../core/components/Button/Button';
import findObject from '../../../../util/finder';
import { ViewWrapper } from '../../../../styles/global.styles';

interface NewsSectionProps {
  newsList: INewsItem[];
  authors?: any[];
}

const NewsSection = ({ newsList, authors }: NewsSectionProps) => {
  const [activeNews, setActiveNews] = useState(newsList[0]);

  const changeActiveNews = (newsItem) => {
    setActiveNews(newsItem);
  };

  return (
    <NewsSectionWrapper>
      <ShowCase>
        {activeNews ? (
          <NewsItem
            newsitem={activeNews}
            author={findObject(authors, activeNews.relationships.user.data.id)}
            active
          />
        ) : (
          <ViewWrapper small center>
            <h2>Noch keine News vorhanden</h2>
          </ViewWrapper>
        )}

      </ShowCase>
      <NewsListing>
        {newsList.map((news: INewsItem) => (
          <NewsItem
            bordered={news.id === activeNews.id}
            key={`news_${news.id}`}
            newsitem={news}
            author={findObject(authors, news.relationships.user.data.id)}
            onClick={() => changeActiveNews(news)}
          />
        ))}
        <AllNewsItem>
          <Link href="./news">
            <Button reset>
              Alle News anzeigen
            </Button>
          </Link>
        </AllNewsItem>
      </NewsListing>
    </NewsSectionWrapper>
  );
};

export default NewsSection;
