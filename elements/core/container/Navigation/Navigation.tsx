import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { faClipboardList, faVideo } from '@fortawesome/free-solid-svg-icons';
import IUser from '../../../../models/IUser';
import Dropdown from '../Dropdown/Dropdown';
import {
  MenuImageWrapper,
  NavigationList,
  NavigationWrapper,
  NavigationItem,
  NavigationBar,
  MenuImageContainer,
  FontImageWrapper,
  NavigationSvgWrapper,
} from './Navigation.styles';
import Logo from '../../components/Logo/Logo';
import Burger from '../../components/Burger/Burger';
import INotification from '../../../../models/INotification';
import NotificationDropDown from '../NotificationDropdown/NotificationDropdown';
import { FlexRight } from '../../../../styles/global.styles';
import IconComponent from '../../components/Icon/Icon';
import { MenuLink } from '../../components/MenuLink/MenuLink.styles';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = ({
  user,
  notifications = [],
}: { user: IUser, notifications: INotification[] }) => {
  const [enlargeLogo, _setEnlargeLogo] = useState(window.pageYOffset === 0);
  const [openBurger, setOpenBurger] = useState(false);
  const enlargeRef = useRef(enlargeLogo);
  const setEnlargeLogo = (value: boolean) => {
    enlargeRef.current = value;
    _setEnlargeLogo(value);
  };

  const handleScroll = () => {
    if (window.pageYOffset > 0 && enlargeLogo) {
      setEnlargeLogo(false);
    } else if (window.pageYOffset === 0) {
      setEnlargeLogo(true);
    }
  };
  useEffect(() => {
    window.onscroll = () => {
      handleScroll();
    };
  }, []);

  return (
    <NavigationBar>
      <NavigationWrapper>
        <Link href="/">
          <MenuImageContainer>
            <FontImageWrapper enlargeLogo={enlargeLogo}>
              <Image src="/assets/images/bb_font.png" alt="Brickboard" height="32px" width="60px" />
            </FontImageWrapper>
            <MenuImageWrapper enlargeLogo={enlargeLogo}>
              <Logo enlargeLogo={enlargeLogo} />
            </MenuImageWrapper>
          </MenuImageContainer>
        </Link>

        <NavigationList open={openBurger}>
          {user && (
            <UserMenu onLogout={() => setOpenBurger(false)} />
          )}
          <NavigationItem burgerItem={user !== null}>
            <Link href="/forum" passHref>
              <MenuLink icon burgerContent>
                <IconComponent icon={faClipboardList} />
                Forum
              </MenuLink>
            </Link>
          </NavigationItem>
          <NavigationItem burgerItem={user !== null}>
            <Link href="/forum/filmvorstellungen" passHref>
              <MenuLink icon burgerContent>
                <IconComponent icon={faVideo} />
                Filme
              </MenuLink>
            </Link>
          </NavigationItem>
          <NavigationItem burgerItem={user !== null}>
            <Link href="/benutzer" passHref>
              <MenuLink icon burgerContent>
                <NavigationSvgWrapper>
                  <Image width={25} height={20} src="/assets/images/lego_members_zoomed.svg" aria-hidden />
                </NavigationSvgWrapper>
                Mitglieder
              </MenuLink>
            </Link>
          </NavigationItem>
        </NavigationList>
        {user ? (
          <FlexRight>
            <NotificationDropDown notifications={notifications} />
            <Dropdown />
          </FlexRight>
        )
          : (
            <FlexRight>
              <NavigationItem>
                <Link href="/login" passHref>
                  <MenuLink centerNavigation>
                    Login
                  </MenuLink>
                </Link>
              </NavigationItem>
              <NavigationItem>
                <Link href="/registrieren" passHref>
                  <MenuLink red marginRight centerNavigation>
                    Registrieren
                  </MenuLink>
                </Link>
              </NavigationItem>
            </FlexRight>
          )}
        <Burger onClick={() => setOpenBurger(!openBurger)} open={openBurger} />
      </NavigationWrapper>
    </NavigationBar>
  );
};
export default Navigation;
