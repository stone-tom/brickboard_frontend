import styled, { css } from 'styled-components';

export const Button = styled.button<{
  small?: boolean,
  gray?: boolean,
  reset?: boolean,
  icon?: boolean,
}>`
  background: ${(props) => props.theme.brickred};
  color: #fff;
  padding: 15px 30px;
  border: 0;
  transition: .3s;
  cursor: pointer;
  font-size: 16px;

  ${(props) => props.small && css`
    padding: 10px 15px;
    text-transform: initial;
  `}

  ${(props) => props.gray && css`
    background: ${props.theme.darkgray};
  `}

  ${(props) => props.disabled && css`
    cursor: not-allowed;
    opacity: .6;
  `}

  ${(props) => props.reset && css`
    color: ${props.theme.darkgray}; 
    background: none;
    padding: 0;
    margin: 0;
  `}

  ${(props) => props.icon && css`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  `}

  &:hover {
    background: ${(props) => props.theme.brickredDark};
    transition: .3s;
    ${(props) => props.gray && css`
      background: ${props.theme.gray};
    `}
    ${(props) => props.reset && css`
      background: none;
    `}

    ${(props) => (props.reset && props.icon) && css`
      background: ${props.theme.gray};
    `}
  }

  &:focus {
    outline: 0;
  }
`;
