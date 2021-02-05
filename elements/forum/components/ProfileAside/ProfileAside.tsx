import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  ProfileAside,
  ProfileAsideFact,
  ProfileAsideHeading,
  ProfileCondensedInfo,
  ProfileImageWrapper,
} from './ProfileAside.style';
import IUser from '../../../../models/IUser';

interface ProfileAsideProps {
  author?: IUser;
  // authorRegistered?: Date;
  // postsCount?: number;
  // authorBadge?: string;
  // authorCity?: string;
}

const ProfileAsideComponent = ({
  author,
}: ProfileAsideProps) => (
  <ProfileAside>
    <ProfileCondensedInfo>
      <ProfileImageWrapper>
        <Image
          quality={100}
          src={author.attributes.avatar ? author.attributes.avatar : '/assets/images/default_profile.svg'}
          alt="Profilbild (von Heroku gelöscht)"
          layout="fill"
        />
      </ProfileImageWrapper>
    </ProfileCondensedInfo>
    <Link href={`/profil/${author.id}`} passHref>
      <ProfileAsideHeading>
        {author.attributes.display_name}
      </ProfileAsideHeading>
    </Link>
    <div>
      <ProfileAsideFact>
        Mitglied seit:
        <br />
        {format(new Date(author.attributes.created_at), 'dd.MM.yyyy')}
      </ProfileAsideFact>
    </div>
  </ProfileAside>
);

export default ProfileAsideComponent;
