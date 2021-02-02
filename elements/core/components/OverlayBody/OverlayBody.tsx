import React, { ReactNode } from 'react';
import { OverlayBody } from './OverlayBody.styles';

const OverlayBodyComponent = ({
  children,
}: { children: ReactNode }) => (
  <OverlayBody>
    {children}
  </OverlayBody>
);

export default OverlayBodyComponent;
