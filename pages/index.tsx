import React from 'react';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { content } = await getLandingPage();
  return {
    props: {
      content,
    },
  };
};

interface LandingPageProps {
  content: any;
}

function Home({ content }: LandingPageProps) {
  if (!content) {
    return (
      <Layout title="Brickboard 2.0" fullWidth>
        <h1>Es ist noch kein Inhalt vorhanden</h1>
      </Layout>
    );
  }
  const eventList = content.current_events.data;
  const newsList = content.latest_news.data;
  const newsAuthors = filter(content.latest_news, 'user');
  const movieList = content.random_movies.data;
  const movieAuthors = filter(content.random_movies, 'user');
  const movieCategories = filter(content.random_movies, 'category');
  const randomUsers = content.random_users.data;
  const randomUsersDetails = filter(content.random_users, 'thredded_user_show_detail');
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
        {content.latest_user && (
          <NewMemberSection
            member={content.latest_user.data}
            memberdetails={content.latest_user.included[0]}
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
