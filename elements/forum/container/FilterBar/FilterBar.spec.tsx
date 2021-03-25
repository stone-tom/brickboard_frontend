import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import mockCategories from '../../../../__tests__/mock-data/category_index.json';
import 'jest-styled-components';
import FilterBar from './FilterBar';

test('calls onClick when clicking on filterItem and calls onChange with right properties', async () => {
  const mockCategory = mockCategories.data;
  const onChange = jest.fn();
  render(
    <ThemeProvider theme={main}>
      <FilterBar
        onChange={onChange}
        options={mockCategory}
      />
    </ThemeProvider>,
  );

  const filterItems = await screen.findAllByTestId('filter_item');
  expect(filterItems).toHaveLength(12);

  fireEvent.click(filterItems[0]);
  expect(onChange).toHaveBeenCalledWith([1]);
  fireEvent.click(filterItems[11]);
  expect(onChange).toHaveBeenCalledWith([1, 12]);
  fireEvent.click(filterItems[2]);
  expect(onChange).toHaveBeenCalledWith([1, 12, 3]);
  fireEvent.click(filterItems[2]);
  expect(onChange).toHaveBeenCalledWith([1, 12]);
});
