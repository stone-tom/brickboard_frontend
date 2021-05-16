import React from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { backendURL } from '../../../../util/api';
import { sessionget } from '../../../../util/methods';

const SessionCheck = () => {
  const { sessionCheckLogout } = useStoreDispatch();
  const { isAuthenticated } = useStoreState();

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
      return (
        <></>
      );
    }
  }
  return null;
};

export default SessionCheck;
