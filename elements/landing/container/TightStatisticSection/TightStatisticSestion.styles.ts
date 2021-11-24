import styled from 'styled-components';

export const StatisticContainer = styled.section`
   background: linear-gradient(
    to bottom,
    ${(props) => props.theme.white} 0%,
    ${(props) => props.theme.white} 80%,
    ${(props) => props.theme.darkgray} 60%,
    ${(props) => props.theme.darkgray} 100%
  );
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatisticsWrapper = styled.div`

`;

export const StatisticsContent = styled.div`
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
`;

export const StatisticsHeader = styled.header`
  display: flex;
  flex-basis: 100%;
  justify-content: center;
`;

export const StatisticsHeading = styled.h2`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

export const StatsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => props.theme.white};
  box-shadow: .625rem 1.75rem 5rem 0 rgba(1,25,38,.3);
  min-width: 800px;

    @media (max-width: ${(props) => props.theme.burger_break}){
      width: auto;
      min-width: auto;
    }
`;

export const StatsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  margin-bottom: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media ${(props) => props.theme.breakpoints.sm}{
    padding-left: 1rem;
    padding-right: 1rem;
  }

`;

export const MiddleStatsItem = styled(StatsItem)`
  border-right: 1px solid ${(props) => props.theme.gray};
  border-left: 1px solid ${(props) => props.theme.gray};
`;

export const Statsnumber = styled.div`
  font-weight: bold;
  font-size: 4rem;
  margin-top: 2rem;

  @media ${(props) => props.theme.breakpoints.sm}{
    font-size: 2rem;
  }
`;

export const StatsDescription = styled.p`
  color: ${(props) => props.theme.brickred};
  font-weight: bold;
  display: flex;
  align-items: center;
  span {
    padding-left: 10px;
    letter-spacing: 1.5px;
  }

  @media ${(props) => props.theme.breakpoints.sm}{
    span {
    font-size: 0.8rem;
    }
  }
`;
