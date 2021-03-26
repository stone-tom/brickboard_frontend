import React from 'react';
import Link from 'next/link';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Image from 'next/image';
import { act } from '@testing-library/react';
import main from '../../../../themes/main';
import adminUser from '../../../../__tests__/mock-data/adminUser.json';
import { backendURL } from '../../../../util/api';
import newsList from '../../../../__tests__/mock-data/news.json';
import NewsSection from './NewsSection';
import {
  AllNewsItem,
  NewsListing,
  NewsSectionWrapper,
  ShowCase,
} from './NewsSection.styles';
import NewsItem from '../../components/NewsItem/NewsItem';

describe('Render NewsSection Component', async () => {
  it('renders correctly', () => {
    const news = mount((
      <ThemeProvider theme={main}>
        <NewsSection
          authors={[adminUser]}
          newsList={newsList}
        />
      </ThemeProvider>
    ));

    expect(news.find(NewsSectionWrapper).length).toBe(1);
    expect(news.find(ShowCase).length).toBe(1);
    expect(news.find(NewsListing).length).toBe(1);
    expect(news.find(AllNewsItem).length).toBe(1);
    expect(news.find(NewsItem).length).toBe(4);
    expect(news.find(Link).length).toBe(1);
    expect(news.find(Image).length).toBe(4);
    expect(news.find(Image).first().prop('src')).toBe(`${backendURL}/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2df7d8af134afb0f3dc229a3d7a5b273283a2bc9/news2.jpg`);
  });
});
describe('Switch Main News', async () => {
  it('display clicked news correctly', () => {
    const news = mount((
      <ThemeProvider theme={main}>
        <NewsSection
          authors={[adminUser]}
          newsList={newsList}
        />
      </ThemeProvider>
    ));
    expect(news.find(NewsSectionWrapper).length).toBe(1);
    expect(news.find(ShowCase).length).toBe(1);
    expect(news.find(NewsListing).length).toBe(1);
    expect(news.find(AllNewsItem).length).toBe(1);
    expect(news.find(NewsItem).length).toBe(4);
    expect(news.find(Link).length).toBe(1);
    expect(news.find(Image).length).toBe(4);
    expect(news.find(Image).first().prop('src')).toBe(`${backendURL}/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2df7d8af134afb0f3dc229a3d7a5b273283a2bc9/news2.jpg`);
    const clickableNews = news.find(NewsItem).at(3);
    expect(clickableNews.length).toBe(1);
    act(() => {
      clickableNews.simulate('click');
    });
  });
});
