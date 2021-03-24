import Image from 'next/image';
import React from 'react';
import Counter from '../../../core/components/Counter/Counter';
import {
  StatisticsHeader,
  StatisticsHeading,
  StatisticsWrapper,
  StatsDescription,
  StatsItem,
  Statsnumber,
} from './StatisticSection.styles';

interface StatisticSectionProps {
  user_count: number;
  topic_count: number;
  movie_count: number;
}

const StatisticSection = ({ user_count, topic_count, movie_count }: StatisticSectionProps) => (

  <StatisticsWrapper>
    <StatisticsHeader>
      <StatisticsHeading>
        Das Forum in Zahlen
      </StatisticsHeading>
    </StatisticsHeader>
    <StatsItem>
      <Image src="/assets/images/blog.svg" width="100" height="100" />
      <Statsnumber><Counter end={topic_count} /></Statsnumber>
      <StatsDescription>Beiträge</StatsDescription>
    </StatsItem>
    <StatsItem>
      <Image src="/assets/images/camera.svg" width="100" height="100" />
      <Statsnumber><Counter end={movie_count} /></Statsnumber>
      <StatsDescription>Filme</StatsDescription>
    </StatsItem>
    <StatsItem>
      <Image src="/assets/images/lego.svg" width="100" height="100" />
      <Statsnumber><Counter end={user_count} /></Statsnumber>
      <StatsDescription>Nutzer</StatsDescription>
    </StatsItem>
  </StatisticsWrapper>

);

export default StatisticSection;
