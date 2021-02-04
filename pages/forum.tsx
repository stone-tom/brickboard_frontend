import React from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
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
  const users = filterContent(data, 'user');
  const messageBoards = filterContent(data, 'messageboard');

  const messageboadGroups = data.data;
  if (messageboadGroups.length === 0) {
    return <ViewWrapper>Es gibt noch keine Beiträge!</ViewWrapper>;
  }
  return (
    <Layout title="Forum - Brickboard 2.0">
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
                    key={board.attributes.slug}
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
