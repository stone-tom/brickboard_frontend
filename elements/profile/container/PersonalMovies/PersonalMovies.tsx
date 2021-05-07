import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import ICategory from '../../../../models/ICategory';
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
  movieCategories: ICategory[],
}

const PersonalMovies = ({
  movies,
  creator,
  movieCategories,
}: PersonalFilmsProps) => (
  <PersonalInformationWrapper>
    <MovieWrapper>
      {movies.map((movie) => {
        const categoryIds = movie.relationships.categories.data
          .map((elem: ICategory) => elem.id);
        const category = movieCategories
          .filter((item: ICategory) => categoryIds.includes(item.id));
        return (
          <Wrapper>
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.attributes.title}
              videoURL={movie.attributes.video_url}
              creator={creator}
              created_at={movie.attributes.created_at}
              categories={category}
            />
          </Wrapper>
        );
      })}
      {movies.length === 0 && (
        <p>Der Benutzer hat noch keine Videos veröffentlicht.</p>
      )}
    </MovieWrapper>
  </PersonalInformationWrapper>
);

export default PersonalMovies;
