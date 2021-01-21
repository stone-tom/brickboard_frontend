import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import useSWR from 'swr';
import Link from 'next/link';
import { ContentContainer } from '../../styles/global.styles';
import TopicItem from '../../elements/core/components/TopicItem/TopicItem';
import { useAuthState } from '../../context/auth';
import Layout from '../../elements/core/container/Layout/Layout';
import Breadcrumbsbar from '../../elements/core/components/Breadcrumbs/Breadcrumbs';
import ForumHeading from '../../elements/core/components/ForumHeading/ForumHeading';
import BBButton from '../../elements/core/components/BBButton/BBButton';

// Welche Pfade prerendered werden können
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `https://${process.env.BACKEND_URL}/messageboard-groups`,
  );
  const messageboardData = await res.json();
  const messageboars = messageboardData.included;

  return {
    paths: messageboars.map((board) => ({
      params: {
        slug: board.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const res = await fetch(
    `https://${process.env.BACKEND_URL}/${params.slug}/topics/page-1`,
  );
  const topicsData = await res.json();
  let messageboardName = params.slug;
  if (
    topicsData !== undefined
    && topicsData !== null
    && topicsData.data !== undefined
  ) {
    messageboardName = topicsData.data[0].attributes.topic.included[0].attributes.name;
  }
  // console.log("THE TOPICS");
  // console.log(topicsData.data[0].attributes.topic.included[0].attributes.name);
  return {
    props: {
      topicsData,
      slug: params.slug,
      messageboardName,
    },
    revalidate: 1,
  };
};

const fetcher = (url) => fetch(url).then((r) => r.json());

function Subforum({ topicsData, slug, messageboardName }) {
  const [pageIndex, setPageIndex] = useState(1);
  const { isAuthenticated } = useAuthState();
  const {
    data,
  } = useSWR(
    `https://brickboard.herokuapp.com/${slug}/topics/page-${pageIndex}`,
    fetcher,
    { initialData: topicsData, revalidateOnMount: true },
  );
  const topicList = data.data;

  const createUserlist = () => {
    const userMap = new Map();
    topicList.forEach((topic) => {
      topic.attributes.topic.included.forEach((includedElement) => {
        if (includedElement.type === 'user') {
          if (!userMap.has(includedElement.id)) {
            userMap.set(includedElement.id, includedElement.attributes);
          }
        }
      });
    });
    return userMap;
  };
  const userList = createUserlist();

  const getUserName = (id) => {
    const foundUser = userList.get(`${id}`);
    if (foundUser === undefined) {
      return 'Not Loaded properly';
    }
    return foundUser.display_name;
  };

  return (
    <Layout title={`${messageboardName} - Brickboard 2.0`}>
      <ContentContainer>
        <Breadcrumbsbar slug={slug} />

        <ForumHeading title={`${messageboardName}`} />

        {topicList.map((topic) => (
          <TopicItem
            id={topic.attributes.topic.data.id}
            slug={slug}
            key={topic.attributes.topic.data.id}
            type={0}
            title={topic.attributes.topic.data.attributes.title}
            author={getUserName(
              topic.attributes.topic.data.relationships.user.data.id,
            )}
            lastAuthor={getUserName(
              topic.attributes.topic.data.relationships.last_user.data.id,
            )}
            views={420}
            sticky={topic.attributes.topic.data.attributes.sticky}
            comments={topic.attributes.topic.data.attributes.posts_count - 1}
            created={topic.attributes.topic.data.attributes.created_at}
            changed={topic.attributes.topic.data.attributes.last_post_at}
            updated
          />
        ))}
        <TopicItem
          id={1}
          type={0}
          slug="brickfilme-im-allgemeinen"
          title="Brickboard for president, community event"
          author="Knauser"
          views={420}
          comments={69}
          created={new Date(2020, 10, 14, 16, 5)}
          changed={new Date(2020, 10, 26, 8, 14)}
          updated
          locked
        />
        <TopicItem
          id={1}
          slug="brickfilme-im-allgemeinen"
          type={2}
          title="Das neue Brickboard ist da!"
          author="Andreas Bitzan"
          views={420}
          comments={69}
          created={new Date(2020, 10, 14, 16, 5)}
          changed={new Date(2020, 10, 26, 8, 14)}
          locked
        />
        <TopicItem
          id={1}
          slug="brickfilme-im-allgemeinen"
          type={1}
          title="Wer macht alles bei meinem Wettberwerb mit"
          author="Legostudio01"
          views={420}
          comments={69}
          created={new Date(2020, 10, 14, 16, 5)}
          changed={new Date(2020, 10, 26, 8, 14)}
          updated
          locked
        />

        {pageIndex > 1 && (
        <button type="button" onClick={() => setPageIndex(pageIndex - 1)}>
          Vorige Seite
        </button>
        )}
        {topicList.length >= 20 && (
        <button type="button" onClick={() => setPageIndex(pageIndex + 1)}>
          Nächste Seite
        </button>
        )}
        {isAuthenticated && (

        <Link href={`./${slug}/neuesThema`} passHref><BBButton alignRight add>Neues Thema erstellen</BBButton></Link>

        )}
      </ContentContainer>
    </Layout>
  );
}

export default Subforum;
