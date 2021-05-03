import styled from 'styled-components';

export const BadgesWrapper = styled.div`
  display: flex;
  flex-direction: row,
  flex-wrap: wrap;
  padding: 50px;

  & > div {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;
