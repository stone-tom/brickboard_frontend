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
  TopicUnreadMarker,
  TopicInfoDetailsItem,
} from './TopicItem.styles';
import Hint from '../../../core/components/Hint/Hint';
import Icon from '../../../core/components/Icon/Icon';
import TextIcon from '../TextIcon/TextIcon';

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

// interface TopicItemProps {
//   id: number;
//   slug: string;
//   type: IconType;
//   title: string;
//   author?: string;
//   lastAuthor?: string;
//   created?: Date;
//   changed?: Date;
//   views?: number | 0;
//   comments?: number | 0;
//   updated?: boolean;
//   sticky?: boolean;
//   locked?: boolean;
//   readstate?: any;
// }

interface TopicItemProps {
  slug: string;
  topic: any;
  readstate?: any;
  author: any;
  lastCommentor: any;
  isAuthenticated?: boolean;
  markUnread?: boolean;
}

const TopicItemComponent = ({
  slug,
  topic,
  author,
  lastCommentor,
  readstate,
  isAuthenticated,
  markUnread,
}: TopicItemProps) => (
  <TopicItem>
    {topic.attributes.title == "Ein Test" && (
      <>
        {console.log("COMPONENT: Topic", topic)}
        {console.log("COMPONENT: READSTATE", readstate)}
        {console.log("COMPONENT: UNREAD?", markUnread)}
        {console.log("COMPONENT: IS AUTHENTICATED?", isAuthenticated)}
      </>
    )}
    {markUnread ? (
      <>
        <TopicUnreadMarker unread />
        <TopicIcon>
          <Hint hint="Ungelesene Beiträge">
            <FontAwesomeIcon icon={whichIcon(IconType.Standard)} />
          </Hint>
        </TopicIcon>
      </>
    ) : (
      <>
        <TopicUnreadMarker />
        <TopicIcon>
          <Hint hint="Keine ungelesenen Beiträge">
            <FontAwesomeIcon icon={whichIcon(IconType.Standard)} />
          </Hint>
        </TopicIcon>
      </>
    )}

    <TopicInfo>
      <div>
        <TopicHeading>
          <Link href={`/forum/${slug}/${topic.id}`}>{`${topic.attributes.title}`}</Link>
        </TopicHeading>
        <p>
          von:
          {` ${author.attributes.display_name}`}
          ,&nbsp;
          <span>{format(new Date(topic.attributes.created_at), 'dd.MM.yyyy, HH:mm')}</span>
        </p>
      </div>
      <TopicInfoDetails>
        {topic.attributes.locked && (
          <p>
            <Hint hint="Gesperrt">
              <Icon icon={faLock} />
            </Hint>
          </p>
        )}
        {topic.attributes.sticky && (
          <TopicInfoDetailsItem>
            <Hint hint="Gepinnt">
              <Icon icon={faMapPin} />
            </Hint>
          </TopicInfoDetailsItem>
        )}
        <TopicInfoDetailsItem>
          <Hint hint="Aufrufe">
            <TextIcon text="420" >
              <Icon icon={faEye} />
            </TextIcon>
          </Hint>
        </TopicInfoDetailsItem>
        <TopicInfoDetailsItem>
          <Hint hint="Antworten">
            <TextIcon text={`${topic.attributes.posts_count - 1}`}>
              <Icon icon={faCommentAlt} />
            </TextIcon>
          </Hint>
        </TopicInfoDetailsItem>
      </TopicInfoDetails>
    </TopicInfo>
    <TopicActivity>
      Letzte Antwort:
      {lastCommentor && (
        <p>
          von:&nbsp;
          {lastCommentor.attributes.display_name}
        </p>
      )}
      <p>{format(new Date(topic.attributes.last_post_at), 'dd.MM.yyyy, HH:mm')}</p>
    </TopicActivity>
  </TopicItem>
);

export default TopicItemComponent;
