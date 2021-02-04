import styled from 'styled-components';

export const StatisticItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
`;

export const Value = styled.p`
  padding: 0 5px;
  font-size: 20px;
`;

export const Text = styled.p`
  color: ${(props) => props.theme.brickred};
`;
