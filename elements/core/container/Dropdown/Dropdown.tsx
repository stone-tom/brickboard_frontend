import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
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
} from './Dropdown.styles';
import userNav from '../Navigation/config/user.json';
import adminNav from '../Navigation/config/admin.json';

const SubMenu = () => {
  const [open, setOpen] = useState(false);

  const { user } = useStoreState();
  const { performLogout, setMessage } = useStoreDispatch();
  const router = useRouter();

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
        onMouseOver={() => setOpen(true)}
        onClick={() => setOpen(!open)}
      >
        <Name>
          {user.attributes.display_name}
        </Name>
        <Avatar>
          <Image width="40" height="40" src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/501.jpg'} />
        </Avatar>
      </UserWrapper>

      {open && (
        <Wrapper onMouseLeave={() => setTimeout(() => {
          setOpen(false);
        }, 250)}
        >
          <Transparent />
          <Dropdown>
            <DropItem
              onClick={() => setOpen(false)}
            >
              <Link href={`/profil/${user.id}`}>
                Profil
              </Link>
            </DropItem>
            {navigation.map((item) => (
              <DropItem>
                <Link href={item.path}>
                  {item.text}
                </Link>
              </DropItem>
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
