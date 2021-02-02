import React, { ReactNode } from 'react';
import { HintSpan } from './Hint.styled';

interface IconInterface {
  children?: ReactNode,
  hint: string,
  direction?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-roght' | 'down-left' | 'down-right',
}

const HintComponent = (({
  children,
  hint,
  direction = 'up',
}: IconInterface) => (
  <HintSpan aria-label={hint} data-balloon-pos={direction}>
    {children}
  </HintSpan>
));

export default HintComponent;
