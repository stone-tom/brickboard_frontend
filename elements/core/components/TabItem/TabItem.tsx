import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { TabItem, TabIcon } from './TabItem.styles';

interface NavItemProps {
  name: string,
  active?: boolean,
  onClick: () => void,
  icon?: IconProp,
}

const NavigationItem = ({
  name,
  active,
  onClick,
  icon,
}: NavItemProps) => (
  <TabItem
    active={active}
    onClick={onClick}
  >
    {icon && (
      <TabIcon icon={faChevronRight} />
    )}
    {name}
  </TabItem>
);

export default NavigationItem;
