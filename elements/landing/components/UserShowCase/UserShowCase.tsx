import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IBadge from '../../../../models/IBadge';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { backendURL } from '../../../../util/api';
import Badge from '../../../profile/components/Badge/Badge';
import {
  MemberShipTimer,
  UserDetails,
  UserDetailsInfos,
  UserNameWrapper,
  UserShowCaseImageWrapper,
  UserShowCaseWrapper,
} from './UserShowCase.styles';

interface UserShowCaseProps {
  user: IUser,
  userDetails?: IUserDetail,
  badge?: IBadge,
}

const UserShowCase = ({ user, userDetails, badge }: UserShowCaseProps) => (
  <Link href={`/profil/${user.id}`} passHref>
    <UserShowCaseWrapper>
      <UserShowCaseImageWrapper>
        <Image
          src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_profile.svg'}
          layout="fill"
          objectFit="cover"
        />
      </UserShowCaseImageWrapper>

      <UserDetails>
        <div>
          <UserNameWrapper>
            <strong>{user.attributes.display_name}</strong>
          </UserNameWrapper>
          <MemberShipTimer>
            Mitglied seit:
            {format(new Date(user.attributes.created_at), 'dd.MM.yyyy')}
          </MemberShipTimer>
        </div>
        <UserDetailsInfos>
          <Badge badge={badge} small owned />
          {userDetails && (
            <>
              {userDetails.attributes.location && <p>{`Aus: ${userDetails.attributes.location}`}</p>}
            </>
          )}
        </UserDetailsInfos>
      </UserDetails>
    </UserShowCaseWrapper>
  </Link>
);

export default UserShowCase;
