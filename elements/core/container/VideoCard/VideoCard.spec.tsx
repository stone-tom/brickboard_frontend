import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Image from 'next/image';
import { format } from 'date-fns';
import main from '../../../../themes/main';
import VideoCard from './VideoCard';
import {
  Card, CreatedAt, Creator, VideoTitle,
} from './VideoCard.styles';

const videoProps: {[key: string]: any} = {
  title: 'Testtitel',
  videoURL: 'https://www.youtube.com/watch?v=gf7BG23vK7c',
  creator: 'BrickBoard',
  created_at: '2021-03-23T21:13:44.256+01:00',
};

describe('Render Card Component', () => {
  it('renders correctly', () => {
    const card = mount((
      <ThemeProvider theme={main}>
        <VideoCard
          title={videoProps.title}
          videoURL={videoProps.videoURL}
          creator={videoProps.creator}
          created_at={videoProps.created_at}
        />
      </ThemeProvider>
    ));

    expect(card.find(Card).length).toBe(1);
    expect(card.find(Image).length).toBe(1);
    expect(card.find(VideoTitle).text()).toBe(videoProps.title);
    expect(card.find(Creator).text()).toBe(videoProps.creator);
    expect(card.find(CreatedAt).text()).toBe(format(new Date(videoProps.created_at), 'dd.MM.yyyy'));
    expect(card.find(Image).prop('src')).toBe('https://img.youtube.com/vi/gf7BG23vK7c/0.jpg');
  });

  it('renders correctly without videoURL', () => {
    const card = mount((
      <ThemeProvider theme={main}>
        <VideoCard
          title={videoProps.title}
          creator={videoProps.creator}
          created_at={videoProps.created_at}
        />
      </ThemeProvider>
    ));

    expect(card.find(Card).length).toBe(1);
    expect(card.find(Image).length).toBe(1);
    expect(card.find(VideoTitle).text()).toBe(videoProps.title);
    expect(card.find(Creator).text()).toBe(videoProps.creator);
    expect(card.find(CreatedAt).text()).toBe(format(new Date(videoProps.created_at), 'dd.MM.yyyy'));
    expect(card.find(Image).prop('src')).toBe('/assets/images/default_thumbnail.png');
  });
});
