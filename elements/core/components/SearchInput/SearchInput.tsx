import React, { useState } from 'react';
import {
  SearchWrapper,
  InputWrapper,
  Input,
  SuggestionList,
  SuggestionItem,
} from './SearchInput.styles';

interface ISearchItem {
  value?: string | number | { [key: string]: any },
  label: string,
}

interface SearchInputProps {
  onChange: (value: ISearchItem) => void,
  label?: string,
  suggestions: {
    label: string,
    value: string | number | { [key: string]: any },
  }[],
  value?: string,
  // showOnFocus?: boolean,
  // placeholder?: string,
  // blurTimeout?: number,
  // autofocus?: boolean,
}

const SearchInput = ({
  onChange,
  label,
  suggestions,
  value,
  // showOnFocus,
  // placeholder,
}: SearchInputProps) => {
  const [renderSuggestion, setRenderSuggestion] = useState<boolean>(false);
  const handleChange = (item: ISearchItem, render: boolean = true) => {
    if (item.value === '') {
      setRenderSuggestion(false);
      onChange({
        label: '',
        value: '',
      });
    } else {
      onChange({
        label: item.label,
        value: item.value,
      });
      setRenderSuggestion(render);
    }
  };

  return (
    <SearchWrapper>
      <InputWrapper>
        <Input
          value={value}
          onChange={(e) => handleChange({
            label: e.target.value,
            value: e.target.value,
          })}
        >
          {label}
        </Input>
        {renderSuggestion && (
          <SuggestionList
            noLabel={label === undefined}
          >
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={`${suggestion.value.toString()}-${index}`}
                onClick={() => handleChange(suggestion, false)}
              >
                {suggestion.label}
              </SuggestionItem>
            ))}
          </SuggestionList>
        )}
      </InputWrapper>
    </SearchWrapper>
  );
};

export default SearchInput;
