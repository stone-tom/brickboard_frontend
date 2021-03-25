import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import useSWR from 'swr';
import { Params } from 'next/dist/next-server/server/router';
import Link from 'next/link';
import { ViewWrapper } from '../../../styles/global.styles';
import { useStoreDispatch, useStoreState } from '../../../context/custom_store';
import Layout from '../../../elements/core/container/Layout/Layout';
import filterContent from '../../../util/filter';
import { createTopic, getMessageBoardGroups } from '../../../util/api';
import { MessageType } from '../../../models/IMessage';
import PresentMovieForm, { ICreateTopic } from '../../../elements/forum/container/PresentMovieForm/PresentMovieForm';
import getCategories from '../../../util/api/topic/get-categories';
import { get } from '../../../util/methods';
import PostForm from '../../../elements/forum/container/PostForm/PostForm';
import ICategory from '../../../models/ICategory';

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

  const submitTopic = async (values: ICreateTopic) => {
    const { content, error } = await createTopic(slug, values);
    if (error) {
      setMessage({
        content: `Fehler beim absenden: ${error.message}`,
        type: MessageType.error,
      });
    }
    if (content) {
      setMessage({
        content: 'Dein Thema wurde erfolgreich erstellt',
        type: MessageType.success,
      });
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
          <PostForm
            onEditorSubmit={({ title, editorContent }) => submitTopic({
              title,
              content: editorContent,
            })}
          />
        ) : (
          <PresentMovieForm
            categories={data.data.map((item: ICategory) => item)}
            onSubmit={(movieValues) => submitTopic(movieValues)}
          />
        )}
      </ViewWrapper>
    </Layout>
  );
}

export default NeuesThema;
