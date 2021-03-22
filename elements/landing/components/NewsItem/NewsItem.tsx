import Image from 'next/image';
import React from 'react';
import INewsItem from '../../../../models/INewsItem';
import IUser from '../../../../models/IUser';
import { NewsInfos, NewsItemWrapper } from './NewsItem.styles';

interface NewsItemProps {
  newsitem: INewsItem;
  author: IUser;
}

const NewsItem = ({ newsitem, author }: NewsItemProps) => (
  <NewsItemWrapper>
    <Image src={newsitem.attributes.url ? newsitem.attributes.url : '/assets/images/news2.jpg'} alt={newsitem.attributes.title} objectFit="cover" layout="fill" />
    <NewsInfos>
      <h3>{newsitem.attributes.title}</h3>
      <p>{newsitem.attributes.short_description}</p>
      <p>
        von&nbsp;
        {author.attributes.display_name}
      </p>
      <p>Zum Thema</p>
    </NewsInfos>
  </NewsItemWrapper>
);

export default NewsItem;
