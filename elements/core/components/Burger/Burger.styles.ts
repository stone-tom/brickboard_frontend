import styled, { css } from 'styled-components';

export const StyledBurger = styled.button<{
  open?: boolean,
}>`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin-right: 20px;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${(props) => props.theme.darkgray};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    ${(props) => props.open && css`
      :first-child {
        transform: ${props.open ? 'rotate(45deg)' : 'rotate(0)'};
      }

      :nth-child(2) {
        opacity: ${props.open ? '0' : '1'};
        transform: ${props.open ? 'translateX(20px)' : 'translateX(0)'};
      }

      :nth-child(3) {
        transform: ${props.open ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    `}
   
  }

  @media (max-width: ${(props) => props.theme.burger_break}){
    display: flex;
  }

`;
