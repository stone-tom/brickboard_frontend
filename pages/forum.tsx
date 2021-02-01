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

  // console.log('THE DATA', data);
  const getTopic = (id: number) => topics.find((topic) => id === topic.id);
  const getUser = (id: number) => users.find((user) => id === user.id);
  const findMessageBoard = (id: number) => messageBoards.find((mb) => mb.id === id);

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
                const board = findMessageBoard(mb.id);
                if (board !== undefined) {
                  const lastTopic = getTopic(board.relationships.last_topic.data.id);
                  const lastUser = getUser(lastTopic.relationships.last_user.data.id);
                  return (
                    <ForumItem
                      key={board.attributes.slug}
                      title={board.attributes.name}
                      description={board.attributes.description}
                      topics={board.attributes.topics_count}
                      lastTopicTitle={
                        lastTopic
                          ? lastTopic.attributes.title
                          : 'Fehler beim Laden'
                      }
                      lastTopicDate={
                        lastTopic
                          ? new Date(lastTopic.attributes.last_post_at)
                          : new Date(Date.now())
                      }
                      lastAuthor={
                        lastUser.attributes.display_name
                      }
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
