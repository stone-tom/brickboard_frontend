import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
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

const Navigation = ({
  user,
}: { user: IUser }) => {
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
            <Link href="/forum">
              Forum
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/forum/filmvorstellungen">
              Filme
            </Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/benutzer">
              Mitglieder
            </Link>
          </NavigationItem>

          {user ? (
            <NavigationItem>
              <Dropdown />
            </NavigationItem>
          )
            : (
              <>
                <NavigationItem>
                  <Link href="/login">Login</Link>
                </NavigationItem>
                <Seperator />
                <NavigationItem>
                  <Link href="/registrieren">Registrieren</Link>
                </NavigationItem>
              </>
            )}

        </NavigationList>
        <Burger onClick={() => setOpenBurger(!openBurger)} open={openBurger} />
      </NavigationWrapper>
    </NavigationBar>
  );
};
export default Navigation;
