import React, { ReactNode } from 'react';
import ReactTooltip from 'react-tooltip';

interface HintProps {
  children: ReactNode,
  hint: string,
  type?: 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light',
  place?: 'top' | 'right' | 'bottom' | 'left',
  effect?: 'float' | 'solid',
}

const Hint = (({
  children,
  hint,
  place = 'top',
  type = 'dark',
  effect = 'float',
  ...rest
}: HintProps) => (
  <>
    <p data-tip={hint} aria-label={hint}>
      {children}
    </p>
    <ReactTooltip place={place} type={type} effect={effect} {...rest} />
  </>
));

export default Hint;
