import styled, { css } from 'styled-components';
import Select from 'react-select';

export const InputLabel = styled.label`
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0;
`;

export const MultiSelect = styled(Select)<{
  error?: boolean,
  disabled?: boolean
}>`
    min-width: 250px;

  ${(props) => props.error && css`
    .multiselect__control{
      border: 1px solid ${props.theme.brickredDark};
    }
  `}

  .multiselect {

    &__control {
      margin: 0;
      background: ${(props) => props.theme.white};
      border-radius: 0;
      border: 1px solid ${(props) => props.theme.black};
    }

    &__value-container {
      padding: 4px 10px;
    }
  }

  .multiselect__control--is-focused {
    border-color: ${(props) => props.theme.black};
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
    z-index: 9999;
    margin: 0;
  }
`;
