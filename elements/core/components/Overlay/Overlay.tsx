import React from 'react';
import { Overlay } from './Overlay.styles';

const OverlayComponent = ({ children }) => (
  <Overlay>
    {children}
  </Overlay>
);

export default OverlayComponent;
