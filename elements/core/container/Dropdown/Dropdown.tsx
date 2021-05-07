import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { ThemeContext } from 'styled-components';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { backendURL } from '../../../../util/api';
import {
  UserWrapper,
  DropdownWrapper,
  Avatar,
  DropItem,
  Name,
  Dropdown,
  Transparent,
  Wrapper,
  NavLink,
} from './Dropdown.styles';
import userNav from '../Navigation/submenu/user.json';
import adminNav from '../Navigation/submenu/admin.json';

const SubMenu = () => {
  const [open, setOpen] = useState(false);
  const { user } = useStoreState();
  const { performLogout, setMessage } = useStoreDispatch();
  const router = useRouter();
  const theme = useContext(ThemeContext);

  const navigation = user.attributes.admin ? adminNav : userNav;
  const handleLogout = () => {
    router.push('/');
    performLogout();
    setMessage({
      content: 'Erfolgreich abgemeldet!',
      type: MessageType.success,
    });
  };

  return (
    <DropdownWrapper>
      <UserWrapper
        onMouseOver={window.innerWidth > theme.burger_break_number ? () => setOpen(true) : null}
        onClick={() => setOpen(!open)}
      >
        <Name>
          {user.attributes.display_name}
        </Name>
        <Avatar>
          <Image width="40" height="40" src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_profile.svg'} />
        </Avatar>
      </UserWrapper>

      {(open || window.innerWidth < theme.burger_break_number) && (
        <Wrapper
          onMouseLeave={() => setTimeout(() => {
            setOpen(false);
          }, 250)}
          adminNav={user.attributes.admin}
          open={open}
        >
          <Transparent />
          <Dropdown>

            <NavLink href={`/profil/${user.id}`} passHref>
              <DropItem
                onClick={() => setOpen(false)}
              >
                Profil
              </DropItem>
            </NavLink>

            {navigation.map((item) => (

              <Link key={`dp_${item.path}`} href={item.path} passHref>
                <DropItem>
                  {item.text}
                </DropItem>
              </Link>

            ))}

            <DropItem
              onClick={() => handleLogout()}
            >
              Logout
            </DropItem>

          </Dropdown>
        </Wrapper>
      )}
    </DropdownWrapper>

  );
};

export default SubMenu;
