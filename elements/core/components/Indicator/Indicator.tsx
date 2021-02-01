import React from 'react';
import { Wrapper, Dot } from './Indicator.styles';

interface RoleProps {
  text: string,
  color: string,
}

const Indicator = ({
  color,
  text,
}: RoleProps) => (
  <Wrapper>
    <Dot color={color} />
    {text}
  </Wrapper>
);

export default Indicator;
