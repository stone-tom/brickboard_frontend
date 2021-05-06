import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useStoreState } from '../../../../context/custom_store';
import IMessageboard from '../../../../models/IMessageboard';
import ITopic from '../../../../models/ITopic';
import ITopicView from '../../../../models/ITopicView';
import IUser from '../../../../models/IUser';
import filter from '../../../../util/filter';
import findObject from '../../../../util/finder';
import ForumHeading from '../../../forum/components/ForumHeading/ForumHeading';
import TopicItem from '../../../forum/components/TopicItem/TopicItem';
import { Result, ResultsWrapper, Empty } from './SearchResults.styles';

interface SearchResultsProps {
  results: {
    data: ITopicView[],
    included: any,
  },
}

const SearchResults = ({
  results,
}: SearchResultsProps) => {
  const { isAuthenticated } = useStoreState();
  const topics = filter(results, 'topic');
  const user = filter(results, 'user');
  const topicViews = results.data;
  const readTopics = filter(results, 'user_topic_read_state');
  const messageboards = filter(results, 'messageboard');
  const router = useRouter();
  const messageBoardTopics = useMemo(() => {
    const messageboardTopics = {};
    for (const topicView of topicViews) {
      const topic: ITopic = findObject(topics, topicView.relationships.topic.data.id);
      const messageboard: IMessageboard = findObject(
        messageboards,
        topic.relationships.messageboard.data.id,
      );

      const author: IUser = findObject(user, topic.relationships.user.data.id);
      const lastCommentor: IUser = findObject(user, topic.relationships.last_user.data.id);
      let readstate = null;

      if (topicView.relationships.read_state !== undefined) {
        readstate = findObject(readTopics, topicView.relationships.read_state.data.id);
      }
      let unread = false;
      if ((!topicView.relationships.read_state && isAuthenticated)
        || (topicView.relationships.read_state
          && readstate.attributes.unread_posts_count > 0)) {
        unread = true;
      }
      if (!messageboardTopics[messageboard.attributes.name]) {
        messageboardTopics[messageboard.attributes.name] = [];
      }
      messageboardTopics[messageboard.attributes.name].push({
        topic,
        messageboard,
        author,
        lastCommentor,
        unread,
      });
    }
    return messageboardTopics;
  }, [topicViews]);

  return (
    <ResultsWrapper>
      {Object.entries(messageBoardTopics).length > 0
        ? (
          Object.entries(messageBoardTopics).map(([name, items]: [string, any[]]) => (
            <Result>
              <ForumHeading title={name} />
              {items.map((item) => (
                <TopicItem
                  key={item.topic.attributes.slug}
                  slug={item.topic.attributes.slug}
                  topic={item.topic}
                  author={item.author}
                  lastCommentor={item.lastCommentor}
                  markUnread={item.unread}
                  isAuthenticated={isAuthenticated}
                  onClick={() => router.push(`/forum/${item.messageboard.attributes.slug}/${item.topic.id}`)}
                />
              ))}
            </Result>
          )))
        : (
          <Empty>
            Zu deinem Suchbegriff wurde nichts gefunden
          </Empty>
        )}
    </ResultsWrapper>
  );
};

export default SearchResults;
