import React from 'react';
import Icon from '../../../core/components/Icon/Icon';
import { MappingComponentProps } from '../../container/ProfileMapper/ProfileMapper';
import {
  LinkComponentWrapper,
  Value,
  Link,
} from './LinkComponent.styles';

const LinkComponent = ({
  title,
  value,
  icon,
}: MappingComponentProps) => (
  <LinkComponentWrapper>
    {icon ? (
      <Icon icon={icon} />
    )
      : (
        <Value>
          {title}
        </Value>
      )}
    <Link href={value}>
      {value}
    </Link>
  </LinkComponentWrapper>
);

export default LinkComponent;
