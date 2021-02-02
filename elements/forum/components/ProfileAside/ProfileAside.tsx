import React from 'react';
import Image from 'next/image';
import { ProfileAside, ProfileAsideHeading, ProfileCondensedInfo } from './ProfileAside.style';

interface ProfileAsideProps {
  author?: string;
  // authorRegistered?: Date;
  authorProfilePic?: string;
  postsCount?: number;
  // authorBadge?: string;
  authorCity?: string;
}

const ProfileAsideComponent = ({
  author = 'Not defined',
  postsCount = 1,
  authorProfilePic = '/assets/images/501.jpg',
  authorCity = 'Legoland',
}: ProfileAsideProps) => (
  <ProfileAside>
    <ProfileCondensedInfo>
      <div
        style={{
          position: 'relative',
          maxHeight: '200px',
          maxWidth: '200px',
        }}
      >
        <Image quality={100} src={authorProfilePic} alt="Profilbild" layout="fill" />
      </div>
    </ProfileCondensedInfo>

    <ProfileAsideHeading>{author}</ProfileAsideHeading>
    <div>
      <p>
        Beiträge:
        {postsCount}
      </p>
      <p>
        Aus:
        {authorCity}
      </p>
    </div>
  </ProfileAside>
);

export default ProfileAsideComponent;
