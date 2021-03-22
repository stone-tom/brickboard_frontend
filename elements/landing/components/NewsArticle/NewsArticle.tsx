import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import INewsItem from '../../../../models/INewsItem';
import IUser from '../../../../models/IUser';
import {
  NewsArticleButtonFloat,
  NewsArticleHeader,
  NewsArticleHeading,
  NewsArticleImageWrapper,
  NewsArticleInfos,
  NewsArticleWrapper,
} from './NewsArticle.styles';
import { ExternalLink } from '../../../core/components/ExternalLink/ExternalLink.styles';
import Button from '../../../core/components/Button/Button';
import { backendURL } from '../../../../util/api';

interface NewsArticleProps {
  author: IUser;
  news: INewsItem;
}

const NewsArticle = ({ author, news }: NewsArticleProps) => (

  <NewsArticleWrapper>
    <NewsArticleImageWrapper>
      <Image src={news.attributes.news_banner ? `${backendURL}${news.attributes.news_banner}` : '/assets/images/news1.jpg'} alt={news.attributes.title} objectFit="cover" layout="fill" />
    </NewsArticleImageWrapper>
    <NewsArticleInfos>
      <NewsArticleHeader>
        <NewsArticleHeading>{news.attributes.title}</NewsArticleHeading>
        <p>{`Von ${author.attributes.display_name}, am ${format(new Date(news.attributes.created_at), 'dd.MM.yyyy')}`}</p>
      </NewsArticleHeader>
      <p>{news.attributes.short_description}</p>
      {news.attributes.description && <p>{news.attributes.description}</p>}
    </NewsArticleInfos>
    <NewsArticleButtonFloat>
      {news.attributes.url && (
        <ExternalLink href="">Zur Seite</ExternalLink>)}
      {news.attributes.topic_id && <Link href={`./${news.attributes.topic_id}`} passHref><Button>Zum Beitrag</Button></Link>}
    </NewsArticleButtonFloat>
  </NewsArticleWrapper>
);

export default NewsArticle;
