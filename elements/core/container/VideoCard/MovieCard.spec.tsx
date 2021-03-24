import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Image from 'next/image';
import { format } from 'date-fns';
import main from '../../../../themes/main';
import MovieCard from './MovieCard';
import {
  Card, CreatedAt, Creator, VideoTitle,
} from './MovieCard.styles';
import Tag from '../../components/Tag/Tag';

const videoProps: { [key: string]: any } = {
  id: '1',
  title: 'Testtitel',
  videoURL: 'https://www.youtube.com/watch?v=gf7BG23vK7c',
  creator: 'BrickBoard',
  created_at: '2021-03-23T21:13:44.256+01:00',
  categories: [
    {
      id: '1',
      type: 'category',
      attributes: {
        name: 'Action',
        description: 'Eine Beschreibung',
        locked: false,
        position: 0,
        created_at: '2021-03-23T21:13:14.907+01:00',
        updated_at: '2021-03-23T21:13:14.907+01:00',
        category_icon: '<svg role="graphics-document" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 24H0V0h24v24z" fill="none"/><circle fill="currentColor" cx="12" cy="12" r="8"/></svg>',
      },
      relationships: {
        topics: {
          data: [
            {
              id: '7',
              type: 'topic',
            },
          ],
        },
      },
    },
    {
      id: '2',
      type: 'category',
      attributes: {
        name: 'Thriller',
        description: 'Eine Beschreibung',
        locked: false,
        position: 0,
        created_at: '2021-03-23T21:13:14.907+01:00',
        updated_at: '2021-03-23T21:13:14.907+01:00',
        category_icon: null,
      },
      relationships: {
        topics: {
          data: [
            {
              id: '7',
              type: 'topic',
            },
          ],
        },
      },
    },
  ],
};

describe('Render Card Component', async () => {
  it('renders correctly', () => {
    const card = mount((
      <ThemeProvider theme={main}>
        <MovieCard
          id={videoProps.id}
          title={videoProps.title}
          videoURL={videoProps.videoURL}
          creator={videoProps.creator}
          created_at={videoProps.created_at}
          categories={videoProps.categories}
        />
      </ThemeProvider>
    ));

    expect(card.find(Card).length).toBe(1);
    expect(card.find(Image).length).toBe(1);
    expect(card.find(Tag).length).toBe(2);
    expect(card.find(Tag).at(1).text()).toBe('Thriller');
    expect(card.find(VideoTitle).text()).toBe(videoProps.title);
    expect(card.find(Creator).text()).toBe(videoProps.creator);
    expect(card.find(CreatedAt).text()).toBe(format(new Date(videoProps.created_at), 'dd.MM.yyyy'));
    expect(card.find(Image).prop('src')).toBe('https://img.youtube.com/vi/gf7BG23vK7c/0.jpg');
  });

  it('renders correctly without videoURL', () => {
    const card = mount((
      <ThemeProvider theme={main}>
        <MovieCard
          id={videoProps.id}
          title={videoProps.title}
          creator={videoProps.creator}
          created_at={videoProps.created_at}
          categories={videoProps.categories}
        />
      </ThemeProvider>
    ));

    expect(card.find(Card).length).toBe(1);
    expect(card.find(Image).length).toBe(1);
    expect(card.find(VideoTitle).text()).toBe(videoProps.title);
    expect(card.find(Tag).length).toBe(2);
    expect(card.find(Tag).at(1).text()).toBe('Thriller');
    expect(card.find(Creator).text()).toBe(videoProps.creator);
    expect(card.find(CreatedAt).text()).toBe(format(new Date(videoProps.created_at), 'dd.MM.yyyy'));
    expect(card.find(Image).prop('src')).toBe('/assets/images/default_thumbnail.png');
  });
});
