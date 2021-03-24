import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import Tag from './Tag';

test('renders tag with name correctly', async () => {
  render(
    <ThemeProvider theme={main}>
      <Tag name="Action" />
    </ThemeProvider>,
  );

  const tag = await screen.findByTestId('tag');
  expect(tag).toHaveTextContent('Action');
});

test('renders tag with icon correctly', async () => {
  const icon = '/assets/images/vercel.svg';
  render(
    <ThemeProvider theme={main}>
      <Tag name="Action" icon={icon} />
    </ThemeProvider>,
  );

  const tag = await screen.findByTestId('tag');
  const svg = await screen.findByTestId('tag_icon');
  expect(tag).toBeTruthy();
  expect(svg).toBeTruthy();
});
