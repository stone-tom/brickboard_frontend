import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { ViewWrapper, Hint, FlexRight } from '../../../styles/global.styles';
import Post from '../../../elements/forum/container/Post/Post';
import Layout from '../../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../../elements/core/components/Breadcrumbs/Breadcrumbs';
import { answerTopic, getTopic } from '../../../util/api';
import Editor from '../../../elements/core/container/Editor/Editor';
import { EditorContainer } from '../../../elements/core/container/Editor/Editor.styles';
import Button from '../../../elements/core/components/Button/Button';
import { MessageType } from '../../../models/IMessage';
import filter from '../../../util/filter';
import { useStoreDispatch, useStoreState } from '../../../context/custom_store';

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
  const { content } = await getTopic(slug.toString(), id);
  const topicData = content;

  return {
    props: {
      topicData,
      slug,
      id,
    },
  };
};

interface SubforumProps {
  topicData: any,
  slug: string,
  id: string,
}

function Subforum({
  topicData,
  slug,
  id,
}: SubforumProps) {
  const { isAuthenticated } = useStoreState();
  const { setMessage } = useStoreDispatch();

  const topic = filter(topicData, 'topic')[0];
  const [posts, addPost] = useState(filter(topicData, 'post'));
  const userList = filter(topicData, 'user');
  const getUser = (userId: number) => userList.find((user) => userId === user.id);
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
                type={1}
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
              type={1}
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
