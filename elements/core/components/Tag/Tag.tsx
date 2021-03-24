import Image from 'next/image';
import React from 'react';
import {
  TagWrapper,
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
      <Image data-testid="tag_icon" src={icon} width="18px" height="18px" />
    ) : name}
  </TagWrapper>
);
/* eslint-enable react/no-danger */

export default Tag;
