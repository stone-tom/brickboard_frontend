import styled, { css } from 'styled-components';

export const EventItemWrapper = styled.div<{
  infoItem?: boolean,
  pastEvent?: boolean,
  borderless?: boolean,
}>`
  margin: 1rem;
  box-shadow: ${(props) => props.theme.boxShadow}; 
  
  ${(props) => props.borderless && css`
  margin: 0 2rem 0 2rem;
  max-width: 300px;
  `}

  ${(props) => props.infoItem && css`
    background-color: ${props.theme.gray};
  `}

  ${(props) => props.pastEvent && css`
    opacity: 0.6;
  `}

`;

export const EventHeader = styled.header`
  display: flex;
  align-items: center;
  height: 4rem;
  border-bottom: 2px solid ${(props) => props.theme.darkgray}; 
`;

export const EventHostWrapper = styled.div<{
  infoItem?: boolean,
}>`
  width: 20%;
  position: relative;
  padding-right: 1rem;
  
  ${(props) => props.infoItem && css`
  padding-right: 0;
  background-color: ${props.theme.brickred};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`}
`;

export const EventTitleWrapper = styled.div`
  width: 81%;
  padding-left: 1rem;
`;

export const EventBody = styled.div`
  
`;
export const EventDescription = styled.div`
  height: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
`;

export const EventInfos = styled.div<{
  infoItem?: boolean,
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  ${(props) => props.infoItem && css`
    height: 3rem;
  `}
`;

export const CalendarIconWrapper = styled.div<{
  dark?: boolean,
}>`
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

    ${(props) => props.dark && css`
    color: ${props.theme.darkgray};
  `}
`;
