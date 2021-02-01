import React, { ReactNode, useState, useEffect } from 'react';
import { isArray } from 'lodash';
import {
  TableWrapper,
  Table,
  TableHeaderItem,
  TableRow,
  TableData,
  EmptyFont,
  TableSortButton,
  TableSortButtonArrow,
} from './Table.styles';
import { faArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export type Row = (number | undefined | string | null | [ReactNode | JSX.Element, string]);

type SortingValue = number | undefined | string | null;

type SortingFunction = (a: SortingValue, b: SortingValue) => number;

const defaultRowModifier = () => ({});
interface TableProps {
  headerItems: string[],
  values: Row[][] | null,
  empty?: string,
  rowModifier?: (row: Row[], index?: number) => { [key: string]: boolean | number | string },
  sorting?: ('string' | 'number' | SortingFunction | null)[],
  defaultSorting?: null | {
    col: number,
    dir: 'asc' | 'desc',
  }
}

const numberSort = (a: SortingValue, b: SortingValue) => {
  let valueA = a;
  let valueB = b;
  if (typeof a === 'string') {
    valueA = parseFloat(a);
  }
  if (typeof b === 'string') {
    valueB = parseFloat(b);
  }
  if (!valueA) return -1;
  if (!valueB) return 1;
  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
};

const stringSort = (a: string, b: string) => {
  if (!a) return -1;
  if (!b) return 1;
  return a.localeCompare(b);
};

const TableComponent = ({
  headerItems,
  values,
  empty,
  rowModifier = defaultRowModifier,
  sorting,
  defaultSorting = null,
}: TableProps) => {
  const [currentSorting, setCurrentSorting] = useState<null | {
    col: number,
    dir: 'asc' | 'desc',
  }>(defaultSorting);

  const [tableValues, setTableValues] = useState<Row[][]>();

  const sortingChange = (index: number) => {
    if (currentSorting && currentSorting.col === index) {
      if (currentSorting.dir === 'asc') {
        setCurrentSorting(null);
      } else {
        setCurrentSorting({
          col: index,
          dir: 'asc',
        });
      }
    } else {
      setCurrentSorting({
        col: index,
        dir: 'desc',
      });
    }
  };

  const getSortingFunction = () => {
    if (!sorting || !currentSorting || !sorting[currentSorting.col]) return () => 0;
    switch (sorting[currentSorting.col]) {
      case 'number':
        return numberSort;
      case 'string':
        return stringSort;
      default:
        return sorting[currentSorting.col];
    }
  };

  useEffect(() => {
    if (values) {
      const copiedValues = [...values];

      if (currentSorting === null) {
        setTableValues(copiedValues);
        return;
      }
      const sortingFunction = getSortingFunction() as SortingFunction;
      copiedValues.sort((a: any, b: any) => {
        if (currentSorting) {
          const aVal = isArray(a[currentSorting.col])
            ? a[currentSorting.col][1]
            : a[currentSorting.col];

          const bVal = isArray(b[currentSorting.col])
            ? b[currentSorting.col][1]
            : b[currentSorting.col];

          if (currentSorting.dir === 'desc') {
            return sortingFunction(aVal, bVal);
          }

          return sortingFunction(bVal, aVal);
        }
        return 0;
      });

      setTableValues(copiedValues);
    }
  }, [currentSorting, values]);

  return (
    <TableWrapper>
      <Table>
        <thead>
          <TableRow>
            {headerItems.map((item, index) => (
              <TableHeaderItem
                key={item !== '' ? item : index}
              >
                {sorting && sorting[index]
                  ? (
                    <TableSortButton
                      onClick={() => sortingChange(index)}
                      type="button"
                    >
                      {item}
                      {currentSorting && currentSorting.col === index && (
                        <TableSortButtonArrow
                          dir={currentSorting.dir}
                          icon={faCaretDown}
                        />
                      )}
                    </TableSortButton>
                  )
                  : item}
              </TableHeaderItem>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {empty && (
            <TableRow>
              <EmptyFont colSpan={headerItems.length}>{empty}</EmptyFont>
            </TableRow>
          )}
          {tableValues && tableValues.map((value: Row[], index) => (
            <TableRow
              {...rowModifier(value, index)}
              key={index}
            >
              {value
                ? value.map((item: Row, valueIndex) => (
                  <TableData key={valueIndex}>
                    {!isArray(item)
                      ? item
                      : item[0]}
                  </TableData>
                ))
                : null}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default TableComponent;