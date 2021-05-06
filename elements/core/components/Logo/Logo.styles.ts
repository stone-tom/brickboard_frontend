import styled, { css } from 'styled-components';

export const LogoWrapper = styled.a<{
  enlargeLogo?: boolean,
}>`
  width: 95px;
  height: auto;
  display: block;
  transition: all 0.3s ease-in-out;

  @media(min-width: ${(props) => props.theme.burger_break}){
    width: 140px;

    ${(props) => !props.enlargeLogo && css`
    width: 95px;
    height: auto;
  `} 
  }
`;
