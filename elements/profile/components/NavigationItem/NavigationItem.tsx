import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { NavItem, NavIcon } from './NavigationItem.styles';

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
    <NavIcon icon={faChevronRight} />
    {name}
  </NavItem>
);

export default NavigationItem;
