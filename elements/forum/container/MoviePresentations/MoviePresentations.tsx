import { differenceInHours } from 'date-fns';
import React from 'react';
import { useStoreState } from '../../../../context/custom_store';
import ICategory from '../../../../models/ICategory';
import IMessageboard from '../../../../models/IMessageboard';
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
  messageboard: IMessageboard,
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
  messageboard,
}: MoviePresentationProps) => {
  const { isAuthenticated, user } = useStoreState();
  const determineHot = (created_at, likes) => {
    const diff = differenceInHours(new Date(), new Date(created_at));
    if (diff < 72 && likes > 0) return true;
    return false;
  };

  return (
    <Loader isLoading={!movies}>
      {categories && (
        <FilterBar
          title={messageboard.attributes.name}
          onChange={(selectedItems) => onCategorySelect(selectedItems)}
          options={categories.filter((cat) => cat.attributes.is_active)}
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
                    hot={determineHot(movie.attributes.created_at, movie.attributes.likes_count)}
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
