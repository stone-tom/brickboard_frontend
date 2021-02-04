import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faGlobe, faRibbon } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { backendURL } from '../../../../util/api';
import Icon from '../../../core/components/Icon/Icon';
import { EditButton } from '../../components/Banner/Banner.styles';
import {
  ProfileCardWrapper,
  Wrapper,
  ProfileInformationWrapper,
  Avatar,
  AvatarWrapper,
  BadgeWrapper,
  Badge,
  BadgeTitle,
  SocialNetworkWrapper,
  SocialNetworkLink,
} from './ProfileInformation.styles';

interface ProfileCardProps {
  userDetail: IUserDetail,
  user: IUser,
  onEditAvatar: () => void,
}

const ProfileInformation = ({
  user,
  userDetail,
  onEditAvatar,
}: ProfileCardProps) => {
  const { isAuthenticated, user: authUser } = useStoreState();

  return (
    <Wrapper>
      <ProfileCardWrapper>
        <AvatarWrapper>
          <Avatar>
            <Image
              layout="fill"
              objectFit="cover"
              alt="Profilbild"
              src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_avatar.jpg'}
            />
            {isAuthenticated && user.id === authUser.id && (
              <EditButton
                reset
                onClick={() => onEditAvatar()}
              >
                <Icon icon={faEdit} />
              </EditButton>
            )}
          </Avatar>
        </AvatarWrapper>
        <BadgeWrapper>
          <Badge icon={faRibbon} />
          <BadgeTitle>Alter Hase</BadgeTitle>
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
        INFORMATION
      </ProfileInformationWrapper>
    </Wrapper>
  );
};

export default ProfileInformation;
