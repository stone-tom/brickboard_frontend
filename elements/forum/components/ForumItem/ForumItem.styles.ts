import styled, { css } from 'styled-components';

export const ForumItem = styled.div`
  min-height: 50px;
  padding: .5rem;
  color: ${(props) => props.theme.darkgray};
  border: lightgray 1px solid;
  border-radius: 2px;
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0px 10px 10px ${(props) => props.theme.lightgray};
  transition: transform .4s ease-in-out;
  display: grid;
  grid-template-columns: 10% 45% 45%;
  grid-template-rows: 1fr 1fr 1fr;

  &:hover {
    transform: scale(1.01);
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px auto auto;
  }
`;

export const ForumItemImageContainer = styled.div<{
  unreadItems?: boolean,
}>`
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
  padding: .5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  ${(props) => !props.unreadItems && css`
      img {
        filter: grayscale(100%);
        opacity: 0.5;
      }
  `}

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }

`;

export const ForumItemContent = styled.div<{
  unreadItems?: boolean,
}>`
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 3;
  padding: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: .5rem;
  border-left:  ${(props) => props.theme.gray} 2px solid;
  cursor: pointer;

  border-right: ${(props) => props.theme.gray} 2px solid;
  margin-right: 0.5rem;

  ${(props) => props.unreadItems && css`
      border-color: ${props.theme.brickred}
  `}

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
    border-left: none;
    border-top: ${(props) => props.theme.gray} 2px solid;
    border-right: none;
    padding: 2rem 0;
  }
`;

export const ForumHeading = styled.h3`
  margin: 0;

  &:hover {
    color: ${(props) => props.theme.brickred};
  }
`;

export const ForumIconWrapper = styled.div`
  svg {
    margin-right: 10px;
  } 
  span {
    display: inline-block;
  }  

  
  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
  }
`;

export const ForumInfoWrapper = styled.div<{
  unreadItems?: boolean,
}>`

  display: flex;
  flex-wrap: wrap;
  padding: .5rem;
  border-left: ${(props) => props.theme.gray} 2px solid;

  ${(props) => props.unreadItems && css`
      border-color: ${props.theme.brickred}
  `}

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
    border-left: none;
  }

`;

export const ForumItemDetails = styled.div<{
  unreadItems?: boolean,
}>`
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.gray} 2px solid;
  padding-bottom: .5rem;

  ${(props) => props.unreadItems && css`
      border-color: ${props.theme.brickred};
  `}

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
    border-bottom: none;
    flex-wrap: wrap;
  }

`;

export const ForumInfo = styled.div`
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-top: .5rem;

  p {
    margin-top: 5px;
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 3;
    border-top: ${(props) => props.theme.gray} 2px solid;
  }

`;

export const LastPostHeading = styled.p`
  color: ${(props) => props.theme.grayfont};
  font-weight: 400;
`;
