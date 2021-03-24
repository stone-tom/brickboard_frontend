import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { faBan, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
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
import { useStoreState } from '../../../../context/custom_store';
import NewsCreator from '../../../news/container/NewsCreator/NewsCreator';
import Restrictions from '../../../../config/file_upload_restrictions.json';

interface NewsArticleProps {
  author: IUser;
  news: INewsItem;
  onDelete: any;
  onUpdated?: any;
}

const NewsArticle = ({
  author,
  news,
  onDelete,
  onUpdated,
}: NewsArticleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, user } = useStoreState();

  const passMutation = (content) => {
    setIsEditing(false);
    onUpdated({ content });
  };

  return (
    <>
      {
        isEditing ? (
          <NewsCreator
            maxSize={Restrictions.max_size_news}
            allowedTypes={Restrictions.allowed_file_types_news}
            newsItem={news}
            onCancel={() => setIsEditing(false)}
            onUpdateNews={({ content }) => passMutation(content)}
          />
        ) : (
          <NewsArticleWrapper>
            <NewsArticleImageWrapper>
              <Image src={news.attributes.news_banner ? `${backendURL}${news.attributes.news_banner}` : '/assets/images/news1.jpg'} alt={news.attributes.title} objectFit="cover" layout="fill" />
            </NewsArticleImageWrapper>
            <NewsArticleInfos>
              <NewsArticleHeader>
                <div>
                  <NewsArticleHeading>{news.attributes.title}</NewsArticleHeading>
                  <p>{`Von ${author.attributes.display_name}, am ${format(new Date(news.attributes.created_at), 'dd.MM.yyyy')}`}</p>
                </div>
                {isAuthenticated && user.attributes.admin && (
                  <div>
                    <Button
                      reset
                      icon={isEditing ? faBan : faEdit}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Abbrechen' : 'Bearbeiten'}
                    </Button>
                    <Button
                      reset
                      icon={faTimes}
                      onClick={() => onDelete({ id: news.id })}
                    >
                      Löschen
                    </Button>
                  </div>
                )}
              </NewsArticleHeader>
              <p>{news.attributes.short_description}</p>
              {news.attributes.description && <p>{news.attributes.description}</p>}
            </NewsArticleInfos>
            <NewsArticleButtonFloat>
              {news.attributes.url && (
                <ExternalLink href="">Zur Seite</ExternalLink>)}
              {news.attributes.topic_url && <Link href={`.${news.attributes.topic_url}`} passHref><Button>Zum Beitrag</Button></Link>}
            </NewsArticleButtonFloat>
          </NewsArticleWrapper>

        )
      }
    </>
  );
};

export default NewsArticle;