import React, { useState } from 'react';
import {
  faAward,
  faBell,
  faComment,
  faEnvelope,
  faInfo,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import INotification from '../../../../models/INotification';
import { deleteAllNotifications } from '../../../../util/api';
import ButtonComponent from '../../components/Button/Button';
import IconComponent from '../../components/Icon/Icon';
import {
  NotificationCountNumber,
  NotificationCountWrapper,
  NotificationDeleteButton,
  NotificationDropDownFlex,
  NotificationDropDownItem,
  NotificationDropDownLink,
  NotificationDropDownRoot,
  NotificationDropdownTrigger,
  NotificationIconWrapper,
  NotificationTime,
} from './NotificationDropdown.styes';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';

const NotificationDropDown = ({ notifications }: { notifications: INotification[] }) => {
  const [open, setOpen] = useState(false);
  const { setMessage } = useStoreState();
  const { updateNotifications } = useStoreDispatch();
  const timeOutput = (created_at) => {
    const difference = differenceInHours(new Date(created_at), new Date()) * -1;
    let output = '';
    if (difference > 24) {
      output = `vor ${Math.round(difference / 24)} ${Math.round(difference / 24) === 1 ? 'Tag' : 'Tagen'}`;
    } else if (difference < 1) {
      const minutes = differenceInMinutes(new Date(created_at), new Date()) * -1;
      if (minutes === 0) {
        output = 'gerade eben';
      } else {
        output = `vor ${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
      }
    } else {
      output = `vor ${difference} Stunden`;
    }
    return output;
  };

  const determineIcon = (text: string) => {
    if (text.includes('Du hast soeben das Badge')) return faAward;
    if (text.includes('kommentierte')) return faComment;
    if (text.includes('Nachricht')) return faEnvelope;
    return faInfo;
  };

  const performNotificationDeletion = async () => {
    if (notifications.length > 0) {
      const { error } = await deleteAllNotifications();
      if (error) {
        setMessage({
          content: 'Fehler beim löschen',
          type: MessageType.error,
        });
      } else {
        updateNotifications([]);
      }
    }
  };

  return (
    <NotificationDropdownTrigger
      onClick={() => setOpen(!open)}
    >
      <NotificationCountWrapper ringing={notifications.length > 0}>
        {notifications.length > 0 ? (
          <NotificationCountNumber>
            {notifications.length > 99 ? '+99' : notifications.length}
          </NotificationCountNumber>
        ) : ''}
        <IconComponent icon={faBell} />
      </NotificationCountWrapper>
      {open ? (
        <NotificationDropDownRoot onMouseLeave={() => setTimeout(() => {
          setOpen(false);
        }, 250)}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationDropDownItem
                key={`notification_item_${notification.id}`}
                url={notification.attributes.url != null}
              >
                {notification.attributes.url != null ? (
                  <NotificationDropDownLink href={notification.attributes.url}>
                    <NotificationIconWrapper>
                      <IconComponent icon={determineIcon(notification.attributes.name)} />
                    </NotificationIconWrapper>
                    <div>
                      <p>{notification.attributes.name}</p>
                      <NotificationTime>
                        {timeOutput(notification.attributes.created_at)}
                      </NotificationTime>
                    </div>
                  </NotificationDropDownLink>
                ) : (
                  <NotificationDropDownFlex>
                    <NotificationIconWrapper>
                      <IconComponent icon={determineIcon(notification.attributes.name)} />
                    </NotificationIconWrapper>
                    <div>
                      <p>{notification.attributes.name}</p>
                      <NotificationTime>
                        {timeOutput(notification.attributes.created_at)}
                      </NotificationTime>
                    </div>
                  </NotificationDropDownFlex>
                )}
              </NotificationDropDownItem>
            ))
          ) : (
            <NotificationDropDownItem>
              <NotificationIconWrapper>
                <IconComponent icon={faInfo} />
              </NotificationIconWrapper>
              <p>Keine neuen Benachrichtigungen</p>
            </NotificationDropDownItem>
          )}

          <NotificationDeleteButton>
            <ButtonComponent
              reset
              icon={faTrash}
              onClick={() => performNotificationDeletion()}
            >
              Benachrichtigungen löschen
            </ButtonComponent>
          </NotificationDeleteButton>
        </NotificationDropDownRoot>
      ) : ''}

    </NotificationDropdownTrigger>
  );
};

export default NotificationDropDown;
