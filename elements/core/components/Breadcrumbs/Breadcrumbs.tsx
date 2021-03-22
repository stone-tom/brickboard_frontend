import React from 'react';
import ColoredNextLink from '../ColoredNextLink/ColoredNextLink';
import { BreadcrumbsWrapper } from './Breadcrumbs.styles';

interface CrumbsProps {
  slug: string;
  messageboardname?: string;
  id?: number | string;
  topic?: string;
}

const Breadcrumbsbar = ({
  slug,
  id,
  topic,
  messageboardname,
}: CrumbsProps) => (
  <BreadcrumbsWrapper>
    <li key="forumlink">
      <ColoredNextLink href="/forum" text="Forum" />
      {' > '}
    </li>
    <li key="topiclink">
      &nbsp;
      <ColoredNextLink href={`/forum/${slug}`} text={`${!messageboardname ? slug : messageboardname}`} />
    </li>
    {id ? (
      <li key="postlink">
        &nbsp;
        {' > '}
        <strong>{topic}</strong>
      </li>
    ) : (
      ''
    )}
  </BreadcrumbsWrapper>
);

export default Breadcrumbsbar;
