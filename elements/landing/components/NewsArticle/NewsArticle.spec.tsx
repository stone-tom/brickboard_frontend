import React from 'react';
import Link from 'next/link';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Image from 'next/image';
import { format } from 'date-fns';
import { act } from '@testing-library/react';
import main from '../../../../themes/main';
import { ExternalLink } from '../../../core/components/ExternalLink/ExternalLink.styles';
import Button from '../../../core/components/Button/Button';
import INewsItem from '../../../../models/INewsItem';
import NewsArticle from './NewsArticle';
import adminUser from '../../../../__tests__/mock-data/adminUser.json';
import { NewsArticleHeader, NewsArticleHeading } from './NewsArticle.styles';
import { backendURL } from '../../../../util/api';
import { StoreDispatchContext, StoreStateContext } from '../../../../context/custom_store';

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
    news_banner: '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ff6d9f9268d452880709de339568eacb639ca10f/news1.jpg',
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

describe('Render NewsArticle Component', async () => {
  it('renders correctly', () => {
    const news = mount((
      <ThemeProvider theme={main}>
        <NewsArticle
          news={newsItem}
          author={adminUser}
        />
      </ThemeProvider>
    ));

    expect(news.find(NewsArticle).length).toBe(1);
    expect(news.find(Image).length).toBe(1);
    expect(news.find(NewsArticleHeading).text()).toBe(newsItem.attributes.title);
    expect(news.find(NewsArticleHeader).text()).toContain(adminUser.attributes.display_name);
    expect(news.find(ExternalLink).length).toBe(1);
    expect(news.find(Button).length).toBe(1);
    expect(news.find(Link).length).toBe(1);
    expect(news.find(NewsArticleHeader).text()).toContain(format(new Date(newsItem.attributes.created_at), 'dd.MM.yyyy'));
    expect(news.find(Image).first().prop('src')).toBe(`${backendURL}/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ff6d9f9268d452880709de339568eacb639ca10f/news1.jpg`);
  });

  it('renders correctly with Admin Buttons', () => {
    const setMessage = jest.fn();
    const initialState = {
      isAuthenticated: true,
      moderation_state: 'approved',
      user: {
        id: '1',
        type: 'user',
        attributes: {
          admin: true,
          avatar: '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--304a9eadc909dc264fa75fbfbf49e3dcade5fb62/Untitled.jpg',
          created_at: '2021-02-02T15:01:40.112+01:00',
          display_name: 'Admin',
          updated_at: '2021-03-25T17:06:55.942+01:00',
        },
      },
    };
    const onDeleteMock = jest.fn();
    const news = mount((
      <ThemeProvider theme={main}>
        <StoreDispatchContext.Provider value={{ setMessage }}>
          <StoreStateContext.Provider value={initialState}>
            <NewsArticle
              news={newsItem}
              author={adminUser}
              onDelete={onDeleteMock}
            />
          </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>

      </ThemeProvider>
    ));
    const deleteButton = news.find(Button).at(1);
    expect(deleteButton.length).toBe(1);
    act(() => {
      deleteButton.simulate('click');
    });
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(news.find(NewsArticle).length).toBe(1);
    expect(news.find(Image).length).toBe(1);
    expect(news.find(NewsArticleHeading).text()).toBe(newsItem.attributes.title);
    expect(news.find(NewsArticleHeader).text()).toContain(adminUser.attributes.display_name);
    expect(news.find(ExternalLink).length).toBe(1);
    expect(news.find(NewsArticleHeader).text()).toContain('Löschen');
    expect(news.find(NewsArticleHeader).text()).toContain('Bearbeiten');
    expect(news.find(Link).length).toBe(1);
    expect(news.find(Button).length).toBe(3);
    expect(news.find(NewsArticleHeader).text()).toContain(format(new Date(newsItem.attributes.created_at), 'dd.MM.yyyy'));
    expect(news.find(Image).first().prop('src')).toBe(`${backendURL}/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ff6d9f9268d452880709de339568eacb639ca10f/news1.jpg`);
  });

  it('does not display admin buttons to a normal user', () => {
    const setMessage = jest.fn();
    const initialState = {
      isAuthenticated: true,
      moderation_state: 'approved',
      user: {
        id: '1',
        type: 'user',
        attributes: {
          admin: false,
          avatar: '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--304a9eadc909dc264fa75fbfbf49e3dcade5fb62/Untitled.jpg',
          created_at: '2021-02-02T15:01:40.112+01:00',
          display_name: 'Testuser',
          updated_at: '2021-03-25T17:06:55.942+01:00',
        },
      },
    };
    const news = mount((
      <ThemeProvider theme={main}>
        <StoreDispatchContext.Provider value={{ setMessage }}>
          <StoreStateContext.Provider value={initialState}>
            <NewsArticle
              news={newsItem}
              author={adminUser}
            />
          </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>

      </ThemeProvider>
    ));

    expect(news.find(NewsArticle).length).toBe(1);
    expect(news.find(Image).length).toBe(1);
    expect(news.find(NewsArticleHeading).text()).toBe(newsItem.attributes.title);
    expect(news.find(NewsArticleHeader).text()).not.toContain('Löschen');
    expect(news.find(NewsArticleHeader).text()).not.toContain('Bearbeiten');
    expect(news.find(ExternalLink).length).toBe(1);
    expect(news.find(Link).length).toBe(1);
    expect(news.find(Button).length).toBe(1);
    expect(news.find(NewsArticleHeader).text()).toContain(format(new Date(newsItem.attributes.created_at), 'dd.MM.yyyy'));
    expect(news.find(Image).first().prop('src')).toBe(`${backendURL}/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWmc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ff6d9f9268d452880709de339568eacb639ca10f/news1.jpg`);
  });
});
