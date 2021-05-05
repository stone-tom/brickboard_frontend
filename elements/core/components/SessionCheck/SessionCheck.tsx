import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { backendURL } from '../../../../util/api';
import { get } from '../../../../util/methods';

const SessionCheck = () => {
  const router = useRouter();
  const { performLogout, setMessage } = useStoreDispatch();
  const { isAuthenticated } = useStoreState();
  if (isAuthenticated) {
    const { data } = useSWR(`${backendURL}/sessions`, get, {
      refreshInterval: 60000 * 30,
      revalidateOnMount: true,
      revalidateOnFocus: true,
    });

    useEffect(() => {
      if (data && data.error) {
        performLogout();
        setMessage({
          content: 'Du wurdest ausgeloggt',
          type: MessageType.warning,
        });
        router.push('/login');
      }
    }, [data]);

    if (data && data.data) {
      return (
        <></>
      );
    }
  }
  return null;
};

export default SessionCheck;
