import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Icon } from './Icon.styled';

interface IconInterface {
  icon: IconProp,
  width?: number,
  height?: number,
}

const IconComponent = (({
  icon,
  height,
  width,
}: IconInterface) => (
  <Icon height={height} width={width} icon={icon} />
));

export default IconComponent;
