import React, { useState } from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import ForumItem from '../elements/forum/components/ForumItem/ForumItem';
import { ViewWrapper } from '../styles/global.styles';
import ForumHeading from '../elements/forum/components/ForumHeading/ForumHeading';
import Layout from '../elements/core/container/Layout/Layout';
import { getMessageBoardGroups } from '../util/api';
import { get } from '../util/methods';
import filterContent from '../util/filter';
import ITopic from '../models/ITopic';
import findObject from '../util/finder';
import IUser from '../models/IUser';
import IMessageboard from '../models/IMessageboard';
import FormInput from '../elements/core/components/FormInput/FormInput';
import Button from '../elements/core/components/Button/Button';

export const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const SearchButton = styled(Button)`
  padding: 9px 21px;
  align-self: flex-end;
  margin-bottom: 10px;
  margin-left: 20px;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-left: 0px;
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getMessageBoardGroups();
  const topics = filterContent(content, 'topic');

  return {
    props: {
      content,
      topics,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface ForumProps {
  content: any;
  topics: any;
  fetchURL: string;
}

const Forum = ({ content, topics, fetchURL }: ForumProps) => {
  const { data } = useSWR(fetchURL, get, {
    initialData: content,
    revalidateOnMount: true,
  });
  const router = useRouter();
  const users = filterContent(data, 'user');
  const messageBoards = filterContent(data, 'messageboard');

  const openTarget = (slugToOpen) => {
    if (slugToOpen !== '') router.push(`/forum/${slugToOpen}`);
  };

  const messageboadGroups = data.data;
  if (messageboadGroups.length === 0) {
    return <ViewWrapper>Es gibt noch keine Beiträge!</ViewWrapper>;
  }

  const [searchTerm, setSearchTerm] = useState<string>();
  return (
    <Layout title="Forum - Brickboard 2.0">
      <SearchWrapper
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/suche?q=${searchTerm}`);
        }}
      >
        <FormInput
          value={searchTerm}
          onChange={(newValue) => setSearchTerm(newValue)}
        >
          Suche
        </FormInput>
        <SearchButton
          type="submit"
          icon={faSearch}
        >
          Suche
        </SearchButton>
      </SearchWrapper>
      {messageboadGroups.map((group) => (
        <div key={group.attributes.name}>
          <ForumHeading title={group.attributes.name} />
          {group.relationships
            && group.relationships.messageboards.data.map((mb) => {
              const board: IMessageboard = findObject(messageBoards, mb.id);
              if (board !== undefined) {
                let lastTopic: ITopic = null;
                if (board.relationships.last_topic && board.relationships.last_topic.data) {
                  lastTopic = findObject(topics, board.relationships.last_topic.data.id);
                }
                let lastUser: IUser = null;
                if (lastTopic) {
                  lastUser = findObject(users, lastTopic.relationships.last_user.data.id);
                }
                return (
                  <ForumItem
                    onClick={(event) => openTarget(event)}
                    key={`mb_${board.attributes.slug}`}
                    messageboard={board}
                    lastTopic={lastTopic}
                    lastAuthor={lastUser}
                    slug={board.attributes.slug}
                  />
                );
              }
              return <div>Board wurde nicht gefunden</div>;
            })}
        </div>
      ))}
    </Layout>
  );
};

export default Forum;
