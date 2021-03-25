import styled, { css } from 'styled-components';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

export const InputLabel = styled.label`
  color: ${(props) => props.theme.black};
  font-weight: bold;
`;

/* TODO maybe refactor so there is less duplication here */

export const AsyncMultiSelect = styled(AsyncSelect)<{
  error?: boolean,
  disabled?: boolean
}>`
  ${(props) => props.error && css`
    .multiselect__control{
      border: 1px solid ${props.theme.brickredDark};
    }
  `}

  .multiselect {

    &__control {
      margin: 10px 0;
      background: ${(props) => props.theme.gray};
    }
  }

  .multiselect__control--is-focused {
    border-color: ${(props) => props.theme.brickred};
    outline: 0;
    box-shadow: none;

    &:hover {
      border-color: ${(props) => props.theme.brickred};
    }

    &:focused {
      border-color: ${(props) => props.theme.brickred};
    }
  }

  .multiselect__multi-value {
    color: #fff;
    background-color: ${(props) => props.theme.brickred};

    &__label {
      color: #fff;
    }
  }

  .multiselect__multi-value__remove:hover {
    background-color: ${(props) => props.theme.brickredDark};
    color: #fff;
  }

  .multiselect__menu {
    margin: 0;
  }

  .multiselect__option {

    &:hover {
      background-color: ${(props) => props.theme.brickredDark};
      color: #fff;
    }
    
    &--is-selected {
      background-color: ${(props) => props.theme.brickred};
    }
  }
`;

export const MultiSelect = styled(Select)<{
  error?: boolean,
  disabled?: boolean
}>`
  ${(props) => props.error && css`
    .multiselect__control{
      border: 1px solid ${props.theme.brickredDark};
    }
  `}

  .multiselect {

    &__control {
      margin: 10px 0;
      background: ${(props) => props.theme.gray};
    }
  }

  .multiselect__control--is-focused {
    border-color: ${(props) => props.theme.brickred};
    outline: 0;
    box-shadow: none;

    &:hover {
      border-color: ${(props) => props.theme.brickred};
    }

    &:focused {
      border-color: ${(props) => props.theme.brickred};
    }
  }

  .multiselect__multi-value {
    color: #fff;
    background-color: ${(props) => props.theme.brickred};

    &__label {
      color: #fff;
    }
  }

  .multiselect__multi-value__remove:hover {
    background-color: ${(props) => props.theme.brickredDark};
    color: #fff;
  }

  .multiselect__menu {
    margin: 0;
  }
`;
