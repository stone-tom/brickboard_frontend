import React, { useState } from 'react';
import ICategory from '../../../../models/ICategory';
import FilterItem from '../../components/FilterItem/FilterItem';
import {
  FilterButtons,
} from './FilterBar.styles';

interface FilterBarProps {
  options: ICategory[],
  onChange: (selected: number[]) => void,
}

const FilterBar = ({
  options,
  onChange,
}: FilterBarProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: string) => {
    if (!selected.includes(parseInt(id, 10))) {
      const added = [...selected, parseInt(id, 10)];
      setSelected(added);
      onChange(added);
      return;
    }
    const removed = selected.filter((item) => item !== parseInt(id, 10));
    setSelected(removed);
    onChange(removed);
  };

  return (
    <FilterButtons>
      {options.map((option) => (
        <FilterItem
          key={`option_${option.id}`}
          active={selected.includes(parseInt(option.id, 10))}
          name={option.attributes.name}
          icon={option.attributes.category_icon}
          onClick={() => handleSelect(option.id)}
        />
      ))}
    </FilterButtons>
  );
};

export default FilterBar;
