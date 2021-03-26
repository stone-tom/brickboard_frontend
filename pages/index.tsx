import React from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import Layout from '../elements/core/container/Layout/Layout';
import { Greeting, ViewWrapper } from '../styles/global.styles';
import NewsSection from '../elements/landing/container/NewsSection/NewsSection';
import EventCalendar from '../elements/landing/container/EventCalendar/EventCalendar';
import { getLandingPage } from '../util/api';
import StatisticSection from '../elements/landing/container/StatisticSection/StatisticSection';
import filter from '../util/filter';
import NewMemberSection from '../elements/landing/container/NewMemberSection/NewMemberSection';
import VideoShowcase from '../elements/landing/container/VideoShowcase/VideoShowcase';
import CommunitySection from '../elements/landing/container/CommunitySection/CommunitySection';
import { get } from '../util/methods';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getLandingPage();

  return {
    props: {
      content,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface LandingPageProps {
  content: any;
  fetchUrl: string;
}

function Home({ content, fetchUrl }: LandingPageProps) {
  if (!content) {
    return (
      <Layout title="Brickboard 2.0" fullWidth>
        <h1>Es ist noch kein Inhalt vorhanden</h1>
      </Layout>
    );
  }
  const { data } = useSWR(fetchUrl,
    get,
    { revalidateOnMount: true, initialData: content });
  const eventList = data.current_events.data;
  const newsList = data.latest_news.data;
  const newsAuthors = filter(data.latest_news, 'user');
  const movieList = data.random_movies.data;
  const movieAuthors = filter(data.random_movies, 'user');
  const movieCategories = filter(data.random_movies, 'category');
  const randomUsers = data.random_users.data;
  const randomUsersDetails = filter(data.random_users, 'thredded_user_show_detail');
  return (
    <>
      <Layout title="Startseite - Willkommen am Brickboard 2.0" fullWidth>
        <ViewWrapper dark fullWidth>
          <NewsSection newsList={newsList} authors={newsAuthors} />
        </ViewWrapper>
        <ViewWrapper small>

          <Greeting>Willkommen auf der Baustelle des Brickboard`s (2.0).</Greeting>

          <EventCalendar eventList={eventList} />
        </ViewWrapper>
        {data.latest_user && (
          <NewMemberSection
            member={data.latest_user.data}
            memberdetails={data.latest_user.included[0]}
          />
        )}
        <ViewWrapper small>
          <VideoShowcase
            movieList={movieList}
            authorList={movieAuthors}
            categories={movieCategories}
          />
        </ViewWrapper>
        <CommunitySection users={randomUsers} userDetails={randomUsersDetails} />
        <StatisticSection
          movie_count={content.movie_count}
          topic_count={content.topic_count}
          user_count={content.user_count}
        />
      </Layout>
    </>
  );
}

export default Home;
