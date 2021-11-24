import styled, { css } from 'styled-components';

export const EventCalendarWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media ${(props) => props.theme.breakpoints.sm}{
    margin-top: 1rem;
  }
`;

export const EventCalendarHeading = styled.h2`
  padding: 2rem 15px 1rem 15px;
  position: relative;
  margin-top: 1rem;

  &::before{
    content: '';
    width: 50px;
    height: 5px;
    background: ${(props) => props.theme.grayfont};
    position: absolute;
    top: 0;
    left: 1rem;
  }

  @media (max-width: ${(props) => props.theme.burger_break}){
    order: 1;
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    width: auto;
    padding: 2rem 0 1rem 0;
    &::before{
    left: 0;
  }
  }
`;

export const EventList = styled.ul<{
  space?: boolean,
}>`
  display: flex;
  flex-wrap: wrap;

  ${(props) => props.space && css`
    margin-bottom: 8rem;
  `}

`;

export const SliderWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const CalendarSection = styled.div`
  width: 75%;

  @media (max-width: ${(props) => props.theme.burger_break}){
    width: 100%;
    order: 3;
  }
`;

export const CalendarImageWrapper = styled.div`
  position: relative;
  width: 25%;

  @media (max-width: ${(props) => props.theme.burger_break}){
    height: 200px;
    width: 100%;
    order: 2;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

export const CalendarButtonWrapper = styled.div`
  margin-top: 1rem;
  display: inline-block;
`;
