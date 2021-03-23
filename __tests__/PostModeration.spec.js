import React from 'react';
import { ThemeProvider } from 'styled-components';
import main from '../themes/main';
import PostModeration from '../pages/moderation/post-moderation';
import mockUsers from './mock-data/users.json';
import { render, screen } from '@testing-library/react'

test('renders post-moderation view correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify(mockUsers));
  render(
    <ThemeProvider theme={main}>
        <PostModeration />
    </ThemeProvider>);

  const accordions = await screen.findAllByRole('tab');
  const lockButtons = await screen.findAllByText('blockieren');
  const approveButtons = await screen.getAllByText('bestätigen');
  const toggleButtons = screen.getAllByTestId('toggle_accordion');
  expect(screen.getByRole('heading')).toHaveTextContent('Post Moderation');
  expect(accordions).toHaveLength(4);
  expect(lockButtons).toHaveLength(2);
  expect(approveButtons).toHaveLength(2);
  expect(toggleButtons).toHaveLength(4);
});