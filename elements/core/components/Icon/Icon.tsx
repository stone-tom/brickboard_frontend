import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from './Icon.styled';
import React from 'react';

interface IconInterface {
  icon: IconProp,
}

const IconComponent = (({
  icon,
}: IconInterface) => {

  return (
    <Icon icon={icon} />
  );
});

export default IconComponent