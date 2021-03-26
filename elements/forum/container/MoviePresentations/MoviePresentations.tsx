import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import ICategory from '../../../../models/ICategory';
import ITopic from '../../../../models/ITopic';
import IUser from '../../../../models/IUser';
import { backendURL } from '../../../../util/api';
import findObject from '../../../../util/finder';
import { get } from '../../../../util/methods';
import Loader from '../../../core/components/Loader/Loader';
import MovieCard from '../../../core/container/MovieCard/MovieCard';
import { Wrapper } from '../../../profile/container/PersonalMovies/PersonalMovies.styles';
import FilterBar from '../FilterBar/FilterBar';
import { MoviePresentationWrapper, Empty } from './MoviePresentations.styles';

interface MoviePresentationProps {
  movies: ITopic[],
  users: IUser[],
}

const MoviePresentations = ({
  movies,
  users,
}: MoviePresentationProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const { data: allCategories } = useSWR(`${backendURL}/categories`, get);
  const { data: filteredMovies } = useSWR(`${backendURL}/topics/filter-movies?category_ids=[${selected}]`, get);

  const currentMovies = useMemo(() => {
    if (filteredMovies && selected.length > 0) return filteredMovies.data;
    return movies;
  }, [selected, movies, filteredMovies]);

  return (
    <Loader isLoading={!currentMovies}>
      {allCategories && (
        <FilterBar
          onChange={(selectedItems) => setSelected(selectedItems)}
          options={allCategories.data}
        />
      )}
      <MoviePresentationWrapper>
        {allCategories && currentMovies.map((movie: ITopic) => {
          const creator = findObject(users, movie.relationships.user.data.id)
            .attributes.display_name;
          const categoryIds = movie.relationships.categories.data
            .map((elem: ICategory) => elem.id);
          const category = allCategories.data
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
        {currentMovies.length === 0 && (
          <Empty>Es wurden keine Filme mit dieser Kategorie gefunden.</Empty>
        )}
      </MoviePresentationWrapper>
    </Loader>
  );
};

export default MoviePresentations;
