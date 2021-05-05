import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IBadge from '../../../../models/IBadge';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import { FlexRight } from '../../../../styles/global.styles';
import { backendURL } from '../../../../util/api';
import Button from '../../../core/components/Button/Button';
import Badge from '../../../profile/components/Badge/Badge';
import {
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
  <UserShowCaseWrapper>
    <UserShowCaseImageWrapper>
      <Image
        src={user.attributes.avatar ? `${backendURL}${user.attributes.avatar}` : '/assets/images/default_profile.svg'}
        layout="fill"
        objectFit="cover"
      />
    </UserShowCaseImageWrapper>

    <UserDetails>
      <UserNameWrapper>
        <strong>{user.attributes.display_name}</strong>
      </UserNameWrapper>
      <UserDetailsInfos>
        <Badge badge={badge} small />
        {userDetails && (
          <>
            {userDetails.attributes.location && <p>{`Aus: ${userDetails.attributes.location}`}</p>}
          </>
        )}
        <p>
          <strong>Mitglied seit: </strong>
          {format(new Date(user.attributes.created_at), 'dd.MM.yyyy')}
        </p>
      </UserDetailsInfos>
      <FlexRight>
        <Link href={`./profil/${user.id}`}><Button small>Zum Profil</Button></Link>
      </FlexRight>
    </UserDetails>
  </UserShowCaseWrapper>
);

export default UserShowCase;
