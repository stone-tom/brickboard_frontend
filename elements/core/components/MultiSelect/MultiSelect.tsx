import React, { ReactNode } from 'react';
import makeAnimated from 'react-select/animated';
import {
  InputLabel,
  MultiSelect,
  Wrapper,
} from './MultiSelect.styles';

const animatedComponents = makeAnimated();

interface MultiSelectProps {
  options: {
    value: string,
    label: string
  }[],
  name?: string,
  required?: boolean,
  children: ReactNode,
  error?: boolean,
  value: {
    value: string,
    label: string
  }[] | {
    value: string,
    label: string
  },
  disabled?: boolean,
  onChange: (value: any) => void,
  autoFocus?: boolean,
  placeholder?: string,
  withLabel?: boolean,
  isMulti?: boolean,
  col?: boolean,
}

const MultiSelectComponent = ({
  isMulti,
  children,
  options,
  name,
  required,
  value,
  error,
  onChange,
  disabled,
  autoFocus,
  placeholder,
  withLabel = true,
  col,
}: MultiSelectProps) => (
  <Wrapper col={col}>
    { withLabel && (
      <InputLabel htmlFor={name}>
        {`${children}:`}
        {required ? ' *' : null}
      </InputLabel>
    )}
    <MultiSelect
      autoFocus={autoFocus}
      isDisabled={disabled}
      onChange={onChange}
      id={name}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={isMulti}
      options={options}
      classNamePrefix="multiselect"
      error={error}
      value={value}
      placeholder={placeholder}
    />
  </Wrapper>
);

export default MultiSelectComponent;
