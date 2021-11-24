import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CategoryEditor = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
