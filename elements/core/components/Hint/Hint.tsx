import React, { ReactNode } from 'react';
import ReactTooltip from 'react-tooltip';
import { nanoid } from 'nanoid';

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
}: HintProps) => {
  const id = nanoid();
  return (
    <>
      <p data-tip={hint} aria-label={hint} data-for={id}>
        <>
          {children}
        </>
        <ReactTooltip place={place} type={type} effect={effect} {...rest} id={id} />
      </p>
    </>
  );
});

export default Hint;
