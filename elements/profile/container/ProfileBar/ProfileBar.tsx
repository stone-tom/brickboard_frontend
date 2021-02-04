import {
  faClipboardList, faEnvelope, faVideo,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React from 'react';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import Button from '../../../core/components/Button/Button';
import StatisticItem from '../../components/StatisticItem/StatisticItem';
import { ProfileBarWrapper, Username, Statistics } from './ProfileBar.styles';

interface ProfileBarProps {
  user: IUser,
  userDetail: IUserDetail,
}

const ProfileBar = ({
  user,
  userDetail,
}: ProfileBarProps) => (
  <ProfileBarWrapper>
    <Username>
      {user.attributes.display_name}
    </Username>
    <Statistics>
      <StatisticItem
        icon={faVideo}
        text="Filme"
        value={userDetail.attributes.movies_count}
      />
      <StatisticItem
        icon={faClipboardList}
        text="Beiträge"
        value={userDetail.attributes.posts_count}
      />
    </Statistics>
    <Link href="/messages" passHref>
      <Button
        disabled
        small
        icon={faEnvelope}
      >
        Nachricht
      </Button>
    </Link>
  </ProfileBarWrapper>
);

export default ProfileBar;
