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
import { backendURL } from '../../../../util/api';
import IBadge from '../../../../models/IBadge';
import Badge from '../../../profile/components/Badge/Badge';

interface ProfileAsideProps {
  author?: IUser,
  badge?: IBadge | null,
}

const ProfileAsideComponent = ({
  author,
  badge,
}: ProfileAsideProps) => (
  <ProfileAside>
    <ProfileCondensedInfo>
      <ProfileImageWrapper>
        <Image
          quality={100}
          src={author.attributes.avatar ? `${backendURL}${author.attributes.avatar}` : '/assets/images/default_profile.svg'}
          alt="Profilbild (von Heroku gelöscht)"
          layout="fill"
          objectFit="cover"
        />
      </ProfileImageWrapper>
    </ProfileCondensedInfo>
    <Link href={`/profil/${author.id}`} passHref>
      <ProfileAsideHeading>
        {author.attributes.display_name}
      </ProfileAsideHeading>
    </Link>
    <div>
      {author.attributes.admin
        && <ProfileAsideFact>Administrator</ProfileAsideFact>}
      <ProfileAsideFact>
        <Badge small badge={badge} />
      </ProfileAsideFact>
      <ProfileAsideFact>
        Mitglied seit:
        <br />
        {format(new Date(author.attributes.created_at), 'dd.MM.yyyy')}
      </ProfileAsideFact>
    </div>
  </ProfileAside>
);

export default ProfileAsideComponent;
