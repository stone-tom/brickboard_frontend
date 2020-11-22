import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React from 'react';
import INavigationItem from '../../../../../models/INavigationItem';
import {
  NavigationListItem,
  NavigationListLink,
} from '../NavigationList.styles';

interface NavItemProps {
  item: INavigationItem,
  child?: boolean,
  small?: boolean
}

const NavItem = observer(({
  item,
}: NavItemProps) => {
  return (
    <NavigationListItem key={item.text}>
      <Link
        passHref
        href={item.path ? item.path : ''}>
        <NavigationListLink>
          {item.icon}
          {item.text}
        </NavigationListLink>
      </Link>
    </NavigationListItem >
  );
});

export default NavItem;
