import React, { useState } from 'react';
import Link from 'next/link';
import INewsItem from '../../../../models/INewsItem';
import NewsItem from '../../components/NewsItem/NewsItem';
import { AllNewsItem, NewsListing, NewsSectionWrapper, ShowCase } from './NewsSection.styles';
import Button from '../../../core/components/Button/Button';

const demoUser = {
  id: '1',
  type: 'user',
  attributes: {
    admin: true,
    display_name: 'Admin',
    created_at: '2021-02-02T15:01:40.112+01:00',
    updated_at: '2021-03-22T09:48:52.909+01:00',
    avatar: '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--239de5b64967567e087f883146c9ed6da13acb79/default_profile.jpg',
  },
  relationships: {
    thredded_user_detail: {
      data: {
        id: '1',
        type: 'thredded_user_detail',
      },
    },
  },
};

interface NewsSectionProps {
  newsList: any;
}

const NewsSection = ({ newsList } : NewsSectionProps) => {
  const [activeNews, setActiveNews] = useState(newsList[0]);

  const changeActiveNews = (newsItem) => {
    setActiveNews(newsItem);
  };

  return (
    <NewsSectionWrapper>
      <ShowCase>
        <NewsItem newsitem={activeNews} author={demoUser} active />
      </ShowCase>
      <NewsListing>
        {newsList.map((news: INewsItem) => <NewsItem bordered={news.id === activeNews.id} key={`news_${news.id}`} newsitem={news} author={demoUser} onClick={() => changeActiveNews(news)} />)}
        <AllNewsItem>
          <Link href="./news" passHref>
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
