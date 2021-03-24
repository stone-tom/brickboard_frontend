import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useStoreState } from '../context/custom_store';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../styles/global.styles';
import NewsSection from '../elements/landing/container/NewsSection/NewsSection';
import EventCalendar from '../elements/landing/container/EventCalendar/EventCalendar';
import { getLandingPage } from '../util/api';

export const getServerSideProps: GetServerSideProps = async () => {
  const { content } = await getLandingPage();

  console.log("FETCHED CONTENT",content);
  return {
    props: {
      content,
    },
  };
};

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

const demoEvents = [{
  id: '1',
  type: 'event',
  attributes: {
    title: 'THAC XVII',
    host: 'Bricks in Motion',
    url: 'https://blog.bricksinmotion.com/',
    due_date: '2021-04-03T22:32:55.742+01:00',
    created_at: '2021-02-07T22:32:55.742+01:00',
    updated_at: '2021-02-07T22:32:55.742+01:00',
    short_description: 'Ein Test',
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
  type: 'event',
  attributes: {
    title: 'Steinerei 2021',
    host: 'Brickboard',
    topic_url: '/forum/neuigkeiten/37',
    due_date: '2021-04-20T22:32:55.742+01:00',
    created_at: '2021-02-07T22:32:55.742+01:00',
    updated_at: '2021-02-07T22:32:55.742+01:00',
    short_description: 'Es gibt tolle Preise zu Gewinnen!',
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
  type: 'event',
  attributes: {
    title: 'Brickfilmers Guild Film Festival Award Show',
    host: 'Brick-filmers Guild',
    url: 'https://www.brick-a-brack.com/',
    due_date: '2021-04-20T22:32:55.742+01:00',
    created_at: '2021-02-07T22:32:55.742+01:00',
    updated_at: '2021-02-07T22:32:55.742+01:00',
    short_description: 'Beeilt euch, der Einsendeschluss ist bald!',
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

interface LandingPageProps{
  content: any;
}

function Home({ content } : LandingPageProps) {
  const eventList = content.current_events.data;
  console.log("CURRENT EVENTS", eventList);
  const { isAuthenticated, user } = useStoreState();
  return (
    <>
      <Layout title="Brickboard 2.0" fullWidth>
        <ViewWrapper dark fullWidth>
          <NewsSection newsList={demoNews} />
        </ViewWrapper>
        <ViewWrapper>

          <h1>Willkommen auf der Baustelle des Brickboard`s (2.0).</h1>
          <p>Das Forum und die Profile sind jedoch schon voll funktionsfähig!</p>
          <Link href="/forum">Zum Forum</Link>
          <EventCalendar eventList={eventList} />
        </ViewWrapper>
      </Layout>
    </>
  );
}

export default Home;
