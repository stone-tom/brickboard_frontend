import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import useSWR from 'swr';
import Link from 'next/link';
import { useStoreDispatch, useStoreState } from '../../context/custom_store';
import { SearchWrapper } from '../benutzer/index';
import { Icon } from '../../elements/core/components/Icon/Icon.styles';
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
import Pagination from '../../elements/core/container/Pagination/Pagination';
import filter from '../../util/filter';
import FormInput from '../../elements/core/components/FormInput/FormInput';

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
  const [pageIndex, setPageIndex] = useState(1);
  const { addComponent, setMessage } = useStoreDispatch();
  const { user: authUser } = useStoreState();
  const [searchTerm, setSearchTerm] = useState<string>();
  if (authUser && !authUser.attributes.admin) router.push('/404');

  const { data, mutate } = useSWR(`${backendURL}/users/page-${pageIndex}`, get);
  const { data: searchData } = useSWR(`${backendURL}/autocomplete-users?q=${searchTerm}`, get);
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
        headline={`Benutzer ${modStatus === 'approved' ? 'entsperren' : 'blockieren'}`}
        acceptText={modStatus === 'approved' ? 'Entsperren' : 'Blockieren'}
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
                      ...item.attributes,
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
      [<Link href={`/profil/${user.id}`}>{user.attributes.display_name}</Link>, user.attributes.display_name],
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
    if (searchTerm && searchData) return searchData.data.map((item) => userDataReducer(item));
    return filter(data, 'user').map((value) => userDataReducer(value));
  }, [data, searchData]);

  return (
    <Layout title="User Moderation">
      <h1>User Moderation</h1>
      <SearchWrapper>
        <FormInput
          value={searchTerm}
          onChange={(newValue) => setSearchTerm(newValue)}
        >
          Benutzersuche
        </FormInput>
      </SearchWrapper>
      <Wrapper>
        <Loader isLoading={!data}>
          <Table
            sorting={['string', 'string', 'string', 'string']}
            headerItems={headerItems}
            values={values}
            empty={(!values || values.length === 0) ? 'Es sind keine Nutzer vorhanden' : undefined}
          />
          {!searchTerm && values && values.length > 0 && (
            <Pagination
              pageIndex={pageIndex}
              totalLength={data.data.attributes.users_count}
              paginationSize={20}
              onClick={(index: number) => setPageIndex(index)}
            />
          )}
        </Loader>
      </Wrapper>
    </Layout>
  );
};

export default UserModeration;
