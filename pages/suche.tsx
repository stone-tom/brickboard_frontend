import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import FormInput from '../elements/core/components/FormInput/FormInput';
import Select from '../elements/core/components/MultiSelect/MultiSelect';
import Layout from '../elements/core/container/Layout/Layout';
import SearchResults from '../elements/suche/container/SearchResults/SearchResults';
import { backendURL } from '../util/api';
import filter from '../util/filter';
import { get } from '../util/methods';
import {
  // SearchButton,
  SearchWrapper,
} from './forum';

const InputWrapper = styled.div`
  margin-right: 20px;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-bottom: 20px;
  }
`;

const Suche = () => {
  const { query } = useRouter();
  const term: string = typeof query.q === 'string' ? query.q : '';
  const [searchTerm, setSearchTerm] = useState<string>(term);
  const [selectedMessageboard, setSelectedMessageboard] = useState<{
    label: string,
    value: string,
  }>({
    label: 'Alle',
    value: '',
  });

  useEffect(() => {
    if (term) setSearchTerm(term);
  }, [term]);

  const { data } = useSWR(`${backendURL}/messageboards${selectedMessageboard ? selectedMessageboard.value : ''}?q=${searchTerm}`, get);
  const { data: messageBoardsData } = useSWR(`${backendURL}/messageboards`, get);
  const options = useMemo(() => {
    if (messageBoardsData) {
      return filter(messageBoardsData, 'messageboard').map((item) => ({
        label: item.attributes.name,
        value: `/${item.attributes.slug}`,
      }));
    }
    return [];
  }, [messageBoardsData]);

  return (
    <Layout title="Brickboard 2.0 - Suche">
      <SearchWrapper>
        <InputWrapper>
          <FormInput
            value={searchTerm}
            onChange={(newValue) => setSearchTerm(newValue.trim())}
          >
            Suche
          </FormInput>
        </InputWrapper>
        <Select
          col
          options={[{
            label: 'Alle',
            value: '',
          }, ...options]}
          value={selectedMessageboard}
          onChange={(newBoard) => setSelectedMessageboard(newBoard)}
          isMulti={false}
        >
          Messageboards
        </Select>
      </SearchWrapper>
      <h2>{`Suchergebnisse für : "${searchTerm}" in "${selectedMessageboard.label}"`}</h2>
      {data && searchTerm.length > 0 && (
        <SearchResults results={data} />
      )}
    </Layout>
  );
};

export default Suche;
