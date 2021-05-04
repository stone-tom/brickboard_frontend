import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useStoreState } from '../../../../context/custom_store';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { backendURL } from '../../../../util/api';
import Icon from '../../../core/components/Icon/Icon';
import { EditButton } from '../../components/Banner/Banner.styles';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import ProfileBar from '../ProfileBar/ProfileBar';
import ProfileNavigation from '../../../core/container/Tab/Tab';
import {
  ProfileCardWrapper,
  Wrapper,
  ProfileInformationWrapper,
  Avatar,
  AvatarWrapper,
  BadgeWrapper,
  SocialNetworkWrapper,
  SocialNetworkLink,
  Username,
  ButtonWrapper,
} from './ProfileInformation.styles';
import ITopic from '../../../../models/ITopic';
import PersonalMovies from '../PersonalMovies/PersonalMovies';
import ICategory from '../../../../models/ICategory';
import { isBlocked } from '../../../../pages/profil/[user_id]';
import Badges from '../Badges/Badges';
import Badge from '../../components/Badge/Badge';
import Settings from '../Settings/Settings';
import IBadge from '../../../../models/IBadge';

interface ProfileCardProps {
  userDetail: IUserDetail,
  user: IUser,
  movies: ITopic[],
  userBadges: IBadge[],
  userMainBadge: IBadge,
  movieCategories: ICategory[],
  onEditAvatar: (shouldDelete?: boolean) => void,
  onUpdateUser: (newUserDetail: IUserDetail) => void,
}

export const getValidLink = (link: string) => {
  if (link.startsWith('www')) return `https://${link}`;
  if (link.startsWith('http')) return link;
  return `https://${link}`;
};

const ProfileInformation = ({
  user,
  userDetail,
  movies,
  movieCategories,
  onEditAvatar,
  onUpdateUser,
  userBadges,
  userMainBadge,
}: ProfileCardProps) => {
  const { isAuthenticated, user: authUser } = useStoreState();
  const profileLinks: {
    link: string,
    icon: IconProp,
  }[] = [{
    link: userDetail.attributes.facebook_url,
    icon: faFacebook,
  },
  {
    link: userDetail.attributes.twitter_url,
    icon: faTwitter,
  },
  {
    link: userDetail.attributes.youtube_url,
    icon: faYoutube,
  },
  {
    link: userDetail.attributes.website_url,
    icon: faGlobe,
  }];
  const contentItems: {
    name: string,
    content: ReactNode,
  }[] = [{
    name: 'Infos',
    content: (
      <PersonalInformation
        onUpdateUserDetail={(newUserDetail) => onUpdateUser(newUserDetail)}
        user={user}
        userDetail={userDetail}
      />
    ),
  },
  {
    name: 'Filme',
    content: (
      <PersonalMovies
        creator={user.attributes.display_name}
        movies={movies}
        movieCategories={movieCategories}
      />
    ),
  },
  {
    name: 'Badges',
    content: (
      <Badges
        user={user}
        userBadges={userBadges}
      />
    ),
  },
  {
    name: 'Einstellungen',
    content: (
      <Settings />
    ),
  }];

  const [activeContent, setActiveContent] = useState<number>(0);
  return (
    <Wrapper>
      <ProfileCardWrapper>
        <AvatarWrapper>
          <Avatar>
            <Image
              layout="fill"
              objectFit="cover"
              alt="Profilbild (von Heroku gelöscht)"
              src={!user.attributes.avatar || isBlocked(authUser, user, userDetail) ? '/assets/images/default_profile.svg' : `${backendURL}${user.attributes.avatar}`}
            />
            {isAuthenticated && user.id === authUser.id && (
              <ButtonWrapper>
                <EditButton
                  reset
                  onClick={() => onEditAvatar()}
                >
                  <Icon icon={faPencilAlt} />
                </EditButton>
                <EditButton
                  reset
                  onClick={() => onEditAvatar(true)}
                >
                  <Icon icon={faTrash} />
                </EditButton>
              </ButtonWrapper>
            )}
          </Avatar>
        </AvatarWrapper>
        <Username>
          {user.attributes.display_name}
        </Username>
        <BadgeWrapper>
          <Badge
            badge={userMainBadge}
          />
        </BadgeWrapper>
        <SocialNetworkWrapper>
          {profileLinks.map((profileLink) => {
            if (profileLink.link && profileLink.link !== '' && profileLink.link !== ' ') {
              return (
                <SocialNetworkLink target="_blank" href={getValidLink(profileLink.link)}>
                  <Icon icon={profileLink.icon} />
                </SocialNetworkLink>
              );
            }
            return null;
          })}
        </SocialNetworkWrapper>
      </ProfileCardWrapper>
      <ProfileInformationWrapper>
        <ProfileBar
          user={user}
          userDetail={userDetail}
        />
        {!isBlocked(authUser, user, userDetail) && (
          <>
            <ProfileNavigation
              tabs={contentItems}
              onContentChange={(index) => setActiveContent(index)}
            />
            {contentItems[activeContent].content}
          </>
        )}
      </ProfileInformationWrapper>
    </Wrapper>
  );
};

export default ProfileInformation;
