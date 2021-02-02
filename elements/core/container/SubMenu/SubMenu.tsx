import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useStoreState } from '../../../../context/custom_store';
import {
  SubMenuContainer, SubMenuImageWrapper, SubMenuList, SubMenuListItem, SubMenuWrapper,
} from './SubMenu.styles';

const SubMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useStoreState();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <SubMenuWrapper onClick={() => toggleMenu()}>
      {user.name}
      <SubMenuImageWrapper><Image width="40" height="40" src={user.avatar ? user.avatar : '/assets/images/501.jpg'} /></SubMenuImageWrapper>
      <SubMenuContainer>
        {showMenu && (
          <SubMenuList>
            <SubMenuListItem><Link href="/moderation/user-moderation">User Moderation</Link></SubMenuListItem>
            <SubMenuListItem><Link href="/moderation/post-moderation">Post Moderation</Link></SubMenuListItem>
            <SubMenuListItem><Link href="/">Mein Profil</Link></SubMenuListItem>
            <SubMenuListItem><Link href="/">Film vorstellen</Link></SubMenuListItem>
            <SubMenuListItem><Link href="/logout">Logout</Link></SubMenuListItem>
          </SubMenuList>
        )}
      </SubMenuContainer>
    </SubMenuWrapper>
  );
};

export default SubMenu;
