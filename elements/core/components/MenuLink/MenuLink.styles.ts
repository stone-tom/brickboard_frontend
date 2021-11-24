import styled, { css } from 'styled-components';

export const MenuLink = styled.a<{
  small?: boolean,
  gray?: boolean,
  icon?: boolean,
  noHover?: boolean;
  iconRight?: boolean,
  disabled?: boolean,
  red?: boolean,
  marginRight?: boolean,
  centerNavigation?: boolean,
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkgray}; 
  background: none;
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
  
  ${(props) => props.icon && css`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  `}

  ${(props) => props.iconRight && css`
    flex-direction: row-reverse;
    svg {
      margin-right: 0px;
      margin-left: 8px;
    }
  `}

  ${(props) => !props.noHover && css`
    &:hover {
      background: ${props.theme.gray};
      transition: .3s;
      ${props.gray && css`
        background: ${props.theme.gray};
      `}
    }
  `}

  ${(props) => props.noHover && css`
      font-weight: normal;
  `}
  

  &:focus {
    outline: 0;
  }

  ${(props) => props.red && css`
    background: ${props.theme.brickred};
    color: ${props.theme.white};
    &:hover {
      background: ${props.theme.brickredDark};
    }
  `}

  ${(props) => props.marginRight && css`
    margin-right: 1rem;
  `}

  ${(props) => props.centerNavigation && css`
    @media (max-width: ${props.theme.burger_break}){
      padding: 0.3rem 0.5rem;
      font-size: 0.8rem;
    }
  `}
`;
