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
`;

export const Wrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 20px;
`;
