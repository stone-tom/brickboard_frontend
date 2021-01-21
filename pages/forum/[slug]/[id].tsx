import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ContentContainer, Hint } from '../../../styles/global.styles';
import Post from '../../../elements/core/components/Post/Post';
import Layout from '../../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../../elements/core/components/Breadcrumbs/Breadcrumbs';
import { useAuthState } from '../../../context/auth';
import BBButton from '../../../elements/core/components/BBButton/BBButton';

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

  const res = await fetch(
    `https://${process.env.BACKEND_URL}/${slug}/topics/${id}`,
  );
  const topicData = await res.json();

  const topic = topicData.data.attributes;
  // console.log("SERVERSIDE TOPIC");
  // console.log
  return {
    props: {
      topic,
      slug,
    },
  };
};

function Subforum({ topic, slug }) {
  const { isAuthenticated } = useAuthState();
  const isLocked = topic.topic.data.attributes.topic.data.attributes.locked;

  return (
    <Layout
      title={`${topic.topic.data.attributes.topic.data.attributes.title} - Brickboard 2.0`}
    >
      <ContentContainer>
        <Breadcrumbsbar
          slug={slug}
          id={topic.topic.data.attributes.topic.data.attributes.id}
          topic={topic.topic.data.attributes.topic.data.attributes.title}
        />

        <h1>{topic.topic.data.attributes.topic.data.attributes.title}</h1>
        {isLocked && (
          <Hint>
            Dieses Thema wurde von einem der Admins gesperrt. Du kannst keine
            Antwort posten.
          </Hint>
        )}
        {topic.post_views.data.map((postWrapper, index) => {
          if (index === 0) {
            return (
              <Post
                content={postWrapper.attributes.post.data.attributes.content}
                type={1}
                author={
                  topic.topic.data.attributes.topic.included[1].attributes
                    .display_name
                }
                key={postWrapper.attributes.post.data.id}
                created={postWrapper.attributes.post.data.attributes.created_at}
              />
            );
          }
          return (
            <Post
              title={`Re: ${topic.topic.data.attributes.topic.data.attributes.title}`}
              content={postWrapper.attributes.post.data.attributes.content}
              type={1}
              author={
                topic.topic.data.attributes.topic.included[1].attributes
                  .display_name
              }
              key={postWrapper.attributes.post.data.id}
              created={postWrapper.attributes.post.data.attributes.created_at}
            />
          );
        })}
        {isAuthenticated && !isLocked && (
          <Link
            href={`/forum/${slug}/${topic.topic.data.attributes.topic.data.id}/antworten`}
            passHref
          >
            <BBButton alignRight add>
              Antworten
            </BBButton>
          </Link>
        )}
      </ContentContainer>
    </Layout>
  );
}

export default Subforum;
