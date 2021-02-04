import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { backendURL } from '../../../../util/api';
import Button from '../../components/Button/Button';
import {
  SubMenuContainer, SubMenuImageWrapper, SubMenuList, SubMenuListItem, SubMenuWrapper,
} from './SubMenu.styles';

const SubMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, isAuthenticated } = useStoreState();
  const { performLogout, setMessage } = useStoreDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    router.push('/');
    performLogout();
    setMessage({
      content: 'Erfolgreich abgemeldet!',
      type: MessageType.success,
    });
  };
  // const myLoader = ({ src, width, quality }) => `https://brickboard.herokuapp.com${src}?w=${width}&q=${quality || 75}`;F
  return (
    <SubMenuWrapper onClick={() => toggleMenu()}>
      {user.attributes.display_name}
      <SubMenuImageWrapper><Image width="40" height="40" src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_profile.svg'} /></SubMenuImageWrapper>
      <SubMenuContainer>
        {showMenu && (
          <SubMenuList>
            <SubMenuListItem><Link href="/moderation/user-moderation">User Moderation</Link></SubMenuListItem>
            <SubMenuListItem><Link href="/moderation/post-moderation">Post Moderation</Link></SubMenuListItem>
            {isAuthenticated && user && (<SubMenuListItem><Link href={`/profile/${user.id}`}>Mein Profil</Link></SubMenuListItem>)}
            <SubMenuListItem><Link href="/">Film vorstellen</Link></SubMenuListItem>
            <SubMenuListItem>
              <Button reset onClick={() => handleLogout()}>Logout</Button>
            </SubMenuListItem>
          </SubMenuList>
        )}
      </SubMenuContainer>
    </SubMenuWrapper>
  );
};

export default SubMenu;
