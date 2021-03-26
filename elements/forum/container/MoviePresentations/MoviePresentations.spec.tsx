import React from 'react';
import {
  render, screen, within,
} from '@testing-library/react';
import { mount } from 'enzyme';
import fetch from 'jest-fetch-mock';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import MoviePresentations from './MoviePresentations';
import filter from '../../../../util/filter';
import mockTopics from '../../../../__tests__/mock-data/topic_index.json';
import mockCategories from '../../../../__tests__/mock-data/category_index.json';
// import mockMoviesFilter1 from '../../../../__tests__/mock-data/movies_filter_1.json';
import MovieCard from '../../../core/container/MovieCard/MovieCard';
import FilterItem from '../../components/FilterItem/FilterItem';
// import mockMoviesFilter1and4 from '../../../../__tests__/mock-data/movies_filter_1_4.json';

// afterEach(() => {
//   cleanup();
// });

// this is a workaround, wait for next to answer this issue -> https://github.com/vercel/next.js/issues/21549
jest.mock('next/image', () => ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />);

test('renders and filters movie-presentations view correctly', async () => {
  const topicList = filter(mockTopics, 'topic');
  const userList = filter(mockTopics, 'user');
  fetch.mockResponseOnce(JSON.stringify(mockCategories));
  render(
    <ThemeProvider theme={main}>
      <MoviePresentations
        movies={topicList}
        users={userList}
      />
    </ThemeProvider>,
  );

  const movies = await screen.findAllByTestId('movie_card');
  expect(movies).toHaveLength(4);

  const tags_1 = within(movies[0]).getAllByTestId('tag');
  expect(tags_1).toHaveLength(1);
  expect(tags_1[0]).toHaveTextContent('Steinerei');

  const tags_2 = within(movies[1]).getAllByTestId('tag');
  expect(tags_2).toHaveLength(1);
  expect(tags_2[0]).toHaveTextContent('Thriller');

  const tags_3 = within(movies[2]).getAllByTestId('tag');
  expect(tags_3).toHaveLength(1);
  expect(tags_3[0]).toHaveTextContent('Action');

  const tags_4 = within(movies[3]).getAllByTestId('tag');
  expect(tags_4).toHaveLength(2);
  expect(tags_4[0]).toHaveTextContent('Thriller');
  expect(tags_4[1]).toHaveTextContent('Action');
  fetch.resetMocks();
});

test('renders and filters movie-presentations view correctly', async () => {
  const topicList = filter(mockTopics, 'topic');
  const userList = filter(mockTopics, 'user');
  fetch
    .once(JSON.stringify(mockCategories));

  const container = mount(
    <ThemeProvider theme={main}>
      <MoviePresentations
        movies={topicList}
        users={userList}
      />
    </ThemeProvider>,
  );

  const movies = container.find(MovieCard);
  expect(movies).toHaveLength(4);

  const filterItems = container.find(FilterItem);
  expect(filterItems).toHaveLength(12);

  // act(() => {
  //   filterItems.first().simulate('click');
  // });

  // container.update();

  // await waitFor(movies);
  // expect(movies).toHaveLength(3);

  // const movies = await screen.findAllByTestId('movie_card');
  // expect(movies).toHaveLength(4);

  // const filterItems = await screen.findAllByTestId('filter_item');
  // expect(filterItems).toHaveLength(12);
  // expect(filterItems[0]).toHaveTextContent('Thriller');

  // fireEvent.click(filterItems[0]);
  // movies = await screen.findAllByTestId('movie_card');
  // expect(movies).toHaveLength(2);
});
