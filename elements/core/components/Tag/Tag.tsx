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
    {icon ? <div dangerouslySetInnerHTML={{ __html: icon }} /> : name}
  </TagWrapper>
);
/* eslint-enable react/no-danger */

export default Tag;
