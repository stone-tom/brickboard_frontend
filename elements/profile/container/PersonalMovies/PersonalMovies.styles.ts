import styled from 'styled-components';

export const MovieWrapper = styled.div`
  background: ${(props) => props.theme.white};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 60px;
  margin: 0 15px 15px 15px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.gray};
  border-top: 0;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin: 0 10px 10px 10px;
    padding: 30px;
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 20px;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-right: 0;
  }
`;
