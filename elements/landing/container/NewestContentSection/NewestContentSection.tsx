import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import ITopic from '../../../../models/ITopic';
import IUser from '../../../../models/IUser';
import {
  ContentLine,
  MemberShipDate,
  NewestContent,
  NewestContentText,
  NewestContentWrapper,
  NewestHeading,
  NewestMemberAvatar,
  NewestMemberInfos,
  NewestMemberWrapper,
  NewestTopicItem,
  NewestTopicMessageboard,
} from './NewestContentSection.styles';
import { backendURL } from '../../../../util/api';
import Badge from '../../../profile/components/Badge/Badge';
import IBadge from '../../../../models/IBadge';
import { MenuLink } from '../../../core/components/MenuLink/MenuLink.styles';
import { Card } from '../../../core/container/MovieCard/MovieCard.styles';
import getYouTubeId from '../../../../util/youtube';
import Like from '../../../forum/components/Like/Like';
import whichIcon from '../../../../util/whichIcon';
import IconComponent from '../../../core/components/Icon/Icon';
import IMessageboard from '../../../../models/IMessageboard';

interface NewestContentProps {
  latestUser: null | IUser,
  latestTopic: null | ITopic,
  badge: null | IBadge,
  latestWriter: null | IUser,
  latestMessageboard: null | IMessageboard,
}

const NewestContentSection = (
  {
    latestUser,
    latestTopic,
    latestWriter,
    latestMessageboard,
    badge,
  }: NewestContentProps,
) => (
  <NewestContentWrapper>
    <NewestContent>
      <NewestHeading>
        Neuestes Mitglied
      </NewestHeading>
      <NewestContentText>
        <NewestMemberWrapper>
          <NewestMemberAvatar>
            <Image
              src={latestUser.attributes.avatar ? `${backendURL}${latestUser.attributes.avatar}` : '/assets/images/default_profile.svg'}
              objectFit="cover"
              layout="fill"
            />
          </NewestMemberAvatar>
          <NewestMemberInfos>
            <h3>{latestUser.attributes.display_name}</h3>
            <MemberShipDate>
              Mitglied seit:&nbsp;
              {format(new Date(latestUser.attributes.created_at), 'dd.MM.yyyy')}
            </MemberShipDate>
            <Badge small badge={badge} owned />
            <Link href={`/profil/${latestUser.id}`} passHref>
              <MenuLink small red>
                Zum Profil
              </MenuLink>
            </Link>
          </NewestMemberInfos>
        </NewestMemberWrapper>
      </NewestContentText>
    </NewestContent>
    <ContentLine />
    <NewestContent>
      <NewestHeading>
        Neuester Beitrag
      </NewestHeading>
      <NewestContentText>
        {latestTopic.attributes.type === 'Thredded::TopicMovie' ? (
          <NewestMemberWrapper>
            <Card
              data-testid="movie_card"
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={latestTopic.attributes.video_url ? `https://img.youtube.com/vi/${getYouTubeId(latestTopic.attributes.video_url)}/0.jpg` : '/assets/images/default_thumbnail.png'}
              />
            </Card>
            <NewestMemberInfos>
              <h3>{latestTopic.attributes.title}</h3>
              <MemberShipDate>
                am:&nbsp;
                {format(new Date(latestTopic.attributes.created_at), 'dd.MM.yyyy')}
              </MemberShipDate>
              <Like like_count={latestTopic.attributes.likes_count} />
              <Link href={`/forum/filmvorstellungen/${latestTopic.id}`} passHref>
                <MenuLink small red>
                  Zum Beitrag
                </MenuLink>
              </Link>
            </NewestMemberInfos>
          </NewestMemberWrapper>
        ) : (
          <NewestMemberWrapper>
            <NewestTopicItem>
              <IconComponent icon={whichIcon(latestTopic.attributes.category)} />
            </NewestTopicItem>
            <NewestMemberInfos>
              <div>
                <h3>{latestTopic.attributes.title}</h3>
                <MemberShipDate>
                  von:&nbsp;
                  {latestWriter.attributes.display_name}
                </MemberShipDate>
              </div>
              <NewestTopicMessageboard>
                <p>
                  in&nbsp;
                  {latestMessageboard.attributes.name}
                </p>
                <p>
                  am&nbsp;
                  {format(new Date(latestTopic.attributes.created_at), 'dd.MM.yyyy')}
                </p>
              </NewestTopicMessageboard>
              <Link href={`/forum/${latestMessageboard.attributes.slug}/${latestTopic.id}`} passHref>
                <MenuLink small red>
                  Zum Beitrag
                </MenuLink>
              </Link>
            </NewestMemberInfos>
          </NewestMemberWrapper>
        )}

      </NewestContentText>
    </NewestContent>
  </NewestContentWrapper>
);

export default NewestContentSection;
