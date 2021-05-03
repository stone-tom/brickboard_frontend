import Image from 'next/image';
import React from 'react';
import IBadge from '../../../../models/IBadge';
import { backendURL } from '../../../../util/api';
import Hint from '../../../core/components/Hint/Hint';
import {
  BadgeWrapper,
  Wrapper,
} from './Badge.styles';

interface BadgeProps {
  badge: IBadge,
  unowned?: boolean,
  active?: boolean,
  onClick: () => void,
}

const Badge = ({
  badge,
  unowned,
  active,
  onClick,
}: BadgeProps) => (
  <Hint hint={badge.attributes.description}>
    <Wrapper>
      <BadgeWrapper
        unowned={unowned}
        active={active}
        onClick={unowned ? onClick : null}
      >
        <Image
          height="120px"
          width="120px"
          alt={badge.attributes.title}
          src={!badge.attributes.badge_icon ? '/assets/images/default_badge.svg' : `${backendURL}${badge.attributes.badge_icon}`}
        />
      </BadgeWrapper>
      {badge.attributes.title}
    </Wrapper>
  </Hint>
);

export default Badge;
