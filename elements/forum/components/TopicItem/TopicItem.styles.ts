import styled, { css } from 'styled-components';

export const TopicItem = styled.div<{
  updated?: boolean,
  moderation_state?: 'blocked' | 'pending_moderation' | 'approved',
  pinned?: boolean,
}>`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
`;

export const TopicHeading = styled.h3<{
  updated?: boolean
}>`

  &:hover {
    color: ${(props) => props.theme.brickred};
  }
`;

export const TopicIcon = styled.div<{
  updated?: boolean,
  pinned?: boolean,
}>`
  display: flex;
  width: 5%;
  align-items: center;
  padding: .2rem;
  justify-content: center;
  color: ${(props) => (props.updated ? props.theme.brickred : props.theme.darkgray)};

  svg {
    height: 40px !important;
    width: 40px !important;
  }

  @media screen and (max-width: 850px){
    svg {
    height: 30px !important;
    width: 30px !important;
  }
  }

  ${(props) => props.pinned && css`
  background-color: ${props.theme.darkgray};
  color: ${props.theme.white};
  `}

`;
export const TopicUnreadMarker = styled.div<{
  unread?: boolean,
}>`
    width: 5px;
    border-top-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: ${(props) => (props.unread ? props.theme.brickred : props.theme.gray)};
`;

export const TopicInfo = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem;
  padding-left: .5rem;
  border-left: lightgray 1px solid;

  @media screen and (max-width: 850px){
    flex-wrap: wrap;
    padding: 0.8rem;
  }
`;

export const TopicInfoDetails = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 850px){
    margin-top: 10px 0;
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
  width: 20%;
  padding: .2rem;
  padding-left: .5rem;
  border-left: lightgray 1px solid;
`;

export const TopicSettingsBar = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const TopicSettingsBarItem = styled.li`
  padding: 5px;
`;
