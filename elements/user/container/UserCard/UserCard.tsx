import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { backendURL } from '../../../../util/api';
import {
  UserCardWrapper,
  Name,
} from './UserCard.styles';

interface UserCardProps {
  name: string,
  imageUrl: string,
  id: string,
}

const UserCard = ({
  name,
  imageUrl,
  id,
}: UserCardProps) => (
  <Link href={`/profil/${id}`}>
    <UserCardWrapper>
      <Image
        layout="fill"
        objectFit="cover"
        src={imageUrl ? `${backendURL}${imageUrl}` : '/assets/images/default_profile.svg'}
      />
      <Name>
        {name}
      </Name>
    </UserCardWrapper>
  </Link>
);

export default UserCard;
