import styled, { css } from 'styled-components';

export const FormInput = styled.input<{
  error?: boolean
}>`
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.black};
  padding: 10px 15px;
  transition: all .4s ease 0s;
  font-size: 1em;
  margin-top: 8px;
  width: 100%;
  
  ${(props) => props.error && css`
    border: 1px solid ${props.theme.brickred};
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

export const InputLabel = styled.label`
  color: ${(props) => props.theme.black};
  padding: 10px 0px;
  font-weight: bold;
`;
