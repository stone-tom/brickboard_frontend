import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MarginX } from '../../../../styles/global.styles';
import Button from '../../components/Button/Button';
import { PaginationWrapper } from './Pagination.styles';

interface PaginationProps {
  pageIndex: number,
  totalLength?: number,
  paginationSize?: number,
  lengthUnknown?: boolean,
  onClick: (index: number) => void,
}

const Pagination = ({
  pageIndex,
  totalLength,
  paginationSize = 10,
  lengthUnknown,
  onClick,
}: PaginationProps) => {
  if (lengthUnknown) {
    return (
      <PaginationWrapper>
        {
          pageIndex > 1 && (
            <Button icon={faChevronLeft} small type="button" onClick={() => onClick(pageIndex - 1)}>
              Vorige Seite
            </Button>
          )
        }
        {
        totalLength === paginationSize && (
          <Button icon={faChevronRight} iconRight small type="button" onClick={() => onClick(pageIndex + 1)}>
            Nächste Seite
          </Button>
        )
      }
      </PaginationWrapper>
    );
  }
  const pageCount = Math.ceil(totalLength / paginationSize);

  return (
    <PaginationWrapper>
      {
        pageIndex > 1 && (
          <Button icon={faChevronLeft} small type="button" onClick={() => onClick(pageIndex - 1)}>
            Vorige Seite
          </Button>
        )
      }
      <MarginX>
        {`Seite ${pageIndex} von `}
        <Button
          reset
          onClick={() => onClick(pageCount)}
        >
          {Math.ceil(pageCount)}
        </Button>
      </MarginX>
      {
        pageIndex < pageCount && (
          <Button icon={faChevronRight} iconRight small type="button" onClick={() => onClick(pageIndex + 1)}>
            Nächste Seite
          </Button>
        )
      }
    </PaginationWrapper>
  );
};

export default Pagination;
