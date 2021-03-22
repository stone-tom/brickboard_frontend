import React from 'react';
import Link from 'next/link';
import { useStoreState } from '../context/custom_store';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import NewsSection from '../elements/landing/container/NewsSection/NewsSection';

const demoNews = [{
  id: '1',
  type: 'news',
  attributes: {
    title: 'Das Brickboard 2.0 ',
    user_id: 1,
    url: '/assets/images/news2.jpg',
    created_at: '2021-02-07T22:32:55.742+01:00',
    updated_at: '2021-02-07T22:32:55.742+01:00',
    short_description: 'Willkommen auf der offiziellen Baustelle! Erfahre mehr, was bereits funktioniert!',
  },
  relationships: {
    thredded_user_detail: {
      data: {
        id: 1,
        type: 'thredded_user_detail',
      },
    },
  },
},
{
  id: '2',
  type: 'news',
  attributes: {
    title: 'Stopmotionsonntag',
    user_id: 1,
    created_at: '2021-02-07T22:32:55.742+01:00',
    updated_at: '2021-02-07T22:32:55.742+01:00',
    short_description: 'Immer wieder sonntags präsentiert das Brickboard einen besonderen Brickfilm. Egal ob Blockbuster oder Avantgarde, ob Klassiker oder brandneu, ob lustig oder dramatisch – wir möchten die Vielfalt des Brickfilms abbilden!',
  },
  relationships: {
    thredded_user_detail: {
      data: {
        id: 1,
        type: 'thredded_user_detail',
      },
    },
  },
},
{
  id: '3',
  type: 'news',
  attributes: {
    title: 'Demonews Beitrag',
    user_id: 1,
    created_at: '2021-02-07T22:32:55.742+01:00',
    updated_at: '2021-02-07T22:32:55.742+01:00',
    short_description: 'Reine Demozwecke',
  },
  relationships: {
    thredded_user_detail: {
      data: {
        id: 1,
        type: 'thredded_user_detail',
      },
    },
  },
},
];

function Home() {
  const { isAuthenticated, user } = useStoreState();
  return (
    <>
      <Layout title="Brickboard 2.0" fullWidth>
        <NewsSection newsList={demoNews} />
        <ViewWrapper>
          {isAuthenticated && user && user && (
            <>
              <h1>
                {`Hallo ${user.attributes.display_name}`}
              </h1>
            </>
          )}
          <h1>Willkommen auf der Baustelle des Brickboard`s (2.0).</h1>
          <p>Die Startseite wird leider erst in den kommenden Monaten programmiert.</p>
          <p>Das Forum und die Profile sind jedoch schon voll funktionsfähig!</p>
          <Link href="/forum">Zum Forum</Link>
        </ViewWrapper>
      </Layout>
    </>
  );
}

export default Home;
