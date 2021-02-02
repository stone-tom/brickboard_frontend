import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import IUser from '../../../../models/IUser';
import { getStatus } from '../../../../pages/moderation/user-moderation';
import {
  Header,
  Name,
  Status,
  ButtonWrapper,
  AcceptButton,
  DeclineButton,
  DataWrapper,
} from './AccordionUserHeader.styles';

interface HeaderProps {
  user: IUser,
  status: string,
  onUpdateStatus: (user: IUser, status: string) => void,
}

const AccordionUserHeader = ({
  user,
  status,
  onUpdateStatus,
}: HeaderProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Header>
      <DataWrapper>
        <Name>
          {user.attributes.display_name}
        </Name>
        <Status
          text={getStatus(status)}
          color={theme.userStatus[status]}
        />
      </DataWrapper>
      {status === 'blocked' && (
        <AcceptButton
          small
          reset
          icon={faCheck}
          onClick={() => onUpdateStatus(user, 'approved')}
        >
          bestätigen
        </AcceptButton>
      )}
      {status === 'approved' && (
        <DeclineButton
          small
          reset
          icon={faTimes}
          onClick={() => onUpdateStatus(user, 'blocked')}
        >
          sperren
        </DeclineButton>
      )}
    </Header>
  );
};

export default AccordionUserHeader;
