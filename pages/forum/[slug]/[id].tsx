import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Params } from 'next/dist/next-server/server/router';
import useSWR from 'swr';
import {
  faBan,
  faBell,
  faBellSlash,
  faClipboardCheck,
  faMapPin,
  faSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  ViewWrapper,
  Hint,
  FlexRight,
  FlexBetween,
} from '../../../styles/global.styles';
import Post from '../../../elements/forum/container/Post/Post';
import Layout from '../../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../../elements/core/components/Breadcrumbs/Breadcrumbs';
import {
  answerTopic,
  followTopic,
  getMessageBoardGroups,
  getTopic,
  incrementViewCount,
  markTopicAsRead,
  updateTopic,
} from '../../../util/api';
import Editor from '../../../elements/core/container/Editor/Editor';
import { EditorContainer } from '../../../elements/core/container/Editor/Editor.styles';
import Button from '../../../elements/core/components/Button/Button';
import { MessageType } from '../../../models/IMessage';
import filter from '../../../util/filter';
import { useStoreDispatch, useStoreState } from '../../../context/custom_store';
import findObject from '../../../util/finder';
import { get } from '../../../util/methods';
import IPost from '../../../models/IPost';
import ITopic from '../../../models/ITopic';
import IMessageboard from '../../../models/IMessageboard';
import { TopicSettingsBar, TopicSettingsBarItem } from '../../../elements/forum/components/TopicItem/TopicItem.styles';
import Prompt from '../../../elements/core/container/Prompt/Prompt';

