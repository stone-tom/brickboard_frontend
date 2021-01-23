import React from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import ForumItem from '../elements/core/components/ForumItem/ForumItem';
import { ContentContainer } from '../styles/global.styles';
import ForumHeading from '../elements/core/components/ForumHeading/ForumHeading';
import Layout from '../elements/core/container/Layout/Layout';
import { getMessageboardGroups } from '../util/fetcher';
import { get } from '../util/methods';
import { filterTopics, filterMessageboards, filterUsers } from '../util/filter';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getMessageboardGroups();
  // console.log(content);
  const topics = filterTopics(content);

  // console.log(topics);
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
  const users = filterUsers(data);
  const messageboards = filterMessageboards(data);

  // console.log('THE DATA', data);
  const getTopic = (id: number) => topics.find((topic) => id === topic.id);
  const getUser = (id: number) => users.find((user) => id === user.id);
  const findMessageBoard = (id: number) => messageboards.find((mb) => mb.id === id);

  const messageboadGroups = data.data;
  if (messageboadGroups.length === 0) {
    return <ContentContainer>Es gibt noch keine Beiträge!</ContentContainer>;
  }
  return (
    <Layout title="Forum - Brickboard 2.0">
      <ContentContainer>
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
      </ContentContainer>
    </Layout>
  );
};

export default Forum;
