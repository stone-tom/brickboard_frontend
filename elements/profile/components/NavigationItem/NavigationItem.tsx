import React from 'react';
import { NavItem } from './NavigationItem.styles';

interface NavItemProps {
  name: string,
  active?: boolean,
  onClick: () => void,
}

const NavigationItem = ({
  name,
  active,
  onClick,
}: NavItemProps) => (
  <NavItem
    active={active}
    onClick={onClick}
  >
    {name}
  </NavItem>
);

export default NavigationItem;
