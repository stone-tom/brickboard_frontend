import styled, { css } from 'styled-components';

export const FormInput = styled.input<{
  error?: boolean
  disabled?: boolean,
}>`
  font-family: "Nunito",-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: ${(props) => props.theme.darkgray};
  border: 1px solid ${(props) => props.theme.darkgray};
  padding: 8px 10px;
  transition: all .4s ease 0s;
  font-size: 1em;
  width: 100%;
  
  ${(props) => props.error && css`
    border: 1px solid ${props.theme.brickred};
  `}

  ${(props) => props.disabled && css`
    opacity: .4;
    cursor: not-allowed;
    background: ${props.theme.gray};
  `}

  &:read-only {
    color: ${(props) => props.theme.gray};
  }

  ::placeholder {
    color: ${(props) => props.theme.gray};
  }

  &:focus {
    outline: 0;
  }
`;

export const InputLabel = styled.label<{
  noLabel?: boolean,
}>`

  ${(props) => props.noLabel && css`
    padding: 0;
    margin: 0;
  `}

  color: ${(props) => props.theme.darkgray};
  padding: 10px 0px;
  font-weight: bold;
`;
