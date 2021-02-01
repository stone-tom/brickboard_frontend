import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ViewWrapper, Hint } from '../../../styles/global.styles';
import Post from '../../../elements/forum/components/Post/Post';
import Layout from '../../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../../elements/core/components/Breadcrumbs/Breadcrumbs';
import { useStoreState } from '../../../context/custom_store';
import BBButton from '../../../elements/core/components/BBButton/BBButton';
import filterContent from '../../../util/filter';
import { getTopic } from '../../../util/api';

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

  // console.log("SERVERSIDE TOPIC");
  // console.log
  return {
    props: {
      topicData,
      slug,
    },
  };
};

function Subforum({ topicData, slug }) {
  const { isAuthenticated } = useStoreState();

  const topic = filterContent(topicData, 'topic')[0];
  const posts = filterContent(topicData, 'post');
  // const userList = filterUsers(topicData);
  const isLocked = topic.attributes.locked;

  // const getUser = (id: number) => userList.find((user) => id === user.id);

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
                content={postWrapper.attributes.content}
                type={1}
                author="To be implemented"
                key={postWrapper.id}
                created={postWrapper.attributes.created_at}
              />
            );
          }
          return (
            <Post
              title={`Re: ${topic.attributes.title}`}
              content={postWrapper.attributes.content}
              type={1}
              author="To be implemented"
              key={postWrapper.id}
              created={postWrapper.attributes.created_at}
            />
          );
        })}
        {isAuthenticated && !isLocked && (
          <Link
            href={`/forum/${slug}/${topic.id}/antworten`}
            passHref
          >
            <BBButton alignRight add>
              Antworten
            </BBButton>
          </Link>
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default Subforum;
