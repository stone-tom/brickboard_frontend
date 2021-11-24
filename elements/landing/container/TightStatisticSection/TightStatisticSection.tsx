import { faClipboard, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Counter from '../../../core/components/Counter/Counter';
import IconComponent from '../../../core/components/Icon/Icon';
import {
  MiddleStatsItem,
  StatisticContainer,
  StatisticsHeading,
  StatisticsWrapper,
  StatsDescription,
  StatsItem,
  StatsList,
  Statsnumber,
} from './TightStatisticSestion.styles';

interface StatisticSectionProps {
  user_count: number;
  topic_count: number;
  movie_count: number;
}

const TightStatisticSection = ({ user_count, topic_count, movie_count }: StatisticSectionProps) => (
  <StatisticContainer>
    <StatisticsWrapper>
      <StatisticsHeading>
        Das Forum in Zahlen
      </StatisticsHeading>
      <StatsList>
        <StatsItem>
          <Statsnumber><Counter end={topic_count} /></Statsnumber>
          <StatsDescription>
            <IconComponent icon={faClipboard} />
            <span>Beiträge</span>
          </StatsDescription>
        </StatsItem>
        <MiddleStatsItem>
          <Statsnumber><Counter end={movie_count} /></Statsnumber>
          <StatsDescription>
            <IconComponent icon={faVideo} />
            <span>Filme</span>
          </StatsDescription>
        </MiddleStatsItem>
        <StatsItem>
          <Statsnumber><Counter end={user_count} /></Statsnumber>
          <StatsDescription>
            <IconComponent icon={faUser} />
            <span>Nutzer</span>
          </StatsDescription>
        </StatsItem>
      </StatsList>
    </StatisticsWrapper>
  </StatisticContainer>
);

export default TightStatisticSection;
