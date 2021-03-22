import styled, { css } from 'styled-components';

export const NewsItemWrapper = styled.li`
  position: relative;
  width: 100%;
  height: 30%;
  box-shadow: 0 0 10px ${(props) => props.theme.darkgray};
  cursor: pointer;
  @media (max-width: 880px){
    width: 33%;
    height: 10rem;
  }
`;
export const BigNewsItemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  @media (max-width: 880px){
    height:40vh;
  }
`;

export const NewsInfos = styled.div`
  position: absolute;
  bottom: 0;
  left:0;
  max-width: 80%;
  padding: 1rem;
  color: ${(props) => props.theme.white};
  background-color: rgba(51,51,51,0.6);
`;

export const BigNewsItemHeading = styled.h2`
  margin-bottom: 0.5rem;
`;

export const BigNewsItemDescription = styled.p`
  margin-bottom: 1rem;
`;

export const NewsItemHeading = styled.h3`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px;
  padding-bottom: 17px;
  z-index: 1;
  color: ${(props) => props.theme.white};
  background-color: rgba(51,51,51,0.6);
`;

export const NewsItemButtonFloat = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 1rem;
`;

export const NewsItemBorder = styled.div<{
  active?: boolean,
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 7px solid;
  border-color: transparent;
  transition: all 0.3s;
  z-index: 2;
  
  ${(props) => props.active && css`
    border-color: ${props.theme.brickred};
  `}

`;
