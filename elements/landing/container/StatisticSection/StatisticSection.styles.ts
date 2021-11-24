import styled from 'styled-components';

export const StatisticContainer = styled.section`
  background-image: url('/assets/images/lego_pattern.jpg');
  background-repeat: repeat;
  background-size: contain;
  padding-top: 8rem;
  padding-bottom: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatisticsWrapper = styled.div`
  border-radius: 10px;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.boxShadow};
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
  flex-basis: 100%;
`;

export const StatsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const StatsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;



`;

export const MiddleStatsItem = styled(StatsItem)`
  border-right: 1px solid ${(props) => props.theme.gray};
  border-left: 1px solid ${(props) => props.theme.gray};
`;

export const Statsnumber = styled.div`
  font-weight: bold;
  font-size: 4rem;
  margin-top: 2rem;

  @media (max-width: ${(props) => props.theme.burger_break}){
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
`;
