import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import { sessionget } from '../../../../util/methods';

const SessionCheck = () => {
  const { sessionCheckLogout, updateNotifications, updateModerationState } = useStoreDispatch();
  const { isAuthenticated, moderation_state } = useStoreState();
  const { data } = useSWR(isAuthenticated ? `${backendURL}/sessions` : null, sessionget, {
    refreshInterval: 60000 * 30,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    errorRetryCount: 0,
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.log('ERROR IN SESSIONCHECK', e);
      sessionCheckLogout();
    },
  });

  useEffect(() => {
    if (data) {
      if (moderation_state !== 'approved') {
        let isUnlocked = false;
        for (const notification of data.data.reverse()) {
          if (notification.attributes.name === 'Dein Account wurde soeben bestätigt!') {
            isUnlocked = true;
          }
        }
        if (isUnlocked) {
          updateModerationState('approved');
        }
      }
    }
    if (data && data.data.length > 0) {
      updateNotifications(data.data.reverse());
    }
  }, [data]);

  return (
    <></>
  );
};

export default SessionCheck;
