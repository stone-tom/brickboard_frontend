import React from 'react';
import { FormInput } from '../../../core/components/FormInput/FormInput.styles';
import Icon from '../../../core/components/Icon/Icon';
import { MappingComponentProps } from '../../container/ProfileMapper/ProfileMapper';
import {
  TextComponentWrapper,
  Title,
  Value,
} from './TextComponent.styles';

const TextComponent = ({
  title,
  value,
  icon,
  isEditing,
  onChange,
}: MappingComponentProps) => (
  <TextComponentWrapper>
    {icon ? (
      <Icon icon={icon} />
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
        <Value>
          {value}
        </Value>
      )}
  </TextComponentWrapper>
);

export default TextComponent;
