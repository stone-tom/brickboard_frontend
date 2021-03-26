import styled from 'styled-components';

export const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${(props) => props.theme.lightgray};
  box-shadow: ${(props) => props.theme.boxShadow};
`;
