import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import Table, { Row, SortingFunction } from './Table';
import { TableSortButton, TableRow } from './Table.styles';

describe('Render Table Component', () => {
  it('renders correctly', () => {
    const headerItems = ['Typ', 'Titel', 'Vorname', 'Nachname', 'Benutzername', 'Telefonnummer', 'Email', ''];
    const values: Row[][] = [['admin', 'Ing', 'Max', 'Mustermann', 'mm5484', '06648648221', 'email@test.at', [<button type="button">Test</button>, '']], ['admin', 'Ing', 'Max', 'Mustermann', 'mm5484', '06648648221', 'email@test.at', [<button type="button">Test</button>, '']], ['admin', 'Ing', 'Max', 'Mustermann', 'mm5484', '06648648221', 'email@test.at', [<button type="button">Test</button>, '']]];
    const table = mount((
      <ThemeProvider theme={main}>
        <Table headerItems={headerItems} values={values} />
      </ThemeProvider>
    ));

    expect(table.find('table').length).toBe(1);
    expect(table.find('thead').length).toBe(1);
    expect(table.find('tbody').length).toBe(1);
    expect(table.find('th').length).toBe(headerItems.length);
    expect(table.find('tr').length).toBe(values.length + 1);
    expect(table.find('td').length).toBe(values[0].length * values.length);

    const textValues = ['admin', 'Ing', 'Max', 'Mustermann', 'mm5484', '06648648221', 'email@test.at', 'Test', 'admin', 'Ing', 'Max', 'Mustermann', 'mm5484', '06648648221', 'email@test.at', 'Test', 'admin', 'Ing', 'Max', 'Mustermann', 'mm5484', '06648648221', 'email@test.at', 'Test'];
    const elements = table.find('td').children().map((node) => node.text());
    expect(elements).toEqual([...textValues]);
    expect(table.find('button').length).toBe(3);
  });

  it('sorts correctly', () => {
    const customSort = (a: any, b: any) => {
      if (a === 'a' && b === 'b') return 1;
      if (a === 'b' && b === 'a') return -1;
      return [0];
    };
    const headerItems = ['header1', 'header2', 'header3'];
    const values = [
      ['z', 1, 'a'],
      ['a', 10, 'b'],
      ['b', 100, 'b'],
      ['x', 3, 'a'],
    ];
    const sorting = ['string', 'number', customSort] as ('string' | 'number' | SortingFunction | null)[];

    const table = mount((
      <ThemeProvider theme={main}>
        <Table
          headerItems={headerItems}
          values={values}
          sorting={sorting}
        />
      </ThemeProvider>
    ));

    expect(table.find(TableSortButton).length).toBe(3);

    // check first button all direction and reset
    act(() => {
      table.find(TableSortButton).first().find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('a10b');
    expect(table.find(TableRow).last().text()).toBe('z1a');

    act(() => {
      table.find(TableSortButton).first().find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('a10b');

    act(() => {
      table.find(TableSortButton).first().find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('x3a');

    // check second button all direction and reset
    act(() => {
      table.find(TableSortButton).at(1).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('b100b');

    act(() => {
      table.find(TableSortButton).at(1).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('b100b');
    expect(table.find(TableRow).last().text()).toBe('z1a');

    act(() => {
      table.find(TableSortButton).at(1).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('x3a');

    // check third button all direction and reset
    act(() => {
      table.find(TableSortButton).at(2).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('a10b');
    expect(table.find(TableRow).at(2).text()).toBe('b100b');
    expect(table.find(TableRow).at(3).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('x3a');

    act(() => {
      table.find(TableSortButton).at(2).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).at(2).text()).toBe('x3a');
    expect(table.find(TableRow).at(3).text()).toBe('a10b');
    expect(table.find(TableRow).last().text()).toBe('b100b');

    act(() => {
      table.find(TableSortButton).at(2).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('x3a');

    // check if sorting reset if clicked on other button
    act(() => {
      table.find(TableSortButton).first().find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('a10b');
    expect(table.find(TableRow).last().text()).toBe('z1a');

    act(() => {
      table.find(TableSortButton).at(1).find('button').simulate('click');
    });

    expect(table.find(TableRow).at(1).text()).toBe('z1a');
    expect(table.find(TableRow).last().text()).toBe('b100b');
  });

  it('applies row modifier', () => {
    const rowModifier = jest.fn((row) => ({
      test: row[0],
      conditional: row[0] === 'a',
    }));

    const headerItems = ['header1', 'header2', 'header3'];
    const values = [
      ['z', 1, 'a'],
      ['a', 10, 'b'],
      ['b', 100, 'b'],
      ['x', 3, 'a'],
    ];
    const table = mount((
      <ThemeProvider theme={main}>
        <Table
          headerItems={headerItems}
          values={values}
          rowModifier={rowModifier}
        />
      </ThemeProvider>
    ));

    expect(rowModifier.mock.calls.length).toBe(4);
    expect(table.find(TableRow).at(1).prop('test')).toBe('z');
    expect(table.find(TableRow).at(2).prop('test')).toBe('a');
    expect(table.find(TableRow).at(3).prop('test')).toBe('b');
    expect(table.find(TableRow).at(4).prop('test')).toBe('x');

    // conditional modifier
    expect(table.find(TableRow).at(1).prop('conditional')).toBeFalsy();
    expect(table.find(TableRow).at(2).prop('conditional')).toBeTruthy();
    expect(table.find(TableRow).at(3).prop('conditional')).toBeFalsy();
    expect(table.find(TableRow).at(4).prop('conditional')).toBeFalsy();
  });
});
