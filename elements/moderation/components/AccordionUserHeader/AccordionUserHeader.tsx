import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import IUser from '../../../../models/IUser';
import { getStatus } from '../../../../pages/moderation/user-moderation';
import {
  Header,
  Name,
  Status,
  AcceptButton,
  DeclineButton,
  DataWrapper,
  ButtonWrapper,
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
      <ButtonWrapper>
        {status !== 'approved' && (
          <AcceptButton
            small
            reset
            icon={faCheck}
            onClick={() => onUpdateStatus(user, 'approved')}
          >
            bestätigen
          </AcceptButton>
        )}
        {status !== 'blocked' && (
          <DeclineButton
            small
            reset
            icon={faTimes}
            onClick={() => onUpdateStatus(user, 'blocked')}
          >
            sperren
          </DeclineButton>
        )}
      </ButtonWrapper>
    </Header>
  );
};

export default AccordionUserHeader;
