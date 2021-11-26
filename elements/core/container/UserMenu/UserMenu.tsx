import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  faAward,
  faCalendarPlus,
  faInfoCircle,
  faMailBulk,
  faNewspaper,
  faSignOutAlt,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';
import {
  UserWrapper,
  Avatar,
  Name,
  UserMenuWrapper,
  UserMenuList,
  UserMenuListItem,
  UserMenuLink,
  UserMenuFlex,
  MenuLine,
} from './UserMenu.styles';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import { DropItemIcon } from '../Dropdown/Dropdown.styles';
import userNav from '../Navigation/submenu/user.json';
import adminNav from '../Navigation/submenu/admin.json';
import IconComponent from '../../components/Icon/Icon';
import { MessageType } from '../../../../models/IMessage';

interface UserMenuProps {
  onLogout: () => void,
}

const UserMenu = ({ onLogout }: UserMenuProps) => {
  const { user } = useStoreState();
  const { performLogout, setMessage } = useStoreDispatch();
  const router = useRouter();
  const navigation = user.attributes.admin ? adminNav : userNav;

  const handleLogout = () => {
    onLogout();
    router.push('/');
    performLogout();
    setMessage({
      content: 'Erfolgreich abgemeldet!',
      type: MessageType.success,
    });
  };

  const determineIcon = (text) => {
    switch (text) {
      case 'Events':
        return faCalendarPlus;
      case 'News':
        return faNewspaper;
      case 'Badges':
        return faAward;
      case 'Moderation: Benutzer':
        return faUsersCog;
      case 'Moderation: Posts':
        return faMailBulk;
      default:
        return faInfoCircle;
    }
  };

  return (
    <UserMenuWrapper>
      <UserWrapper>
        <Avatar>
          <Image width="40" height="40" src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_profile.svg'} />
        </Avatar>
        <Name>
          {user.attributes.display_name}
        </Name>
      </UserWrapper>
      <UserMenuList>
        <UserMenuListItem>
          <Link passHref href={`/profil/${user.id}`}>
            <UserMenuLink>
              <DropItemIcon>
                <Image
                  src="/assets/images/profile_icon.svg"
                  width={20}
                  height={20}
                  alt="Profil Icon"
                />
              </DropItemIcon>
              <span>
                Profil
              </span>
            </UserMenuLink>
          </Link>
        </UserMenuListItem>
        {navigation.map((item) => (
          <UserMenuListItem key={`dp_${item.path}`}>
            <Link href={item.path} passHref>
              <UserMenuLink>
                {item.icon ? (
                  <DropItemIcon>
                    <Image
                      src={item.icon}
                      width={20}
                      height={20}
                      alt="Icon"
                    />
                  </DropItemIcon>
                ) : (
                  <DropItemIcon>
                    <IconComponent icon={determineIcon(item.text)} />
                  </DropItemIcon>
                )}
                <span>
                  {item.text}
                </span>
              </UserMenuLink>
            </Link>
          </UserMenuListItem>
        ))}
        <UserMenuListItem onClick={() => handleLogout()}>
          <UserMenuFlex>
            <DropItemIcon>
              <IconComponent icon={faSignOutAlt} />
            </DropItemIcon>
            <span>
              Logout
            </span>
          </UserMenuFlex>
        </UserMenuListItem>
      </UserMenuList>
      <MenuLine />
    </UserMenuWrapper>
  );
};

export default UserMenu;
