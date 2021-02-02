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

  return (
    <AccordionWrapper>
      <AccordionHeader
        icon={toggleIcon !== undefined}
        open={open}
        onClick={toggleIcon !== undefined ? null : () => setOpen(!open)}
      >
        {header}
        {toggleIcon && (
          <ToggleButton
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

export default Accordion;
