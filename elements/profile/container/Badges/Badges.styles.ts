import styled from 'styled-components';

export const BadgesWrapper = styled.div`
  margin: 0 15px 15px 15px;
  display: flex;
  flex-direction: row,
  flex-wrap: wrap;
  padding: 50px;
  border: 1px solid ${(props) => props.theme.gray};
  background: ${(props) => props.theme.white};
  border-top: 0;

  & > div {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;
