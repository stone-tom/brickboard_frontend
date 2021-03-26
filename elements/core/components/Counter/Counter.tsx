import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

interface CounterProps {
  end: number;
}

const Counter = ({ end }: CounterProps) => (

  <CountUp end={end} redraw>
    {({ countUpRef, start }) => (
      <VisibilitySensor onChange={start} delayedCall>
        <span ref={countUpRef} />
      </VisibilitySensor>
    )}
  </CountUp>

);

export default Counter;
