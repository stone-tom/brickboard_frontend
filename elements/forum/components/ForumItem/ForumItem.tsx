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
  ForumIconWrapper,
} from './ForumItem.styles';
import ITopic from '../../../../models/ITopic';
import IUser from '../../../../models/IUser';
import Hint from '../../../core/components/Hint/Hint';
import Icon from '../../../core/components/Icon/Icon';
import TextIcon from '../TextIcon/TextIcon';
import IMessageboard from '../../../../models/IMessageboard';

interface ForumItemProps {
  messageboard: IMessageboard;
  lastTopic?: ITopic;
  lastAuthor?: IUser;
  slug: string;
}

const PostItemComponent = ({
  messageboard,
  lastTopic,
  lastAuthor,
  slug,
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
            <Link href={`/forum/${slug}`}>{messageboard.attributes.name}</Link>
          </ForumHeading>
          <p>{messageboard.attributes.description}</p>
        </div>
      </ForumItemContent>

      <ForumInfoWrapper>
        <ForumItemDetails>
          <ForumIconWrapper>
            <Hint hint="Beiträge">
              <TextIcon text={messageboard.attributes.topics_count.toString()}>
                <Icon icon={faClipboardList} />
              </TextIcon>
            </Hint>
          </ForumIconWrapper>
          <ForumIconWrapper>
            <Hint hint="Letzte Aktivität">
              <TextIcon text={lastTopic
                ? format(new Date(lastTopic.attributes.last_post_at), 'dd.MM.yyyy, HH:mm ')
                : 'Nichts Aktuelles'}
              >
                <Icon icon={faUserClock} />
              </TextIcon>
            </Hint>
          </ForumIconWrapper>
        </ForumItemDetails>
        <ForumInfo>
          <LastPostHeading>Letzter Post</LastPostHeading>
          {lastTopic ? (
            <>
              <Link href={`/forum/${slug}/${lastTopic.id}`}>{lastTopic.attributes.title}</Link>
              {lastAuthor && (
                <p>
                  von:
                  <Link href={`/profil/${lastAuthor.id}`}>{` ${lastAuthor.attributes.display_name}`}</Link>
                </p>
              )}
            </>
          )
            : (
              'Es gibt noch keine Themen.'
            )}
        </ForumInfo>
      </ForumInfoWrapper>
    </ForumItem>
  </>
);

export default PostItemComponent;
