import React, { ReactNode } from 'react';
import Switch from 'react-switch';
import { Label, SwitchWrapper } from './Switch.styles';

interface SwitchProps {
  onChange: (checked: boolean) => void,
  checked: boolean,
  children: ReactNode,
}

const SwitchComponent = ({
  onChange,
  checked,
  children,
}: SwitchProps) => (
  /* eslint-disable jsx-a11y/label-has-associated-control */
  <Label>
    {children ? `${children}:` : null}
    <SwitchWrapper>
      <Switch
        onChange={onChange}
        checked={checked}
      />
    </SwitchWrapper>
  </Label>
);
/* eslint-enable jsx-a11y/label-has-associated-control */

export default SwitchComponent;
