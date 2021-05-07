import React from 'react';
import { GetStaticProps } from 'next';
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
import findObject from '../util/finder';

const DefinitionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const DefinitionBlock = styled.div`
  width: 40%;
  display: block;
  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const { content } = await getLandingPage();

  return {
    props: {
      content,
    },
    revalidate: 1,
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
  const allBadges = filter(content.random_users, 'badge');
  const randomUsersDetails = filter(content.random_users, 'thredded_user_show_detail');
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
        {content.latest_user && (
          <NewMemberSection
            member={content.latest_user.data}
            memberdetails={content.latest_user.included[0]}
            badge={
              content.latest_user.data.relationships.thredded_main_badge.data
                ? findObject(allBadges,
                  content.latest_user.data.relationships.thredded_main_badge.data.id)
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
