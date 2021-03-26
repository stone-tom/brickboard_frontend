import Image from 'next/image';
import React from 'react';
import {
  FilterCard,
  FilterIcon,
  Name,
} from './FilterItem.styles';

interface FilterItemProps {
  name: string,
  icon?: string,
  onClick: () => void,
  active?: boolean,
}

const FilterItem = ({
  name,
  icon,
  onClick,
  active,
}: FilterItemProps) => (
  <FilterCard
    data-testid="filter_item"
    onClick={onClick}
    active={active}
  >
    <FilterIcon>
      <Image
        alt="filter icon"
        src={icon || '/assets/icons/default_filter.svg'}
        layout="fill"
        objectFit="cover"
      />
    </FilterIcon>
    <Name>
      {name}
    </Name>
  </FilterCard>
);

export default FilterItem;
