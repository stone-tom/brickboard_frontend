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
      revalidateOnFocus: true,
      revalidateOnMount: true,
    });

    useEffect(() => {
      if (data && data.error && isAuthenticated) {
        performLogout();
        setMessage({
          content: `${data.error}`,
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
