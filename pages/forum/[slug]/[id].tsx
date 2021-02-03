import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
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
  getTopic,
  incrementViewCount,
  markTopicAsRead,
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

// interface StaticParams{
//     params:{
//     slug:string;
//     id: number;
//     }
// }
// Welche Pfade prerendered werden können
// export const getStaticPaths: GetStaticPaths=async ()=>{

//   const res = await fetch(`https://${process.env.BACKEND_URL}/messageboards`);
//   const messageboardData = await res.json();
//   const messageboards=messageboardData.data[0].attributes.messageboards;

//   let paths=messageboards.map(board=>{
//     return board.messageboard.slug
//   });

//     return {
//         paths: [
//             { params: { slug: 'brickfilme-im-allgemeinen', id: "1"} },
//             { params: { slug: 'neuigkeiten', id: "1" } }
//         ],
//         fallback: true,
//       };
// };

// export const getStaticProps: GetStaticProps = async ({params}:Params) => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/Topics");
//   const userData = await res.json();
//   const users = userData;
//   return {
//     props: {
//       users,
//     },
//     revalidate: 1,
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;
  const { id } = context.params;
  const { content, fetchURL } = await getTopic(id);
  const topicData = content;

  return {
    props: {
      fetchURL,
      topicData,
      slug,
      id,
    },
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
  const { isAuthenticated, user } = useStoreState();
  const { setMessage } = useStoreDispatch();

  const topic = filter(data, 'topic')[0];
  const posts = filter(data, 'post');
  const userList = filter(data, 'user');
  const isLocked = topic.attributes.locked;
  const [isFollowing, toggleFollowing] = useState(false);
  if (topic.relationships.follow) {
    toggleFollowing(true);
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
    const { error } = await followTopic(slug, topic.id, follow);
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
      toggleFollowing(!isFollowing);
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

  // const onUpdateStatus = async (user: IUser, modStatus: string) => {
  //   setComponent((
  //     <Prompt
  //       headline="Moderation Status ändern?"
  //       onAccept={async () => {
  //         setComponent(null);
  //         try {
  //           await updateModerationUser(parseInt(user.id, 10), modStatus);
  //           const updateData = {
  //             ...data,
  //             included: data.included.map((item) => {
  //               if (item.id === user.relationships.thredded_user_detail.data.id) {
  //                 return {
  //                   ...item,
  //                   attributes: {
  //                     moderation_state: modStatus,
  //                   },
  //                 };
  //               }
  //               return item;
  //             }),
  //           };
  //           mutate(updateData, false);
  //           setMessage({
  //             content: 'Moderation Status erfolgreich geändert',
  //             type: MessageType.success,
  //           });
  //         } catch (e) {
  //           setMessage({
  //             content: 'Es ist ein Fehler aufgetreten',
  //             type: MessageType.error,
  //           });
  //         }
  //       }}
  //       onDecline={() => setComponent(null)}
  //     >
  //       Wollen Sie den Moderation Status wirklich ändern?
  //     </Prompt>));
  // };

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
            <>
              {isFollowing
                ? (
                  <Button onClick={() => subscribeTopic(false)} icon={faBell} reset>
                    E-Mails aktiv
                  </Button>
                )
                : (
                  <Button onClick={() => subscribeTopic(true)} icon={faBellSlash} reset>
                    E-Mails deaktiviert
                  </Button>
                )}
            </>
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
