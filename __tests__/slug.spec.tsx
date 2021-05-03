import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import categoryResponse from './mock-data/category_index.json';
import categoryFilterResponse1 from './mock-data/movies_filter_1.json';
import categoryFilterResponse2 from './mock-data/movies_filter_1_4.json';
import topicResponse from './mock-data/topic_index.json';
import main from '../themes/main';
import SubForum from '../pages/forum/[slug]';
import 'whatwg-fetch';
import { backendURL } from '../util/api';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => false),
}));

jest.mock('next/image', () => ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />);

test('filtering functionality', async () => {
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });
  render(
    <ThemeProvider theme={main}>
      <SubForum
        topicsData={topicResponse}
        categoryData={categoryResponse}
        categoryURL={`${backendURL}/categories/`}
        slug="filmvorstellungen"
      />
    </ThemeProvider>,
  );

  // selection one is possible
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => categoryFilterResponse1,
  });

  const filterItems = await screen.findAllByTestId('filter_item');
  userEvent.click(filterItems[0]);

  await waitFor(() => {
    expect(screen.getAllByTestId('movie_card')).toHaveLength(2);
  });

  // selecting two is possible
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => categoryFilterResponse2,
  });

  userEvent.click(filterItems[3]);

  await waitFor(() => {
    expect(screen.getAllByTestId('movie_card')).toHaveLength(3);
  });

  // disselecting one is possible
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => categoryFilterResponse1,
  });

  userEvent.click(filterItems[3]);

  await waitFor(() => {
    expect(screen.getAllByTestId('movie_card')).toHaveLength(2);
  });
});
