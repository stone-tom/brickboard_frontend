import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../context/custom_store';
import { Icon } from '../../elements/core/components/Icon/Icon.styled';
import Indicator from '../../elements/core/components/Indicator/Indicator';
import Loader from '../../elements/core/components/Loader/Loader';
import Table, { Row } from '../../elements/core/components/Table/Table';
import Layout from '../../elements/core/container/Layout/Layout';
import Prompt from '../../elements/core/container/Prompt/Prompt';
import { EditMapping } from '../../elements/profile/container/ProfileMapper/ProfileMapper.styles';
import { MessageType } from '../../models/IMessage';
import IUser from '../../models/IUser';
import { Wrapper } from '../../styles/global.styles';
import { backendURL } from '../../util/api';
import updateModerationUser from '../../util/api/moderation/update-moderation-user';
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
  const router = useRouter();
  const { addComponent, setMessage } = useStoreDispatch();
  const { user: authUser } = useStoreState();
  if (authUser && !authUser.attributes.admin) router.push('/404');

  const { data, mutate } = useSWR(`${backendURL}/users`, get);
  const theme = useContext(ThemeContext);

  const headerItems = [
    'Name:',
    'Benutzertyp:',
    'Status:',
    'Erstellt am:',
    '',
  ];
  const handleUserStatus = (user: IUser, modStatus: string) => {
    addComponent((
      <Prompt
        headline={`Benutzer ${modStatus === 'approved' ? 'bestätigen' : 'sperren'}`}
        acceptText={modStatus === 'approved' ? 'Bestätigen' : 'Sperren'}
        onAccept={async () => {
          try {
            await updateModerationUser(parseInt(user.id, 10), modStatus);
            const updateData = {
              ...data,  
              included: data.included.map((item) => {
                if (item.id === user.relationships.thredded_user_detail.data.id) {
                  return {
                    ...item,
                    attributes: {
                      moderation_state: modStatus,
                    },
                  };
                }
                return item;
              }),
            };
            mutate(updateData, false);
            setMessage({
              content: 'Moderation Status erfolgreich geändert',
              type: MessageType.success,
            });
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

  const userDataReducer: (user: IUser) =>
    Row[] = (user: IUser) => ([
      user.attributes.display_name,
      [<Indicator text={user.attributes.admin ? 'Admin' : 'User'} color={theme.userTypes[user.attributes.admin ? 'admin' : 'user']} />, user.attributes.admin ? 'admin' : 'user'],
      [<Indicator
        text={getStatus(getModerationState(data, user))}
        color={theme.userStatus[getModerationState(data, user)]}
      />, getModerationState(data, user)],

      format(new Date(user.attributes.created_at), 'dd.MM.yyyy'),
      [(
        <EditMapping
          color={getModerationState(data, user) === 'blocked' ? 'green' : 'brickred'}
          reset
          onClick={() => handleUserStatus(user, getModerationState(data, user) === 'blocked' ? 'approved' : 'blocked')}
        >
          <Icon icon={getModerationState(data, user) === 'blocked' ? faLockOpen : faLock} />
          {getModerationState(data, user) === 'blocked' ? 'entsperren' : 'blockieren'}
        </EditMapping>
      ), ''],
    ]);

  const values = useMemo(() => {
    if (!data || !data.data) return null;
    return data.data.map((value) => userDataReducer(value));
  }, [data]);

  return (
    <Layout title="User Moderation">
      <h1>User Moderation</h1>
      <Wrapper>
        <Loader isLoading={!data}>
          <Table
            sorting={['string', 'string', 'string', 'string']}
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
