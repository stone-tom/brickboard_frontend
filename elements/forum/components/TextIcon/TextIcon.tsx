import React, { ReactNode } from 'react';
import { TextIconWrapper } from './TextIcon.styles';

interface IconInterface {
  children?: ReactNode,
  text: string,
}

const TextIcon = (({
  children,
  text,
}: IconInterface) => (
  <TextIconWrapper>
    {children}
    <span>{text}</span>
  </TextIconWrapper>

));

export default TextIcon;
