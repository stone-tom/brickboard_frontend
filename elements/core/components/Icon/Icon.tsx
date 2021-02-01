import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Icon } from './Icon.styled';

interface IconInterface {
  icon: IconProp,
  hint?: string,
}

const IconComponent = (({
  icon,
  hint,
}: IconInterface) => {
  if (hint) {
    return (
      <span aria-label={hint} data-balloon-pos="down">
        <Icon icon={icon} />
      </span>
    );
  }
  return (
    <Icon icon={icon} />
  );
});

export default IconComponent;
