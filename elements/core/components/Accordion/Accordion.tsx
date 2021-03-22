import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ReactNode, useState } from 'react';
import {
  AccordionWrapper,
  AccordionHeader,
  AccordionBody,
  ToggleButton,
  ToggleIcon,
} from './Accordion.styles';

interface AccordionProps {
  children: ReactNode,
  header: ReactNode,
  toggleIcon?: IconProp,
}

const Accordion = ({ children, header, toggleIcon }: AccordionProps) => {
  const [open, setOpen] = useState<boolean>(false);
  /* eslint-disable no-confusing-arrow */
  return (
    <AccordionWrapper role="tab">
      <AccordionHeader
        icon={toggleIcon !== undefined}
        open={open}
        onClick={(e) => e.target.type === 'button' ? undefined : setOpen(!open)}
      >
        {header}
        {toggleIcon && (
          <ToggleButton
            data-testid="toggle_accordion"
            open={open}
            reset
            onClick={() => setOpen(!open)}
          >
            <ToggleIcon icon={toggleIcon} />
          </ToggleButton>
        )}
      </AccordionHeader>
      <AccordionBody
        open={open}
      >
        {open && children}
      </AccordionBody>
    </AccordionWrapper>
  );
};
  /* eslint-enable no-confusing-arrow */
export default Accordion;
