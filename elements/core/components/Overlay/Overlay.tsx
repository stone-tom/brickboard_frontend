import React, { ReactNode } from 'react';
import { Overlay } from './Overlay.styles';

const OverlayComponent = ({
  children,
}: { children: ReactNode }) => (
  <Overlay>
    {children}
  </Overlay>
);

export default OverlayComponent;
