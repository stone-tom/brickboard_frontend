import React from 'react';
import Link from 'next/link';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Image from 'next/image';
import { act } from '@testing-library/react';
import main from '../../../../themes/main';
import INewsItem from '../../../../models/INewsItem';
import adminUser from '../../../../__tests__/mock-data/adminUser.json';
import NewsItem from './NewsItem';
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

const newsItem: INewsItem = {
  id: '65',
  type: 'news',
  attributes: {
    title: 'Wir werden sehen!!!',
    short_description: 'Obe s geht',
    topic_url: '/forum/brickfilme-im-allgemeinen/23',
    url: 'https://forum.brickboard.de/',
    created_at: '2021-03-23T13:01:17.778+01:00',
    updated_at: '2021-03-25T17:01:56.044+01:00',
  },
  relationships: {
    user: {
      data: {
        id: '1',
        type: 'user',
      },
    },
  },
};

describe('Render small NewsItem Component', async () => {
  const onClickMock = jest.fn();
  it('renders correctly', () => {
    const news = mount((
      <ThemeProvider theme={main}>
        <NewsItem
          newsitem={newsItem}
          author={adminUser}
          onClick={onClickMock}
        />
      </ThemeProvider>
    ));
    const clickWrapper = news.find(NewsItemWrapper);
    expect(clickWrapper.length).toBe(1);
    act(() => {
      clickWrapper.simulate('click');
    });
    expect(onClickMock).toHaveBeenCalledTimes(1);

    expect(news.find(NewsItemBorder).length).toBe(1);
    expect(news.find(NewsItemHeading).length).toBe(1);
    expect(news.find(Image).length).toBe(1);
    expect(news.find(NewsItemHeading).text()).toBe(newsItem.attributes.title);
    expect(news.find(Image).first().prop('src')).toBe('/assets/images/default_news_image.jpg');
  });
});
describe('Render Big NewsItem Component', async () => {
  it('renders correctly', () => {
    const news = mount((
      <ThemeProvider theme={main}>
        <NewsItem
          active
          newsitem={newsItem}
          author={adminUser}
        />
      </ThemeProvider>
    ));
    expect(news.find(BigNewsItemWrapper).length).toBe(1);
    expect(news.find(NewsInfos).length).toBe(1);
    expect(news.find(BigNewsItemHeading).length).toBe(1);
    expect(news.find(BigNewsItemHeading).text()).toBe(newsItem.attributes.title);
    expect(news.find(BigNewsItemDescription).length).toBe(1);
    expect(news.find(BigNewsItemDescription).text()).toBe(newsItem.attributes.short_description);
    expect(news.find(NewsItemButtonFloat).length).toBe(1);
    expect(news.find(Image).length).toBe(1);
    expect(news.find(Link).length).toBe(1);
    expect(news.find(Image).first().prop('src')).toBe('/assets/images/default_news_image.jpg');
  });
});
