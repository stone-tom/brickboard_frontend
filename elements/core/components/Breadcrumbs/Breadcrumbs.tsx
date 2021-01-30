import Link from 'next/link';
import React from 'react';
import { BreadcrumbsWrapper } from './Breadcrumbs.styles';

interface CrumbsProps {
  slug: string;
  id?: number;
  topic?: string;
}

const Breadcrumbsbar = ({ slug, id, topic }: CrumbsProps) => (
  <BreadcrumbsWrapper>
    <li key="forumlink">
      <Link href="/forum">Forum</Link>
      {' '}
      {'>'}
    </li>
    <li key="topiclink">
      <Link href={`/forum/${slug}`}>{slug}</Link>
    </li>
    {id ? (
      <li key="postlink">
        {'>'}
        <Link href={`/forum/${slug}/topics/${id}`}>
          <strong>{topic}</strong>
        </Link>
      </li>
    ) : (
      ''
    )}
  </BreadcrumbsWrapper>
);

export default Breadcrumbsbar;
