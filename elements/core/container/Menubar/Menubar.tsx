import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SubMenu from '../SubMenu/SubMenu';
import {
  MenuImageWrapper, NavigationList, MenuWrapper, NavigationItem, MenuBackground,
} from './Menubar.styles';

const menubar = ({ user }) => (
  <MenuBackground>
    <MenuWrapper>
      <Link href="/">
        <MenuImageWrapper>
          <Image src="/assets/images/bb_black_font.png" alt="Brickboard Logo" layout="fill" priority />
        </MenuImageWrapper>
      </Link>
      <NavigationList>
        <NavigationItem><Link href="/forum">Forum</Link></NavigationItem>
        <NavigationItem>{user ? <SubMenu /> : <Link href="/login">Login</Link>}</NavigationItem>
        {!user && <Link href="/registrieren">Registrieren</Link>}
      </NavigationList>
    </MenuWrapper>
  </MenuBackground>
);

export default menubar;
