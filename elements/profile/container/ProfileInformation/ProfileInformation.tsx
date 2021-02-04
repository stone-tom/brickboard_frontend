import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faRibbon } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { backendURL } from '../../../../util/api';
import ButtonComponent from '../../../core/components/Button/Button';
import Icon from '../../../core/components/Icon/Icon';
import { Overlay } from '../../../core/components/Overlay/Overlay.styles';
import { OverlayBody } from '../../../core/components/OverlayBody/OverlayBody.styles';
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
}

const ProfileInformation = ({
  user,
  userDetail,
}: ProfileCardProps) => {
  const { addComponent, removeComponent } = useStoreDispatch();

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
      <ButtonComponent
        onClick={() => addComponent((
          <Overlay>
            <OverlayBody>
              <button type="button" onClick={() => removeComponent()}>REMOVE</button>
            </OverlayBody>
          </Overlay>
        ))}
      >
        Test
      </ButtonComponent>
    </Wrapper>
  );
};

export default ProfileInformation;
