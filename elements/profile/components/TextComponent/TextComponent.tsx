import React from 'react';
import { FormInput } from '../../../core/components/FormInput/FormInput.styles';
import Icon from '../../../core/components/Icon/Icon';
import { MappingComponentProps } from '../../container/ProfileMapper/ProfileMapper';
import {
  TextComponentWrapper,
  Title,
  Value,
  IconWrapper,
} from './TextComponent.styles';

const TextComponent = ({
  title,
  value,
  icon,
  isEditing,
  onChange,
  formatter,
  placeholder,
}: MappingComponentProps) => (
  <TextComponentWrapper>
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
        value={value === '-' ? '' : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )
      : (
        <Value>
          {formatter
            ? formatter(value)
            : value}
        </Value>
      )}
  </TextComponentWrapper>
);

export default TextComponent;
