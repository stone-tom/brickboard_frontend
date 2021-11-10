import React from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import { sessionget } from '../../../../util/methods';

const SessionCheck = () => {
  const { sessionCheckLogout, updateNotifications } = useStoreDispatch();
  const { isAuthenticated, notifications } = useStoreState();

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
      return (
        <></>
      );
    }
  }
  return null;
};

export default SessionCheck;
