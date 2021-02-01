import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ButtonHTMLAttributes } from 'react';
import Icon from '../Icon/Icon';
import { Button } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes < HTMLButtonElement > {
  disabled?: boolean,
  gray?: boolean,
  small?: boolean,
  reset?: boolean,
  icon?: IconProp,
}

const ButtonComponent = ({
  children,
  disabled,
  type = 'button',
  icon,
  ...rest
}: ButtonProps) => (
  <Button
    icon={icon !== undefined}
    type={type}
    disabled={disabled}
    {...rest}
  >
    {icon && (
      <Icon icon={icon}/>
    )}
    { children}
  </Button>
);

export default ButtonComponent;