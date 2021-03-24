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
  const icon = '<svg role="graphics-document" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 24H0V0h24v24z" fill="none"/><circle fill="currentColor" cx="12" cy="12" r="8"/></svg>';
  render(
    <ThemeProvider theme={main}>
      <Tag name="Action" icon={icon} />
    </ThemeProvider>,
  );

  const tag = await screen.findByTestId('tag');
  const svg = await screen.findByRole('graphics-document');
  expect(tag).toBeTruthy();
  expect(svg).toBeTruthy();
});
