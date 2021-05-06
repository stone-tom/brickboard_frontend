import styled from 'styled-components';

export const BadgesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 50px;
  margin: 0 15px 15px 15px;
  border: 1px solid ${(props) => props.theme.gray};
  background: ${(props) => props.theme.white};
  border-top: 0;
  width: 100%;

  & > div {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 10px;
    margin: 0 10px 10px 10px;
    justify-content: center;
  }
`;
