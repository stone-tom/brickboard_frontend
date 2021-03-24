import React from 'react';
import {
  TagWrapper,
} from './Tag.styles';

interface TagProps {
  name: string
  icon?: string,
}

const Tag = ({
  name,
  icon,
}: TagProps) => (
  <TagWrapper data-testid="tag">
    {icon ? <div dangerouslySetInnerHTML={{ __html: icon }} /> : name}
  </TagWrapper>
);

export default Tag;
