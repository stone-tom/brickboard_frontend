import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faCertificate,
  faGlobe,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
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
import StateManager from 'react-select';

interface ProfileCardProps {
  userDetail: IUserDetail,
  user: IUser,
  movies: ITopic[],
  movieCategories: ICategory[],
  onEditAvatar: (shouldDelete?: boolean) => void,
  onUpdateUser: (newUserDetail: IUserDetail) => void,
}

const ProfileInformation = ({
  user,
  userDetail,
  movies,
  movieCategories,
  onEditAvatar,
  onUpdateUser,
}: ProfileCardProps) => {
  const { isAuthenticated, user: authUser, badge } = useStoreState();
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
      <Badges />
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
            badge={badge}
          />
        </BadgeWrapper>
        <SocialNetworkWrapper>
          <SocialNetworkLink href={userDetail.attributes.facebook_url}>
            <Icon icon={faFacebook} />
          </SocialNetworkLink>
          <SocialNetworkLink href={userDetail.attributes.twitter_url}>
            <Icon icon={faTwitter} />
          </SocialNetworkLink>
          <SocialNetworkLink href={userDetail.attributes.youtube_url}>
            <Icon icon={faYoutube} />
          </SocialNetworkLink>
          <SocialNetworkLink href={userDetail.attributes.website_url}>
            <Icon icon={faGlobe} />
          </SocialNetworkLink>
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
