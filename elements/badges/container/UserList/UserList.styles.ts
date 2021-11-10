import styled from 'styled-components';

export const UserListWrapper = styled.div`
  width: 300px;
  padding: 1rem;
  background: ${(props) => props.theme.lightgray};
  margin-right: 1rem;
`;

export const SuggestionList = styled.ul`
  padding: 0.5rem;
  height: 150px;
  overflow-y: scroll;
  background: white;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const SuggestionListItem = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.lightgray};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  align-items: center;
`;

export const ChosenUsersList = styled.ul`
  padding: 0.5rem;
  background: white;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
