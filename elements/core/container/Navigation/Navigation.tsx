import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { faClipboardList, faUserFriends, faVideo } from '@fortawesome/free-solid-svg-icons';
import IUser from '../../../../models/IUser';
import Dropdown from '../Dropdown/Dropdown';
import {
  MenuImageWrapper,
  NavigationList,
  NavigationWrapper,
  NavigationItem,
  Seperator,
  NavigationBar,
  MenuImageContainer,
  FontImageWrapper,
} from './Navigation.styles';
import Logo from '../../components/Logo/Logo';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/Button/Button';
import INotification from '../../../../models/INotification';
import NotificationDropDown from '../NotificationDropdown/NotificationDropdown';
import { FlexRight } from '../../../../styles/global.styles';

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
          <NavigationItem>
            <Link href="/forum" passHref>
              <Button reset icon={faClipboardList} noHover>
                Forum
              </Button>
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/forum/filmvorstellungen" passHref>
              <Button reset icon={faVideo} noHover>
                Filme
              </Button>
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/benutzer" passHref>
              <Button reset icon={faUserFriends} noHover>
                Mitglieder
              </Button>
            </Link>
          </NavigationItem>
        </NavigationList>
        {user ? (
          <FlexRight>
            <NavigationItem>
              <NotificationDropDown notifications={notifications} />
            </NavigationItem>
            <NavigationItem>
              <Dropdown />
            </NavigationItem>
          </FlexRight>
        )
          : (
            <>
              <NavigationItem>
                <Link href="/login" passHref>
                  <Button reset>Login</Button>
                </Link>
              </NavigationItem>
              <Seperator />
              <NavigationItem>
                <Link href="/registrieren"><Button reset>Registrieren</Button></Link>
              </NavigationItem>
            </>
          )}
        <Burger onClick={() => setOpenBurger(!openBurger)} open={openBurger} />
      </NavigationWrapper>
    </NavigationBar>
  );
};
export default Navigation;
