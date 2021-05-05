import React from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import styled from 'styled-components';
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
import findObject from '../util/finder';

const DefinitionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DefinitionBlock = styled.div`
  width: 40%;
  display: block;
`;

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
  const allBadges = filter(data.random_users, 'badge');
  const randomUsersDetails = filter(data.random_users, 'thredded_user_show_detail');
  return (
    <>
      <Layout title="Startseite - Willkommen am Brickboard 2.0" fullWidth>
        <ViewWrapper dark fullWidth small>
          <NewsSection newsList={newsList} authors={newsAuthors} />
        </ViewWrapper>
        <ViewWrapper small>

          <DefinitionWrapper>
            <DefinitionBlock>
              <strong>Brick|film</strong>
              [&#39;brɪkfɪlm], der; -s, -e &lt;engl. &raquo;Klötzchenfilm&laquo;&gt;:
              <br />
              <em>
                Animationsfilm in Stop-Motion-Technik,
                der überwiegend mit Lego® und anderem Klicksteinmaterial gedreht wurde..
              </em>
            </DefinitionBlock>
            <DefinitionBlock>
              <strong>Brick|board</strong>
              [&#39;brɪkbɔːd], das; -s, - &lt;engl. &raquo;Klötzchenbrett&laquo;&gt;:
              <br />
              <em>
                DIE deutschsprachige Community-Seite für
                alle Brickfilmer und Brickfilm-Interessierte!
              </em>

            </DefinitionBlock>
          </DefinitionWrapper>

          <Greeting>Willkommen auf der Baustelle des Brickboard`s (2.0).</Greeting>

          <EventCalendar eventList={eventList} />
        </ViewWrapper>
        {data.latest_user && (
          <NewMemberSection
            member={data.latest_user.data}
            memberdetails={data.latest_user.included[0]}
            badge={
              data.latest_user.data.relationships.thredded_main_badge.data
                ? findObject(allBadges,
                  data.latest_user.data.relationships.thredded_main_badge.data.id)
                : null
            }
          />
        )}
        <ViewWrapper small>
          <VideoShowcase
            movieList={movieList}
            authorList={movieAuthors}
            categories={movieCategories}
          />
        </ViewWrapper>
        <CommunitySection badges={allBadges} users={randomUsers} userDetails={randomUsersDetails} />
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
