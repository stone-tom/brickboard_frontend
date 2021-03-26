import styled from 'styled-components';

export const EventCreatorWrapper = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: ${(props) => props.theme.boxShadow}; 

`;

export const EventCreatorBody = styled.div`
  display: flex; 
  padding: 1rem;
`;

export const EventCreatorTitle = styled.p`
  margin-bottom: 0.5rem;
`;

export const EventCreatorSelect = styled.select`
  padding: 8px 10px;
  margin-left: 1rem;
`;

export const EventCreatorInfos = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const EventCreatorMargin = styled.div`
  margin: 0.5rem;
`;
