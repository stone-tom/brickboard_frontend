import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { AnchorHTMLAttributes } from 'react';
import Icon from '../Icon/Icon';
import { ExternalLink } from './ExternalLink.styles';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean,
  gray?: boolean,
  small?: boolean,
  reset?: boolean,
  icon?: IconProp,
}

const ExternalLinkComponent = ({
  children,
  disabled,
  target = 'blank',
  icon,
  ...rest
}: ExternalLinkProps) => (
  <ExternalLink
    icon={icon !== undefined}
    target={target}
    disabled={disabled}
    {...rest}
  >
    {icon && (
      <Icon icon={icon} />
    )}
    {children}
  </ExternalLink>
);

export default ExternalLinkComponent;
