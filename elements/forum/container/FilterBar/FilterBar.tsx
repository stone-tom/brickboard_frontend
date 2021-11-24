import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import ICategory from '../../../../models/ICategory';
import ButtonComponent from '../../../core/components/Button/Button';
import FilterItem from '../../components/FilterItem/FilterItem';
import { MoviePresentationsHeading } from '../MoviePresentations/MoviePresentations.styles';
import {
  FilterButtons,
} from './FilterBar.styles';

interface FilterBarProps {
  options: ICategory[],
  onChange: (selected: number[]) => void,
  title: string
}

const FilterBar = ({
  options,
  onChange,
  title,
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
      <MoviePresentationsHeading>
        <h1>{title}</h1>
        <ButtonComponent
          reset
          icon={faTrash}
          onClick={() => {
            setSelected([]);
            onChange([]);
          }}
        >
          Filter entfernen
        </ButtonComponent>
      </MoviePresentationsHeading>
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
