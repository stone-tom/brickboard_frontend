import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Button } from '../elements/core/components/Button/Button.styles';
import { Icon } from '../elements/core/components/Icon/Icon.styled';
import Indicator from '../elements/core/components/Indicator/Indicator';
import Table, { Row } from '../elements/core/components/Table/Table';
import Layout from '../elements/core/container/Layout/Layout';
import IUser from '../models/IUser';

const mockValues: IUser[] = [
  {
    id: 1,
    admin: true,
    display_name: 'Administrator1',
    created_at: '2020-11-29T16:22:44.422+01:00',
    updated_at: '2020-11-29T16:22:44.422+01:00',
    avatar: 'asdfasdf',
    pending_moderation: 'pending',
  },
  {
    id: 2,
    admin: true,
    display_name: 'Administrator1',
    created_at: '2020-11-29T16:22:44.422+01:00',
    updated_at: '2020-11-29T16:22:44.422+01:00',
    avatar: 'asdfasdf',
    pending_moderation: 'locked',
  },
  {
    id: 3,
    admin: false,
    display_name: 'User',
    created_at: '2020-11-29T16:22:44.422+01:00',
    updated_at: '2020-11-29T16:22:44.422+01:00',
    avatar: 'asdfasdf',
    pending_moderation: 'approved',
  },
];

const UserModeration = () => {
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
      [<Indicator text={user.admin ? 'Admin' : 'User'} color={theme.userTypes[user.admin ? 'admin' : 'user']} />, ''],
      [<Indicator
        text={user.pending_moderation === 'locked' ? 'gesperrt' : user.pending_moderation === 'pending' ? 'pending' : 'bestätigt'}
        color={theme.userStatus[user.pending_moderation]}
      />, ''],
      user.display_name,
      format(new Date(user.created_at), 'dd.mm.yyyy'),
      [(
        <Button
          reset
        >
          <Icon icon={user.pending_moderation === 'locked' ? faLockOpen : faLock} />
        </Button>
      ), ''],
    ]);

  const values = useMemo(() => {
    if (!mockValues) return null;
    return mockValues.map((value) => userDataReducer(value));
  }, [mockValues])

  return (
    <Layout title="User Moderation">
      <h1>User Moderation</h1>
      <Table
        headerItems={headerItems}
        values={values}
        empty={(!values || values.length === 0) ? 'Es sind keine Nutzer vorhanden' : undefined}
      />
    </Layout>
  )
};

export default UserModeration;
