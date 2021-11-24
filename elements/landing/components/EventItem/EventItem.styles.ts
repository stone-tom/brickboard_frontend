import styled, { css } from 'styled-components';

export const EventItemWrapper = styled.li<{
  pastEvent?: boolean,
}>`
  margin: 1rem;
  display: grid;
  grid-template-columns: 80px 350px;
  grid-template-rows: auto auto;
  box-shadow: ${(props) => props.theme.boxShadow}; 
  border-radius: 5px;
  overflow: hidden;

  ${(props) => props.pastEvent && css`
    opacity: 0.6;
  `}

  @media ${(props) => props.theme.breakpoints.sm}{
    grid-template-columns: 20% 80%;
    width: 100%;
  }

`;

export const EventItemWrapperLink = styled.a<{
  pastEvent?: boolean,
}>`
  margin: 1rem;
  display: grid;
  grid-template-columns: 80px 350px;
  grid-template-rows: auto auto;
  box-shadow: ${(props) => props.theme.boxShadow}; 
  border-radius: 5px;
  overflow: hidden;

  ${(props) => props.pastEvent && css`
    opacity: 0.6;
  `}

  &:hover{
     box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
   }

`;

export const EventHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.gray}; 
`;

export const EventHostWrapper = styled.div<{
  infoItem?: boolean,
}>`
  margin: 5px;
  width: 40px;
  height: 40px;
  position: relative;

`;

export const EventTitleWrapper = styled.div`
  padding-left: 1rem;
`;

export const EventBody = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;
export const EventDescription = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
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

export const EventDate = styled.div`
  background: ${(props) => props.theme.brickred};
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column: 1;
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const EventDay = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const EventMonth = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
`;
