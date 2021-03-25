import Image from 'next/image';
import React from 'react';
import {
  TagWrapper,
  IconWrapper,
} from './Tag.styles';

interface TagProps {
  name: string
  icon?: string,
}
/* eslint-disable react/no-danger */
const Tag = ({
  name,
  icon,
}: TagProps) => (
  <TagWrapper data-testid="tag">
    {icon ? (
      <IconWrapper>
        <Image data-testid="tag_icon" src={icon} layout="fill" />
      </IconWrapper>
    ) : name}
  </TagWrapper>
);
/* eslint-enable react/no-danger */

export default Tag;
