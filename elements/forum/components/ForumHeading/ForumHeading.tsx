import React from 'react';
import { ForumHeading } from './ForumHeading.styles';

interface ForumHeadingProps {
    title: string;
  }

const ForumHeadingComponent = ({ title }:ForumHeadingProps) => (
  <>
    <ForumHeading>
      {title}
    </ForumHeading>
  </>
);

export default ForumHeadingComponent;
