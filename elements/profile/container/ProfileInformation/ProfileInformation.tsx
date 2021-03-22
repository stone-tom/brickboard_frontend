import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCertificate, faGlobe, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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
  Badge,
  BadgeTitle,
  SocialNetworkWrapper,
  SocialNetworkLink,
  Username,
} from './ProfileInformation.styles';

interface ProfileCardProps {
  userDetail: IUserDetail,
  user: IUser,
  onEditAvatar: () => void,
  onUpdateUser: (newUserDetail: IUserDetail) => void,
}

const ProfileInformation = ({
  user,
  userDetail,
  onEditAvatar,
  onUpdateUser,
}: ProfileCardProps) => {
  const { isAuthenticated, user: authUser } = useStoreState();

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
      <p>Hier könnten ihre Filme stehen</p>
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
              src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_profile.svg'}
            />
            {isAuthenticated && user.id === authUser.id && (
              <EditButton
                reset
                onClick={() => onEditAvatar()}
              >
                <Icon icon={faPencilAlt} />
              </EditButton>
            )}
          </Avatar>
        </AvatarWrapper>
        <Username>
          {user.attributes.display_name}
        </Username>
        <BadgeWrapper>
          <Badge icon={faCertificate} />
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
        <ProfileBar
          user={user}
          userDetail={userDetail}
        />
        <ProfileNavigation
          tabs={contentItems}
          onContentChange={(index) => setActiveContent(index)}
        />
        {contentItems[activeContent].content}
      </ProfileInformationWrapper>
    </Wrapper>
  );
};

export default ProfileInformation;
