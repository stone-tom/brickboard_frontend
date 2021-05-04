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
  owned?: boolean,
  active?: boolean,
  small?: boolean,
  onClick?: () => void,
}

const Badge = ({
  badge,
  owned,
  active,
  small,
  onClick,
}: BadgeProps) => (
  <Hint hint={badge ? badge.attributes.description : 'Dieser Benutzer hat noch kein Badge'}>
    <Wrapper>
      <BadgeWrapper
        owned={owned}
        active={active}
        onClick={owned ? onClick : null}
      >
        <Image
          height={small ? '60px' : '120px'}
          width={small ? '60px' : '120px'}
          alt={badge ? badge.attributes.title : 'Default Badge'}
          src={!badge ? '/assets/images/default_badge.svg' : `${backendURL}${badge.attributes.badge_icon}`}
        />
      </BadgeWrapper>
      {badge ? badge.attributes.title : 'Badgelos'}
    </Wrapper>
  </Hint>
);

export default Badge;
