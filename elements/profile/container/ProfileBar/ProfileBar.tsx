import {
  faClipboardList, faEnvelope, faLock, faLockOpen, faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { mutate } from 'swr';
import Link from 'next/link';
import React from 'react';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import IUser from '../../../../models/IUser';
import IUserDetail from '../../../../models/IUserDetail';
import Button from '../../../core/components/Button/Button';
import Prompt from '../../../core/container/Prompt/Prompt';
import StatisticItem from '../../components/StatisticItem/StatisticItem';
import updateModerationUser from '../../../../util/api/moderation/update-moderation-user';
import {
  ProfileBarWrapper,
  Username,
  Statistics,
  ButtonWrapper,
  StatusChangeButton,
} from './ProfileBar.styles';
import { MessageType } from '../../../../models/IMessage';
import { backendURL } from '../../../../util/api';
import { isBlocked } from '../../../../pages/profil/[user_id]';

interface ProfileBarProps {
  user: IUser,
  userDetail: IUserDetail,
}

const ProfileBar = ({
  user,
  userDetail,
}: ProfileBarProps) => {
  const { isAuthenticated, user: authUser } = useStoreState();
  const { addComponent, setMessage } = useStoreDispatch();

  const handleUserStatus = (modStatus: string) => {
    addComponent((
      <Prompt
        headline={`Benutzer ${(modStatus === 'approved' || modStatus === 'pending_moderation') ? 'blockieren' : 'entsperren'}`}
        acceptText={modStatus === 'approved' ? 'Blockieren' : 'Entsperren'}
        onAccept={async () => {
          try {
            await updateModerationUser(parseInt(user.id, 10), modStatus === 'approved' ? 'blocked' : 'approved');
            setMessage({
              content: 'Moderation Status erfolgreich geändert',
              type: MessageType.success,
            });
            const updateData = {
              data: {
                ...user,
              },
              included: [{
                ...userDetail,
                attributes: {
                  ...userDetail.attributes,
                  moderation_state: modStatus === 'approved' ? 'blocked' : 'approved',
                },
              }],
            };
            mutate(`${backendURL}/users/${user.id}`, updateData, false);
          } catch (e) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
      >
        Wollen Sie den Moderation Status wirklich ändern?
      </Prompt>));
  };

  return (
    <ProfileBarWrapper>
      <Username>
        {`${user.attributes.display_name} ${isBlocked(authUser, user, userDetail) ? '(Blockiert)' : ''}`}

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
      <ButtonWrapper>
        {isAuthenticated && authUser.attributes.admin && (
          userDetail.attributes.moderation_state === 'approved' ? (
            <StatusChangeButton
              color="brickred"
              reset
              icon={faLock}
              onClick={() => handleUserStatus(userDetail.attributes.moderation_state)}
            >
              Blockieren
            </StatusChangeButton>
          ) : (
            <StatusChangeButton
              color="green"
              reset
              icon={faLockOpen}
              onClick={() => handleUserStatus(userDetail.attributes.moderation_state)}
            >
              Entsperren
            </StatusChangeButton>
          )

        )}

      </ButtonWrapper>
    </ProfileBarWrapper>
  );
};

export default ProfileBar;
