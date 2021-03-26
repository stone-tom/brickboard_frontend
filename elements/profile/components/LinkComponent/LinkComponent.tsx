import React from 'react';
import { FormInput } from '../../../core/components/FormInput/FormInput.styles';
import Icon from '../../../core/components/Icon/Icon';
import { MappingComponentProps } from '../../container/ProfileMapper/ProfileMapper';
import {
  LinkComponentWrapper,
  Title,
  Link,
  IconWrapper,
} from './LinkComponent.styles';

const LinkComponent = ({
  title,
  value,
  icon,
  onChange,
  isEditing,
}: MappingComponentProps) => (
  <LinkComponentWrapper>
    {icon ? (
      <IconWrapper>
        <Icon icon={icon} />
      </IconWrapper>
    )
      : (
        <Title>
          {title}
        </Title>
      )}
    {isEditing ? (
      <FormInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
      : (
        <Link empty={value === ''} href={value === '' ? null : `https://${value}`}>
          {value === '' ? '' : value}
        </Link>
      )}
  </LinkComponentWrapper>
);

export default LinkComponent;
