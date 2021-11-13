import React from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import { sessionget } from '../../../../util/methods';

const SessionCheck = () => {
  const { sessionCheckLogout, updateNotifications, updateModerationState } = useStoreDispatch();
  const { isAuthenticated, notifications, moderation_state } = useStoreState();

  if (isAuthenticated) {
    const { data } = useSWR(isAuthenticated ? `${backendURL}/sessions` : null, sessionget, {
      refreshInterval: 60000 * 30,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      errorRetryCount: 0,
      onError: () => {
        sessionCheckLogout();
      },
    });
    if (data && data.data) {
      if (data.data.length !== notifications.length) {
        updateNotifications(data.data.reverse());
      }
      if (moderation_state !== 'approved') {
        let isUnlocked = false;
        for (const notification of notifications) {
          if (notification.attributes.name === 'Dein Account wurde soeben bestätigt!') {
            isUnlocked = true;
          }
        }
        if (isUnlocked) {
          updateModerationState('approved');
        }
      }
      return (
        <></>
      );
    }
  }
  return null;
};

export default SessionCheck;
