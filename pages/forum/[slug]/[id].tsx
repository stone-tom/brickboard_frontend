import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { ViewWrapper, Hint, FlexRight } from '../../../styles/global.styles';
import Post from '../../../elements/forum/container/Post/Post';
import Layout from '../../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../../elements/core/components/Breadcrumbs/Breadcrumbs';
import {
  answerTopic,
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
import useSWR from 'swr';
import { get } from '../../../util/methods';
import Icon from '../../../elements/core/components/Icon/Icon';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import HintComponent from '../../../elements/core/components/Hint/Hint';

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
  const { content, fetchURL } = await getTopic(slug.toString(), id);
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
  const {data} = useSWR(fetchURL,get,{revalidateOnMount:true, initialData: topicData})
  const { isAuthenticated } = useStoreState();
  const { setMessage } = useStoreDispatch();

  const topic = filter(data, 'topic')[0];
  const topicViews = filter(data, 'topic_view');
  const topicView = findObject(topicViews, data.data.relationships.topic.data.id);
  const [posts, addPost] = useState(filter(data, 'post'));
  const userList = filter(data, 'user');
  const getUser = (userId: number) => {
    let foundUser = userList.find((user) => userId === user.id);
    if (foundUser === undefined) {
      return {

        attributes: { display_name: "Fix Bug with new User" }

      }
    }
    return foundUser;
  };
  const isLocked = topic.attributes.locked;
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
      addPost([...posts, content.data]);
      toggleEditor();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      markTopicAsRead(slug, topic.id);
    }
    if (typeof window !== 'undefined') {
      incrementViewCount(slug, topic.id);
    }
  }, []);

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

        <h1>{topic.attributes.title}</h1>
        {console.log("THE TOPIC VIEW", topicView)}
        {isAuthenticated && (
          <>
            {topicView.relationships.follow
            ? <HintComponent hint="E-Mails deaktiveren"><Button reset><Icon icon={faBellSlash} /></Button></HintComponent> 
            : <HintComponent hint="E-Mails aktivieren"><Button reset><Icon icon={faBell} /></Button></HintComponent>}
          </>)}
        {isLocked && (
          <Hint>
            Dieses Thema wurde von einem der Admins gesperrt. Du kannst keine
            Antwort posten.
          </Hint>
        )}
        {posts.map((postWrapper, index) => {
          if (index === 0) {
            return (
              <Post
                postId={postWrapper.id}
                topicId={id}
                slug={slug}
                postContent={postWrapper.attributes.content}
                // type={1}
                author={getUser(postWrapper.relationships.user.data.id).attributes.display_name}
                key={postWrapper.id}
                created={postWrapper.attributes.created_at}
              />
            );
          }
          return (
            <Post
              postId={postWrapper.id}
              topicId={id}
              slug={slug}
              title={`Re: ${topic.attributes.title}`}
              postContent={postWrapper.attributes.content}
              // type={1}
              author={getUser(postWrapper.relationships.user.data.id).attributes.display_name}
              key={postWrapper.id}
              created={postWrapper.attributes.created_at}
            />
          );
        })}
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
