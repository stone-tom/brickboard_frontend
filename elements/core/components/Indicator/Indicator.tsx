import React from 'react';
import { Wrapper, Dot } from './Indicator.styles';

interface IndicatorProps {
  text: string,
  color: string,
}

const Indicator = ({
  color,
  text,
}: IndicatorProps) => (
  <Wrapper>
    <Dot color={color} />
    {text}
  </Wrapper>
);

export default Indicator;
