import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import useSWR from 'swr';
import { useStoreDispatch } from '../../context/custom_store';
import { Button } from '../../elements/core/components/Button/Button.styles';
import { Icon } from '../../elements/core/components/Icon/Icon.styled';
import Indicator from '../../elements/core/components/Indicator/Indicator';
import Loader from '../../elements/core/components/Loader/Loader';
import Table, { Row } from '../../elements/core/components/Table/Table';
import Layout from '../../elements/core/container/Layout/Layout';
import Prompt from '../../elements/core/container/Prompt/Prompt';
import IUser from '../../models/IUser';
import { Wrapper } from '../../styles/global.styles';
import { backendURL } from '../../util/api';
import { get } from '../../util/methods';
import { getModerationState } from './post-moderation';

export const getStatus = (status: string | null) => {
  switch (status) {
    case 'blocked':
      return 'gesperrt';
    case 'pending_moderation' || null:
      return 'wartend';
    default:
      return 'bestätigt';
  }
};

const UserModeration = () => {
  const { data } = useSWR(`${backendURL}/users`, get);
  const theme = useContext(ThemeContext);

  const headerItems = [
    'Benutzertyp:',
    'Status:',
    'Name:',
    'Erstellt am:',
    '',
  ];

  const userDataReducer: (user: IUser) =>
    Row[] = (user: IUser) => ([
      [<Indicator text={user.attributes.admin ? 'Admin' : 'User'} color={theme.userTypes[user.attributes.admin ? 'admin' : 'user']} />, ''],
      [<Indicator
        text={getStatus(getModerationState(data, user))}
        color={theme.userStatus[getModerationState(data, user)]}
      />, ''],
      user.attributes.display_name,
      format(new Date(user.attributes.created_at), 'dd.mm.yyyy'),
      [(
        <Button
          reset
        >
          <Icon icon={getModerationState(data, user) === 'blocked' ? faLockOpen : faLock} />
        </Button>
      ), ''],
    ]);

  const values = useMemo(() => {
    if (!data || !data.data) return null;
    return data.data.map((value) => userDataReducer(value));
  }, [data]);
  const { addComponent, removeComponent } = useStoreDispatch();
  const openPrompt = () => {
    addComponent((
      <Prompt
        headline="Moderation Status ändern?"
        onAccept={() => removeComponent()}
        onDecline={() => removeComponent()}
      >
        Wollen Sie den Moderation Status wirklich ändern?
      </Prompt>));
  };

  return (
    <Layout title="User Moderation">
      <h1>User Moderation</h1>
      <Button onClick={openPrompt}>
        Test
      </Button>
      <Wrapper>
        <Loader isLoading={!data}>
          <Table
            headerItems={headerItems}
            values={values}
            empty={(!values || values.length === 0) ? 'Es sind keine Nutzer vorhanden' : undefined}
          />
        </Loader>
      </Wrapper>
    </Layout>
  );
};

export default UserModeration;
