import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import Link from 'next/link';
import { ViewWrapper } from '../../../styles/global.styles';
import { useStoreDispatch, useStoreState } from '../../../context/custom_store';
import Layout from '../../../elements/core/container/Layout/Layout';
import Editor from '../../../elements/core/container/Editor/Editor';
import filterContent from '../../../util/filter';
import { createTopic, getMessageBoardGroups } from '../../../util/api';
import { MessageType } from '../../../models/IMessage';
import PresentMovieForm from '../../../elements/forum/container/PresentMovieForm/PresentMovieForm';
import getCategories from '../../../util/api/topic/get-categories';
import useSWR from 'swr';
import { get } from '../../../util/methods';

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

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { content, fetchURL } = await getCategories();

  return {
    props: {
      categories: {
        content,
        fetchURL,
      },
      slug: params.slug,
    },
    revalidate: 1,
  };
};

interface NeuesThemaProps {
  slug: string
  categories: {
    content: any,
    fetchURL: string,
  }
}

function NeuesThema({
  slug,
  categories,
}: NeuesThemaProps) {
  const { data } = useSWR(
    categories.fetchURL,
    get,
    {
      initialData: categories.content,
      revalidateOnMount: true,
    },
  );

  useEffect(() => {
    console.log(data);
  }, [data]);
  const { isAuthenticated } = useStoreState();
  const { setMessage } = useStoreDispatch();
  const router = useRouter();

  const submitTopic = async (title: string, editorContent: any) => {
    const { content, error } = await createTopic(slug, title, editorContent);
    if (error) {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
    if (content) {
      router.push(`../${slug}`);
    }
  };

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
        {slug !== 'filmvorstellungen' ? (
          <Editor
            onEditorSubmit={({ title, editorContent }) => submitTopic(title, editorContent)}
          />
        ) : (
          <PresentMovieForm
            categories={data.data.map((item) => item)}
          />
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default NeuesThema;
