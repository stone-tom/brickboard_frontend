import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import ICategory from '../../../../models/ICategory';
import IReadState from '../../../../models/IReadState';
import ITopic from '../../../../models/ITopic';
import ITopicView from '../../../../models/ITopicView';
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
  readStates?: IReadState[],
  topicViews?: ITopicView[],
  displayReadstates?: boolean,
  onCategorySelect: (selected: number[]) => void,
}

const MoviePresentations = ({
  movies,
  users,
  categories,
  onCategorySelect,
  filterLoading,
  readStates,
  displayReadstates = false,
  topicViews,
}: MoviePresentationProps) => {
  const { isAuthenticated, user } = useStoreState();
  return (
    <Loader isLoading={!movies}>
      {categories && (
        <FilterBar
          onChange={(selectedItems) => onCategorySelect(selectedItems)}
          options={categories}
        />
      )}
      <MoviePresentationWrapper>
        <Loader isLoading={filterLoading}>
          {categories && topicViews.map((topicView: ITopicView) => {
            const movie: ITopic = findObject(movies, topicView.relationships.topic.data.id);
            const creator: IUser = movie.relationships.user.data ? findObject(users, movie.relationships.user.data.id) : { attributes: { display_name: 'Gelöschter User' } };
            const categoryIds = movie.relationships.categories.data
              .map((elem: ICategory) => elem.id);
            const category = categories
              .filter((item: ICategory) => categoryIds.includes(item.id));

            let readstate = null;

            if (topicView.relationships.read_state !== undefined) {
              readstate = findObject(readStates, topicView.relationships.read_state.data.id);
            }
            let unread = false;
            if ((displayReadstates && (readstate === null && isAuthenticated))
              || (readstate !== null && readstate.attributes.unread_posts_count > 0)) {
              unread = true;
            }
            if (movie.attributes.moderation_state === 'approved'
              || (isAuthenticated && ((creator.id === user.id) || user.attributes.admin))) {
              return (
                <Wrapper key={`movie_${movie.id}`}>
                  <MovieCard
                    id={movie.id}
                    title={movie.attributes.title}
                    videoURL={movie.attributes.video_url}
                    creator={creator.attributes.display_name}
                    created_at={movie.attributes.created_at}
                    categories={category}
                    unread={unread}
                  />
                </Wrapper>
              );
            }
            return null;
          })}
          {movies.length === 0 && (
            <Empty>Es wurden keine Filme mit dieser Kategorie gefunden.</Empty>
          )}
        </Loader>
      </MoviePresentationWrapper>
    </Loader>
  );
};

export default MoviePresentations;
