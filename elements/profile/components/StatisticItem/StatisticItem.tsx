import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import Counter from '../../../core/components/Counter/Counter';
import Icon from '../../../core/components/Icon/Icon';
import {
  StatisticItemWrapper,
  Value,
  Text,
} from './StatisticItem.styles';

interface StatisticItemProps {
  icon: IconProp,
  value: number,
  text: string
}

const StatisticItem = ({
  icon,
  text,
  value,
}: StatisticItemProps) => (
  <StatisticItemWrapper>
    <Icon icon={icon} />
    <Value>
      <Counter end={value} />
    </Value>
    <Text>
      {text}
    </Text>
  </StatisticItemWrapper>
);

export default StatisticItem;
