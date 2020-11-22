import React from 'react';
import INavigationItem from '../../../../models/INavigationItem';
import {
  NavList,
} from './NavigationList.styles';
import NavItem from './NavItem/NavItem';

interface NavigationListProps {
  navigation: any,
  small: boolean,
}
const NavigationList = ({
  navigation,
}: NavigationListProps) => {
  return (
    <NavList>
      {navigation.map((item: INavigationItem) => (
        <NavItem item={item} />
      ))}
    </NavList>
  );
};

export default NavigationList;
