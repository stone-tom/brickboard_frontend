import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Icon } from './Icon.styled';

interface IconInterface {
  icon: IconProp,
}

const IconComponent = (({
  icon,
}: IconInterface) => (
  <Icon icon={icon} />
));

export default IconComponent;
