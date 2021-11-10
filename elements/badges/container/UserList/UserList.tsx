import React, { useState } from 'react';
import IUser from '../../../../models/IUser';
import { FlexBetween } from '../../../../styles/global.styles';
import { getUsersFromAutoComplete } from '../../../../util/api';
import ButtonComponent from '../../../core/components/Button/Button';
import { FormInput } from '../../../core/components/FormInput/FormInput.styles';
import {
  ChosenUsersList,
  SuggestionList,
  SuggestionListItem,
  UserListWrapper,
} from './UserList.styles';

interface UserListProps {
  onClick: (userList: IUser[]) => Promise<void>,
  onRemoveClick: (userList: IUser[]) => Promise<void>
}
const UserList = ({ onClick, onRemoveClick }: UserListProps) => {
  const [users, setUsers] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const fetchUserSuggestions = async (search) => {
    if (search.length > 2) {
      const { content } = await getUsersFromAutoComplete(search);
      if (content) {
        setUserSuggestions([...content.data]);
      }
    }
  };

  const addUser = (user: IUser) => {
    if (!users.includes(user)) {
      users.push(user);
      setUsers([...users]);
    }
  };

  const removeUser = (user: IUser) => {
    setUsers(users.filter((currentUser: IUser) => currentUser.id !== user.id));
  };

  return (
    <UserListWrapper>
      <FormInput type="text" placeholder="Username suchen..." onChange={(e) => fetchUserSuggestions(e.target.value)} />
      <SuggestionList>
        {userSuggestions.map((user: IUser) => (
          <SuggestionListItem
            key={`user_suggestion_${user.id}`}
          >
            <span>{user.attributes.display_name}</span>
            <button onClick={() => addUser(user)} type="button">+</button>
          </SuggestionListItem>
        ))}
      </SuggestionList>
      <FlexBetween>
        <p>Ausgewählte User:</p>
        <button type="button" onClick={() => setUsers([])}>Leeren</button>
      </FlexBetween>
      <ChosenUsersList>
        {users.length === 0 && <p>User suchen und auswählen</p>}
        {users.map((user: IUser) => (
          <SuggestionListItem>
            <span>{user.attributes.display_name}</span>
            <button type="button" onClick={() => removeUser(user)}>-</button>
          </SuggestionListItem>
        ))}
      </ChosenUsersList>
      <FlexBetween>
        <ButtonComponent
          onClick={() => onClick(users)}
          disabled={users.length === 0}
          small
        >
          {users.length > 1 ? 'Badges ' : 'Badge '}
          zuweisen
        </ButtonComponent>
        <ButtonComponent
          onClick={() => onRemoveClick(users)}
          disabled={users.length === 0}
          small
        >
          {users.length > 1 ? 'Badges ' : 'Badge '}
          entfernen
        </ButtonComponent>
      </FlexBetween>
    </UserListWrapper>
  );
};

export default UserList;
