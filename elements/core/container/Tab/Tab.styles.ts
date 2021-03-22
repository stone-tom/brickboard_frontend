import styled from 'styled-components';

export const Tabs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Wrapper = styled.div`
  padding: 15px 15px 0 15px;
  background: ${(props) => props.theme.lightgray};
`;
