import React from 'react';
import ITopic from '../../../../models/ITopic';
import MovieCard from '../../../core/container/MovieCard/MovieCard';
import { PersonalInformationWrapper } from '../PersonalInformation/PersonalInformation.styles';
import {
  MovieWrapper,
  Wrapper,
} from './PersonalMovies.styles';

interface PersonalFilmsProps {
  movies: ITopic[],
  creator: string,
}

const PersonalMovies = ({
  movies,
  creator,
}: PersonalFilmsProps) => (
  <PersonalInformationWrapper>
    <MovieWrapper>
      {movies.map((movie) => (
        <Wrapper>
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.attributes.title}
            videoURL={movie.attributes.video_url}
            creator={creator}
            created_at={movie.attributes.created_at}
            categories={[]}
          />
        </Wrapper>
      ))}
    </MovieWrapper>
  </PersonalInformationWrapper>
);

export default PersonalMovies;
