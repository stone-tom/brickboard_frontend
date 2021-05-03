import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IUser from '../../../../models/IUser';
import Dropdown from '../Dropdown/Dropdown';
import {
  MenuImageWrapper,
  NavigationList,
  NavigationWrapper,
  NavigationItem,
  Seperator,
  UnauthorizedWrapper,
  NavigationBar,
  MenuImageContainer,
  FontImageWrapper,
} from './Navigation.styles';
import Logo from '../../components/Logo/Logo';

const Navigation = ({
  user,
}: { user: IUser }) => (
  <NavigationBar>
    <NavigationWrapper>
      <Link href="/">
        <MenuImageContainer>
          <FontImageWrapper>
            <Image src="/assets/images/bb_font.png" alt="Brickboard" height="32px" width="60px" />
          </FontImageWrapper>
          <MenuImageWrapper>
            <Logo />
          </MenuImageWrapper>
        </MenuImageContainer>
      </Link>

      <NavigationList>
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
          <Dropdown />)
          : (
            <UnauthorizedWrapper>
              <Link href="/login">Login</Link>
              <Seperator />
              <Link href="/registrieren">Registrieren</Link>
            </UnauthorizedWrapper>
          )}
      </NavigationList>
    </NavigationWrapper>
  </NavigationBar>
);

export default Navigation;
