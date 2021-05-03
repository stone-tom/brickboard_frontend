import { GetStaticProps } from 'next';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Layout from '../../elements/core/container/Layout/Layout';
import IUser from '../../models/IUser';
import getUsers from '../../util/api/user/get-users';
import { get } from '../../util/methods';
import UserCard from '../../elements/user/container/UserCard/UserCard';
import FormInput from '../../elements/core/components/FormInput/FormInput';
import { backendURL } from '../../util/api';

const UserCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const SearchWrapper = styled.div`
  margin-top: 20px;
  width: 30%;
`;

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getUsers();

  return {
    props: {
      content,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface AllUserProps {
  fetchURL: string,
  content: any,
}

const AllUsers = ({
  fetchURL,
  content,
}: AllUserProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {
    data,
  } = useSWR(
    fetchURL,
    get,
    { initialData: content, revalidateOnMount: true },
  );
  const { data: searchData } = useSWR(`${backendURL}/autocomplete-users?q=${searchTerm}`, get);

  const users = useMemo(() => {
    if (searchTerm.length < 2) {
      return data.data.map((item: IUser) => (
        {
          id: item.id,
          name: item.attributes.display_name,
          avatar: item.attributes.avatar,
        }
      ));
    }
    if (searchData && searchData.results.length > 0) {
      return searchData.results.map((item) => ({
        id: item.id,
        name: item.display_name,
        avatar: item.avatar,
      }));
    }
    return [];
  }, [searchTerm, data, searchData]);

  return (
    <Layout title="Forum - Brickboard 2.0">

      <SearchWrapper>
        <FormInput
          placeholder="Benutzername"
          value={searchTerm}
          onChange={(newValue) => setSearchTerm(newValue)}
        >
          Suche
        </FormInput>
      </SearchWrapper>
      <UserCardWrapper>
        {users.length !== 0 ? users.map((user) => (
          <UserCard
            id={user.id}
            key={user.id}
            name={user.name}
            imageUrl={user.avatar}
          />
        )) : <>Es wurden keine Benutzer gefunden.</>}
      </UserCardWrapper>
    </Layout>
  );
};

export default AllUsers;
