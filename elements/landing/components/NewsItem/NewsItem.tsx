import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Image from 'next/image';
import INewsItem from '../../../../models/INewsItem';
import IUser from '../../../../models/IUser';
import {
  BigNewsItemDescription,
  BigNewsItemHeading,
  BigNewsItemWrapper,
  NewsInfos,
  NewsItemBorder,
  NewsItemButtonFloat,
  NewsItemHeading,
  NewsItemWrapper,
} from './NewsItem.styles';
import ExternalLink from '../../../core/components/ExternalLink/ExternalLink';
import Button from '../../../core/components/Button/Button';

interface NewsItemProps {
  newsitem: INewsItem;
  author: IUser;
  active?: boolean;
  bordered?: boolean;
  onClick?: () => void;
}

const NewsItem = ({
  newsitem,
  author,
  active = false,
  bordered = false,
  onClick,
} : NewsItemProps) => {
  if (active) {
    return (
      <BigNewsItemWrapper>
        <Image src={newsitem.attributes.url ? newsitem.attributes.url : '/assets/images/news1.jpg'} alt={newsitem.attributes.title} objectFit="cover" layout="fill" />
        <NewsInfos>
          <BigNewsItemHeading>{newsitem.attributes.title}</BigNewsItemHeading>
          <BigNewsItemDescription>{newsitem.attributes.short_description}</BigNewsItemDescription>
          <p>{`von ${author.attributes.display_name}, am ${format(new Date(author.attributes.created_at), 'dd.MM.yyyy')}`}</p>

        </NewsInfos>
        <NewsItemButtonFloat>
          {newsitem.attributes.url && !newsitem.attributes.topic_id && (
          <ExternalLink href="">Zur Seite</ExternalLink>)}
          {newsitem.attributes.topic_id && <Link href={`./${newsitem.attributes.topic_id}`} passHref><Button>Zum Beitrag</Button></Link>}
        </NewsItemButtonFloat>
      </BigNewsItemWrapper>
    );
  }
  return (
    <NewsItemWrapper onClick={() => onClick()}>
      <NewsItemBorder active={bordered} />
      <NewsItemHeading>{newsitem.attributes.title}</NewsItemHeading>
      <Image src={newsitem.attributes.url ? newsitem.attributes.url : '/assets/images/news1.jpg'} alt={newsitem.attributes.title} objectFit="cover" layout="fill" />
    </NewsItemWrapper>
  );
};

export default NewsItem;
