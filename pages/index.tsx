import React from 'react';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import Layout from '../elements/core/container/Layout/Layout';
import { ViewWrapper, ViewWrapperGradient } from '../styles/global.styles';
import NewsSection from '../elements/landing/container/NewsSection/NewsSection';
import EventCalendar from '../elements/landing/container/EventCalendar/EventCalendar';
import { getLandingPage } from '../util/api';
import filter from '../util/filter';
import findObject from '../util/finder';
import ExplorationSection from '../elements/landing/container/ExplorationSection/ExplorationSection';
import TightStatisticSection from '../elements/landing/container/TightStatisticSection/TightStatisticSection';
import NewestContentSection from '../elements/landing/container/NewestContentSection/NewestContentSection';

const DefinitionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 3rem 15px 3rem 15px;
  margin: 0 auto;
  background: ${(props) => props.theme.gray};
  max-width: ${(props) => props.theme.max_container_width};

  @media ${(props) => props.theme.breakpoints.sm}{
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const DefinitionBlock = styled.div`
  width: 48%;
  display: block;
  font-size: 1.2rem;
  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const MiddleLine = styled.div`
  display: block;
  width: 2px;
  background: ${(props) => props.theme.grayfont};

  @media ${(props) => props.theme.breakpoints.sm}{
    width: 100%;
    height: 2px;
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const { content } = await getLandingPage();

  return {
    props: {
      content,
    },
    revalidate: 60,
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
  return (
    <>
      <Layout title="Startseite - Willkommen am Brickboard 2.0" fullWidth>
        <ViewWrapper fullWidth small>
          <NewsSection newsList={newsList} authors={newsAuthors} />
        </ViewWrapper>
        <ViewWrapper dark fullWidth small>
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
            <MiddleLine />
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
        </ViewWrapper>
        <ViewWrapper small>
          <EventCalendar eventList={eventList.slice(0, 4)} />
        </ViewWrapper>
        <ViewWrapper small>
          <NewestContentSection
            latestTopic={content.latest_topic.data}
            latestUser={content.latest_user.data}
            latestWriter={
              findObject(
                content.latest_topic.included,
                content.latest_topic.data.relationships.user.data.id,
              )
            }
            latestMessageboard={
              findObject(
                content.latest_topic.included,
                content.latest_topic.data.relationships.messageboard.data.id,
              )
            }
            badge={content.latest_user.data.relationships.thredded_main_badge.data
              ? findObject(allBadges,
                content.latest_user.data.relationships.thredded_main_badge.data.id)
              : null}
          />
        </ViewWrapper>
        <ViewWrapperGradient>
          <ExplorationSection
            badges={allBadges}
            movieList={movieList}
            userList={randomUsers}
            categories={movieCategories}
            authorList={movieAuthors}
          />
        </ViewWrapperGradient>
        <TightStatisticSection
          movie_count={content.movie_count}
          topic_count={content.topic_count}
          user_count={content.user_count}
        />
      </Layout>
    </>
  );
}

export default Home;