export const getStaticPaths: GetStaticPaths = async () => {
  const { content } = await getMessageBoardGroups();
  let messageboards = filter(content, 'messageboard');
  messageboards = messageboards.filter((board: IMessageboard) => (
    board.relationships.last_topic.data));
  return {
    paths: messageboards.map((board: IMessageboard) => ({
      params: {
        slug: board.attributes.slug,
        id: board.relationships.last_topic.data.id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { id, slug } = params;
  const { content, fetchURL } = await getTopic(id);
  const topicData = content;

  return {
    props: {
      fetchURL,
      topicData,
      slug,
      id,
    },
    revalidate: 1,
  };
};

interface SubforumProps {
  fetchURL: string,
  topicData: any,
  slug: string,
  id: number,
}

function Subforum({
  fetchURL,
  topicData,
  slug,
  id,
}: SubforumProps) {
  const { data, mutate } = useSWR(
    fetchURL,
    get,
    { revalidateOnMount: true, initialData: topicData },
  );
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout
        title="Laden... - Brickboard 2.0"
      >
        <ViewWrapper>
          <h1>Seite lädt...</h1>
        </ViewWrapper>
      </Layout>
    );
  }
  const { isAuthenticated, user } = useStoreState();
  const { setMessage, addComponent } = useStoreDispatch();
  const topic: ITopic = filter(data, 'topic')[0];
  const topicView = filter(data, 'topic_view')[0];
  const posts = filter(data, 'post');
  const userList = filter(data, 'user');
  const isLocked = topic.attributes.locked;
  let isFollowing = false;
  if (topicView.relationships.follow) {
    isFollowing = true;
  }
  const [editorActive, setEditorActive] = useState(false);
  const toggleEditor = () => setEditorActive(!editorActive);

  const submitTopic = async (editorContent) => {
    const { content, error } = await answerTopic(slug, id, editorContent);
    if (error) {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
    if (content) {
      if (!findObject(userList, content.data.relationships.user.data.id)) {
        mutate({
          ...data,
          included: [
            ...data.included,
            content.data,
            user,
          ],
        }, false);
      } else {
        mutate({
          ...data,
          included: [
            ...data.included,
            content.data,
          ],
        }, false);
      }

      setMessage({
        content: 'Deine Antwort wurde gepostet!',
        type: MessageType.success,
      });
      toggleEditor();
    }
  };

  const subscribeTopic = async (follow: boolean) => {
    const { content, error } = await followTopic(topic.id, follow);
    if (!error) {
      if (follow) {
        setMessage({
          content: 'E-Mail Benachrichtigungen für dieses Thema wurden aktiviert!',
          type: MessageType.success,
        });
      } else {
        setMessage({
          content: 'E-Mail Benachrichtigungen wurden deaktiviert!',
          type: MessageType.warning,
        });
      }

      const updatedTopicView = findObject(content.data, topicView.id);

      const updateData = {
        ...data,
        included: data.included.map((item) => {
          if (item.id === topicView.id && item.type === 'topic_view' && follow) {
            return {
              ...item,
              relationships: {
                ...item.relationships,
                follow: updatedTopicView.relationships.follow,
              },
            };
          }
          if (item.id === topicView.id && item.type === 'topic_view' && !follow) {
            return {
              ...item,
              relationships: {
                ...updatedTopicView.relationships,
              },
            };
          }
          return item;
        }),
      };
      mutate(updateData, false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      markTopicAsRead(topic.id);
    }
    if (typeof window !== 'undefined') {
      incrementViewCount(topic.id);
    }
  }, []);

  const handlePostUpdate = (updatedPost) => {
    const updateData = {
      ...data,
      included: data.included.map((item) => {
        if (item.id === updatedPost.id && item.type === 'post') {
          return {
            ...item,
            attributes: {
              ...item.attributes,
              content: updatedPost.attributes.content,
            },
          };
        }
        return item;
      }),
    };
    mutate(updateData, false);
  };
  const submitLock = async (lock: boolean) => {
    const updatedTopic = { topic: { locked: lock } };

    const { content, error } = await updateTopic(topic.id, updatedTopic);
    if (error) {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
    if (content) {
      setMessage({
        content: `Thema wurde erfolgreich ${lock ? 'gesperrt' : 'entsperrt'}`,
        type: lock ? MessageType.warning : MessageType.success,
      });
      const updateData = {
        ...data,
        included: data.included.map((item) => {
          if (item.id === topic.id && item.type === 'topic') {
            return {
              ...item,
              attributes: {
                ...item.attributes,
                locked: lock,
              },
            };
          }
          return item;
        }),
      };
      mutate(updateData, false);
    }
  };
  const submitPin = async (pinned: boolean) => {
    const updatedTopic = { topic: { sticky: pinned } };

    const { content, error } = await updateTopic(topic.id, updatedTopic);
    if (error) {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
    if (content) {
      setMessage({
        content: `Thema wurde erfolgreich ${pinned ? 'angepinnt' : 'entpinned'}`,
        type: pinned ? MessageType.success : MessageType.warning,
      });
      const updateData = {
        ...data,
        included: data.included.map((item) => {
          if (item.id === topic.id && item.type === 'topic') {
            return {
              ...item,
              attributes: {
                ...item.attributes,
                sticky: pinned,
              },
            };
          }
          return item;
        }),
      };
      mutate(updateData, false);
    }
  };

  const onUpdateStatus = async (lock: boolean) => {
    addComponent((
      <Prompt
        headline={lock ? 'Sperren bestätigen' : 'Entsperren bestätigen'}
        onAccept={() => submitLock(lock)}
      >
        {lock ? (
          'Wenn du das Thema sperrst können keine Antworten mehr gepostet werden.'
        )
          : (
            'Antworten auf das Thema sind wieder möglich.'
          )}
      </Prompt>));
  };

  return (
    <Layout
      title={`${topic.attributes.title} - Brickboard 2.0`}
    >
      <ViewWrapper>
        <Breadcrumbsbar
          slug={slug}
          id={topic.id}
          topic={topic.attributes.title}
        />
        <FlexBetween>
          <h1>{topic.attributes.title}</h1>
          {isAuthenticated && (
            <TopicSettingsBar>
              {!topic.attributes.locked && (
                <TopicSettingsBarItem>
                  <Button
                    onClick={() => subscribeTopic(!isFollowing)}
                    icon={isFollowing ? faBell : faBellSlash}
                    reset
                  >
                    {`E-Mails ${isFollowing ? 'aktiv' : 'deaktiviert'}`}
                  </Button>
                </TopicSettingsBarItem>
              )}
              {user.attributes.admin
                && (
                  <>
                    <TopicSettingsBarItem>
                      <Button
                        reset
                        icon={topic.attributes.locked ? faClipboardCheck : faBan}
                        onClick={() => onUpdateStatus(!topic.attributes.locked)}
                      >
                        {topic.attributes.locked
                          ? 'Thema entsperren'
                          : 'Thema sperren'}
                      </Button>
                    </TopicSettingsBarItem>
                    <TopicSettingsBarItem>
                      <Button
                        reset
                        icon={topic.attributes.sticky ? faSlash : faMapPin}
                        onClick={() => submitPin(!topic.attributes.sticky)}
                      >
                        {topic.attributes.sticky
                          ? 'Thema entpinnen'
                          : 'Thema anpinnen'}
                      </Button>
                    </TopicSettingsBarItem>
                  </>
                )}
            </TopicSettingsBar>
          )}

        </FlexBetween>
        {isLocked && (
          <Hint>
            Dieses Thema wurde von einem der Admins gesperrt. Du kannst keine
            Antwort posten.
          </Hint>
        )}

        {posts.map((post: IPost, index) => (

          <Post
            onPostUpdated={(updatedPost) => handlePostUpdate(updatedPost)}
            post={post}
            topicTitle={topic.attributes.title}
            first={index === 0}
            messageBoardSlug={slug}
            author={findObject(userList, post.relationships.user.data.id)}
            key={post.id}
          />
        ))}

        {isAuthenticated && !isLocked && (
          <EditorContainer>
            <FlexRight>
              <Button type="button" onClick={() => toggleEditor()}>
                {editorActive ? 'Abbrechen' : 'Antworten'}
              </Button>
            </FlexRight>
            {editorActive && (
              <Editor answer onEditorSubmit={({ editorContent }) => submitTopic(editorContent)} />
            )}
          </EditorContainer>
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default Subforum;
