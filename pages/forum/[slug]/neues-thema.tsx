import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import Link from 'next/link';
import { ViewWrapper } from '../../../styles/global.styles';
import { useAuthState } from '../../../context/auth';
import Layout from '../../../elements/core/container/Layout/Layout';
import CustomEditor from '../../../elements/core/container/Editor/Editor';
import filterContent from '../../../util/filter';
import { getMessageBoardGroups } from '../../../util/api';

export const getStaticPaths: GetStaticPaths = async () => {
  const { content } = await getMessageBoardGroups();

  const messageboards = filterContent(content, 'messageboard');

  return {
    paths: messageboards.map((board) => ({
      params: {
        slug: board.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => ({
  props: {
    slug: params.slug,
  },
  revalidate: 1,
});
function NeuesThema({ slug }) {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated) {
    return (
      <>
        <h1>Tut uns leid</h1>
        <p>Du darfst diesen Inhalt leider nur sehen wenn du angemeldet bist</p>
        <Link href="/login">Login</Link>
        <Link href="/">Startseite</Link>
      </>
    );
  }

  return (
    <Layout title={`Neues Thema: ${slug} - Brickboard 2.0`}>
      <ViewWrapper>
        <CustomEditor redirect={slug} />
      </ViewWrapper>
    </Layout>
  );
}

export default NeuesThema;
