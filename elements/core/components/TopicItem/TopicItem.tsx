import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faCommentAlt,
  faAlignJustify,
  faQuestion,
  faExclamation,
  faMapPin,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import {
  TopicItem,
  TopicHeading,
  TopicIcon,
  TopicInfo,
  TopicInfoDetails,
  TopicActivity,
} from './TopicItem.styles';

enum IconType {
  Standard,
  Question,
  Announcement,
}
function whichIcon(type: IconType): IconProp {
  switch (type) {
    case IconType.Standard:
      return faAlignJustify;
    case IconType.Question:
      return faQuestion;
    case IconType.Announcement:
      return faExclamation;
    default:
      return faAlignJustify;
  }
}

interface TopicItemProps {
  id: number;
  slug: string;
  type: IconType;
  title: string;
  author?: string;
  lastAuthor?: string;
  created?: Date;
  changed?: Date;
  views?: number | 0;
  comments?: number | 0;
  updated?: boolean;
  sticky?: boolean;
  locked?: boolean;
}

const TopicItemComponent = ({
  id,
  slug,
  type,
  title,
  author = 'Not defined',
  lastAuthor,
  created,
  changed,
  views,
  comments,
  updated,
  sticky,
  locked,
}: TopicItemProps) => (
  <TopicItem updated={updated}>
    <TopicIcon>
      <FontAwesomeIcon icon={whichIcon(type)} />
    </TopicIcon>
    <TopicInfo>
      <div>
        <TopicHeading updated={updated}>
          <Link href={`/forum/${slug}/${id}`}>{`${title}`}</Link>
        </TopicHeading>
        <p>
          von:
          {` ${author}`}
          ,&nbsp;
          <span>{format(new Date(created), 'dd.MM.yyyy, HH:mm')}</span>
        </p>
      </div>
      <TopicInfoDetails>
        {locked && (
          <p>
            <span aria-label="Gesperrt" data-balloon-pos="down">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </p>
        )}
        {sticky && (
          <p>
            <span aria-label="Gepinnt" data-balloon-pos="down">
              <FontAwesomeIcon icon={faMapPin} />
            </span>
          </p>
        )}
        <p>
          <span aria-label="Aufrufe" data-balloon-pos="down">
            <FontAwesomeIcon icon={faEye} />
          </span>
          {views}
        </p>
        <p>
          <span aria-label="Antworten" data-balloon-pos="down">
            <FontAwesomeIcon icon={faCommentAlt} />
          </span>
          {comments}
        </p>
      </TopicInfoDetails>
    </TopicInfo>
    <TopicActivity>
      Letzte Antwort:
      {lastAuthor && (
        <p>
          von
          {lastAuthor}
        </p>
      )}
      <p>{format(new Date(changed), 'dd.MM.yyyy, HH:mm')}</p>
    </TopicActivity>
  </TopicItem>
);

export default TopicItemComponent;
