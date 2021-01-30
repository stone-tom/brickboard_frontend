import React from 'react';
import { faClipboardList, faUserClock } from '@fortawesome/free-solid-svg-icons';

import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import {
  ForumItem,
  ForumHeading,
  ForumItemDetails,
  ForumInfo,
  ForumItemImageContainer,
  ForumItemContent,
  ForumInfoWrapper,
  LastPostHeading,
} from './ForumItem.styles';
import SmallInfo from '../../../core/components/SmallInfo/SmallInfo';

interface ForumItemProps {
  title: string;
  description?: string;
  lastTopicDate?: Date;
  lastTopicTitle?: string;
  lastAuthor?: string;
  topics?: number | 0;
  slug: string;
}

const PostItemComponent = ({
  title,
  description,
  topics = 1,
  lastTopicDate,
  lastTopicTitle,
  lastAuthor,
  slug = 'brickfilme-im-allgemeinen',
}: ForumItemProps) => (
  <>
    <ForumItem>
      <ForumItemImageContainer>
        {' '}
        <Image
          src="/assets/images/redbrick.jpg"
          width="200"
          height="200"
          alt="Red Brick"
        />
      </ForumItemImageContainer>

      <ForumItemContent>
        <div>
          <ForumHeading>
            <Link href={`/forum/${slug}`}>{title}</Link>
          </ForumHeading>
          <p>{description}</p>
        </div>
      </ForumItemContent>

      <ForumInfoWrapper>
        <ForumItemDetails>
          <SmallInfo title="Beiträge" value={topics} icon={faClipboardList} />
          {lastTopicDate && <SmallInfo title="Letzte Aktivität" value={format(lastTopicDate, 'dd.MM.yyyy, HH:mm ')} icon={faUserClock} />}
        </ForumItemDetails>
        <ForumInfo>
          <LastPostHeading>Letzter Post</LastPostHeading>
          {lastTopicTitle && <p>{lastTopicTitle}</p>}
          {lastAuthor && (
          <p>
            von:
            {` ${lastAuthor}`}
          </p>
          )}
        </ForumInfo>
      </ForumInfoWrapper>
    </ForumItem>
  </>
);

export default PostItemComponent;
