import styled, { css, keyframes } from 'styled-components';

export const NotificationDropdownTrigger = styled.div`
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  &:hover{
    background: ${(props) => props.theme.lightgray};
  }

`;

const ringingAnimation = keyframes`
   0%   {transform: rotate(0);}
  25%  {transform: rotate(0) scale(1);}
  30%  {transform: rotate(35deg) scale(1.2);}
  40%  {transform: rotate(-35deg) scale(1.2);}
  50%  {transform: rotate(0) scale(1);}
  100% {transform: rotate(0);}

`;

export const NotificationCountWrapper = styled.button<{
  ringing?: boolean,
}>`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  z-index: 99;
  ${(props) => props.ringing && css`
    svg{
      animation-name: ${ringingAnimation};
      animation-duration: 6s;
      animation-iteration-count: infinite;
    }
  `}
`;

export const NotificationCountNumber = styled.span`
  position: absolute;
  bottom: -0.6rem;
  left: -1rem;
  background: ${(props) => props.theme.brickred};
  padding: 0.2rem;
  font-size: 0.7rem;
  border-radius: 35%;
  color: ${(props) => props.theme.white};
`;

export const NotificationDropDownRoot = styled.ul`
  position: absolute;
  top: 3rem;
  right: -1rem;
  width: 300px;
  min-height: 100px;
  max-height: 400px;
  overflow-y: scroll;
  box-shadow: ${(props) => props.theme.boxShadow};

  @media ${(props) => props.theme.breakpoints.sm}{

  }
`;

export const NotificationDropDownItem = styled.li<{
  url?: boolean,
}>`
  background: ${(props) => props.theme.white};
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.lightgray};
  text-align: left;
  ${(props) => props.url && css`
    &:hover{
      background: ${props.theme.gray};
      cursor: pointer;
    };
  `}
`;

export const NotificationDropDownFlex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const NotificationDropDownLink = styled.a`
  display: Flex;
  width: 100%;
  height: 100%;
`;

export const NotificationIconWrapper = styled.div`
  padding-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotificationTime = styled.p`
  color: ${(props) => props.theme.grayfont};
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

export const NotificationDeleteButton = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  font-family: inherit;
  background: ${(props) => props.theme.white};
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.brickred};
  box-shadow: ${(props) => props.theme.boxShadow};
`;
