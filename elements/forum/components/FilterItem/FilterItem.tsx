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

const getAssetPath = (title: string) => {
  if (title === 'Komödie') {
    return '/assets/icons/comedy.svg';
  }
  return `/assets/icons/${title.toLowerCase()}.svg`;
};

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
        src={icon || getAssetPath(name)}
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
