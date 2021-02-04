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
import ITopic from '../../../../models/ITopic';
import IUser from '../../../../models/IUser';

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
  topic: ITopic;
  author: IUser;
  lastCommentor: IUser;
  markUnread?: boolean;
  isAuthenticated?: boolean;
}

const TopicItemComponent = ({
  slug,
  topic,
  author,
  lastCommentor,
  markUnread,
  isAuthenticated,
}: TopicItemProps) => {
  const isBlocked = topic.attributes.moderation_state === 'blocked';
  return (
    <TopicItem blocked={isBlocked}>

      <TopicUnreadMarker unread={markUnread && isAuthenticated} />
      <TopicIcon>
        <Hint hint={markUnread && isAuthenticated ? 'Ungelesene Beiträge' : 'Keine ungelesenen Beiträge'}>
          <FontAwesomeIcon icon={whichIcon(IconType.Standard)} />
        </Hint>
      </TopicIcon>

      <TopicInfo>
        <div>
          <TopicHeading>
            {isBlocked ? (
              <>
                {`BLOCKIERT: ${topic.attributes.title}`}
              </>
            )
              : (
                <Link href={`/forum/${slug}/${topic.id}`}>{`${topic.attributes.title}`}</Link>
              )}
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
            <TopicInfoDetailsItem>
              <Hint hint="Gesperrt">
                <Icon icon={faLock} />
              </Hint>
            </TopicInfoDetailsItem>
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
              <TextIcon text={topic.attributes.view_count.toString()}>
                <Icon icon={faEye} />
              </TextIcon>
            </Hint>
          </TopicInfoDetailsItem>
          <TopicInfoDetailsItem>
            <Hint hint="Antworten">
              <TextIcon text={`${topic.attributes.posts_count}`}>
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
};
export default TopicItemComponent;
