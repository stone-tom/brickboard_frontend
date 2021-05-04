import React from 'react';
import ICategory from '../../../../models/ICategory';
import ITopic from '../../../../models/ITopic';
import IUser from '../../../../models/IUser';
import findObject from '../../../../util/finder';
import Loader from '../../../core/components/Loader/Loader';
import MovieCard from '../../../core/container/MovieCard/MovieCard';
import { Wrapper } from '../../../profile/container/PersonalMovies/PersonalMovies.styles';
import FilterBar from '../FilterBar/FilterBar';
import { MoviePresentationWrapper, Empty } from './MoviePresentations.styles';

interface MoviePresentationProps {
  movies: ITopic[],
  users: IUser[],
  categories: ICategory[],
  filterLoading: boolean,
  onCategorySelect: (selected: number[]) => void,
}

const MoviePresentations = ({
  movies,
  users,
  categories,
  onCategorySelect,
  filterLoading,
}: MoviePresentationProps) => (
  <Loader isLoading={!movies}>
    {categories && (
      <FilterBar
        onChange={(selectedItems) => onCategorySelect(selectedItems)}
        options={categories}
      />
    )}
    <MoviePresentationWrapper>
      <Loader isLoading={filterLoading}>
        {categories && movies.map((movie: ITopic) => {
          const creator = findObject(users, movie.relationships.user.data.id)
            .attributes.display_name;
          const categoryIds = movie.relationships.categories.data
            .map((elem: ICategory) => elem.id);
          const category = categories
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
          <Empty>Es wurden keine Filme mit dieser Kategorie gefunden.</Empty>
        )}
      </Loader>
    </MoviePresentationWrapper>
  </Loader>
);

export default MoviePresentations;
