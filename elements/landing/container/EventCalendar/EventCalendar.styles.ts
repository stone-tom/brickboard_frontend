import styled from 'styled-components';

export const EventCalendarWrapper = styled.section`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const EventCalendarHeading = styled.h2`
  width: 23rem;
  border-bottom: 5px solid ${(props) => props.theme.brickred};
`;

export const EventList = styled.ul`
  display: flex;
`;
