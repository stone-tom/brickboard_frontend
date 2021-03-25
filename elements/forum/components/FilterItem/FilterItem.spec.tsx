import React from 'react';
import Image from 'next/image';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import mockCategories from '../../../../__tests__/mock-data/category_index.json';
import FilterItem from './FilterItem';
import 'jest-styled-components';

test('renders filter-item component correctly', async () => {
  const mockCategory = mockCategories.data[0];
  const clickMock = jest.fn();
  const container = mount(
    <ThemeProvider theme={main}>
      <FilterItem
        name={mockCategory.attributes.name}
        icon={mockCategory.attributes.category_icon}
        onClick={clickMock}
      />
    </ThemeProvider>,
  );
  const filterItem = container.find(FilterItem);
  expect(filterItem).toHaveLength(1);
  expect(filterItem.text()).toBe('Thriller');
  expect(filterItem.prop('active')).toBeFalsy();
  expect(filterItem.find(Image)).toHaveLength(1);

  act(() => {
    filterItem.simulate('click');
  });

  expect(clickMock).toHaveBeenCalledTimes(1);
});

test('renders active filter-item component correctly', async () => {
  const mockCategory = mockCategories.data[0];
  const clickMock = jest.fn();
  const container = mount(
    <ThemeProvider theme={main}>
      <FilterItem
        name={mockCategory.attributes.name}
        icon={mockCategory.attributes.category_icon}
        onClick={clickMock}
        active
      />
    </ThemeProvider>,
  );
  const filterItem = container.find(FilterItem);

  expect(filterItem).toHaveLength(1);
  expect(filterItem.text()).toBe('Thriller');
  expect(filterItem.prop('active')).toBeTruthy();
  expect(filterItem.find(Image)).toHaveLength(1);

  act(() => {
    filterItem.simulate('click');
  });

  expect(clickMock).toHaveBeenCalledTimes(1);
});

test('calls onClick when clicking on filterItem', async () => {
  const mockCategory = mockCategories.data[0];
  const clickMock = jest.fn();
  render(
    <ThemeProvider theme={main}>
      <FilterItem
        name={mockCategory.attributes.name}
        icon={mockCategory.attributes.category_icon}
        onClick={clickMock}
      />
    </ThemeProvider>,
  );

  expect(screen.getByAltText('filter icon')).toBeTruthy();
  expect(screen.getByText('Thriller')).toBeTruthy();
  fireEvent.click(screen.getByTestId('filter_item'));
  expect(clickMock).toHaveBeenCalledTimes(1);
});
