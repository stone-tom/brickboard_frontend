import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ButtonHTMLAttributes } from 'react';
import Icon from '../Icon/Icon';
import { Button } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean,
  gray?: boolean,
  small?: boolean,
  reset?: boolean,
  icon?: IconProp,
  iconRight?: boolean,
}

const ButtonComponent = ({
  children,
  disabled,
  type = 'button',
  icon,
  iconRight,
  ...rest
}: ButtonProps) => (
  <Button
    icon={icon !== undefined}
    type={type}
    iconRight={iconRight}
    disabled={disabled}
    {...rest}
  >
    {icon && (
      <Icon icon={icon} />
    )}
    {children}
  </Button>
);

export default ButtonComponent;
