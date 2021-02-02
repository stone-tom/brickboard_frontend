import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import IModerationUser from '../../../../models/IModerationUser';
import { getStatus } from '../../../../pages/moderation/user-moderation';
import PostListComponent from '../../container/PostList/PostList';
import {
  Spoiler,
  Name,
  UserWrapper,
  Status,
  ToggleIcon,
  SpoilerWrapper,
  ToggleButton,
} from './Spoiler.styles';

interface SpoilerProps {
  user: IModerationUser,
  status: string,
}

const SpoilerComponent = ({
  user,
  status,
}: SpoilerProps) => {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SpoilerWrapper>
      <Spoiler>
        <UserWrapper>
          <Name>
            {user.attributes.display_name}
          </Name>
          <Status
            text={getStatus(status)}
            color={theme.userStatus[status]}
          />
        </UserWrapper>
        <ToggleButton
          openToggle={open}
          reset
          onClick={() => setOpen(!open)}
        >
          <ToggleIcon icon={faCaretDown} />
        </ToggleButton>
      </Spoiler>
      {open && (
        <PostListComponent userId={user.id} />
      )}
    </SpoilerWrapper>
  );
};

export default SpoilerComponent;
