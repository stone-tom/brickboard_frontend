import styled from 'styled-components';

export const StatisticsWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  background-image: url('/assets/images/lego_pattern.jpg');
  background-repeat: repeat;
  background-size: contain;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const StatisticsContent = styled.div`
  max-width: ${(props) => props.theme.max_container_width};
  margin: 0 auto;
`;

export const StatisticsHeader = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const StatisticsHeading = styled.h2`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;
  border-bottom: 5px solid ${(props) => props.theme.brickred};
`;

export const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const Statsnumber = styled.div`
  font-weight: bold;
  font-size: 4rem;
  margin-top: 2rem;
`;

export const StatsDescription = styled.p`
  color: ${(props) => props.theme.brickred};
  font-weight: bold;
`;
