import {
  faClipboardList, faEnvelope, faRibbon, faVideo,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React from 'react';
import IUser from '../../../../models/IUser';
import Button from '../../../core/components/Button/Button';
import StatisticItem from '../../components/StatisticItem/StatisticItem';
import { ProfileBarWrapper, Username, Statistics } from './ProfileBar.styles';

interface ProfileBarProps {
  user: IUser,
}

const ProfileBar = ({
  user,
}: ProfileBarProps) => (
  <ProfileBarWrapper>
    <Username>
      {user.attributes.display_name}
    </Username>
    <Statistics>
      <StatisticItem
        icon={faVideo}
        text="Filme"
        value={33}
      />
      <StatisticItem
        icon={faClipboardList}
        text="Beiträge"
        value={120}
      />
      <StatisticItem
        icon={faRibbon}
        text="Badges"
        value={34}
      />
    </Statistics>
    <Link href="/messages" passHref>
      <Button
        small
        icon={faEnvelope}
      >
        Nachricht
      </Button>
    </Link>
  </ProfileBarWrapper>
);

export default ProfileBar;
