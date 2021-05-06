import styled, { css } from 'styled-components';

export const TopicItem = styled.div<{
  updated?: boolean,
  moderation_state?: 'blocked' | 'pending_moderation' | 'approved',
  pinned?: boolean,
}>`
  min-height: 50px;
  display: flex;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5px 5% auto auto 25%;
  color: ${(props) => props.theme.darkgray};
  border: lightgray 1px solid;
  border-radius: 2px;
  margin: .5rem 0;
  cursor: pointer;
  box-shadow: 0px 10px 10px ${(props) => props.theme.lightgray};

  transition: background-color .4s;
  ${(props) => props.moderation_state === 'blocked' && css`
    opacity: 0.4;
  `}
  ${(props) => props.moderation_state === 'pending_moderation' && css`
  background-color: ${props.theme.warning};
  `}
  &:hover {
    background-color: ${(props) => props.theme.lightgray};
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-template-rows: 80px auto auto;
    grid-template-columns: 100px 1fr;
  }
`;

export const TopicHeading = styled.h2<{
  updated?: boolean
}>`

  &:hover {
    color: ${(props) => props.theme.brickred};
  }
  font-size: 1.2rem;
`;

export const TopicIcon = styled.div<{
  updated?: boolean,
  pinned?: boolean,
}>`
  display: flex;
  grid-column-start: 2;
  grid-column-end: 3;
  align-items: center;
  padding: .2rem;
  justify-content: center;

  svg {
    height: 40px !important;
    width: 40px !important;
  }

  ${(props) => props.pinned && css`
  background-color: ${props.theme.darkgray};
  color: ${props.theme.white};
  `}

  @media ${(props) => props.theme.breakpoints.sm}{

    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    border-right: ${(props) => props.theme.gray} 2px solid;
    ${(props) => props.updated && css`
      color: ${props.theme.brickred};
  `}
  }

`;
export const TopicUnreadMarker = styled.div<{
  unread?: boolean,
}>`
    width: 5px;
    border-top-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: ${(props) => props.theme.gray};

    ${(props) => props.unread && css`
      background-color: ${props.theme.brickred};
    `}
`;

export const TopicInfo = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem;
  padding-left: .5rem;
  border-left: ${(props) => props.theme.gray} 1px solid;

  @media ${(props) => props.theme.breakpoints.sm}{
    flex-wrap: wrap;
    padding: 1rem 0.8rem;
    
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;

    border-left: none;
    border-top: ${(props) => props.theme.gray} 2px solid;
    border-bottom: ${(props) => props.theme.gray} 2px solid;
 
  }
`;

export const TopicInfoDetails = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media ${(props) => props.theme.breakpoints.sm}{
    margin-top: 10px 0;
    
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;
export const TopicInfoDetailsItem = styled.div`
  svg {
    margin-right: 10px;
  } 
  span {
    display: inline-block;
  }  
  margin: 0 1rem;
`;

export const TopicActivity = styled.div`
  grid-column-start: 5;
  grid-column-end: 6;
  padding: .2rem;
  padding-left: .5rem;
  border-left: lightgray 1px solid;

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 3;

    border-left: none;
    font-size: 0.8rem;
    padding: 0.8rem;
  }

`;

export const TopicSettingsBar = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const TopicSettingsBarItem = styled.li`
  padding: 5px;
`;
