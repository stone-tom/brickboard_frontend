import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import ICategory from '../../../../models/ICategory';
import Icon from '../../../core/components/Icon/Icon';
import IUser from '../../../../models/IUser';
import Loader from '../../../core/components/Loader/Loader';
import Tag from '../../../core/components/Tag/Tag';
import { getYouTubeId } from '../../../core/container/MovieCard/MovieCard';
import {
  TopicMovieWrapper,
  VideoWrapper,
  InformationWrapper,
  Key,
  Values,
  Element,
  EditButton,
  FlexBottom,
} from './TopicMovie.styles';
import { useStoreState } from '../../../../context/custom_store';
import MovieForm, { IUpdateTopic } from '../MovieForm/MovieForm';
import Hint from '../../../core/components/Hint/Hint';
import Like from '../../components/Like/Like';

interface TopicMovieProps {
  categories?: ICategory[],
  previewCategories?: {
    label: string,
    value: string,
  }[]
  createdAt: string
  videoURL: string
  author: IUser,
  allCategories?: ICategory[],
  onUpdate?: (topicData: IUpdateTopic) => void,
  title?: string,
  isEditing?: boolean,
  setIsEditing?: (status: boolean) => void,
  content?: string,
  likes: number,
  onPerformLike?: () => void,
}

const TopicMovie = ({
  categories,
  createdAt,
  videoURL,
  author,
  previewCategories,
  allCategories,
  onUpdate,
  title,
  isEditing,
  setIsEditing,
  content,
  likes,
  onPerformLike,
}: TopicMovieProps) => {
  const { isAuthenticated, user } = useStoreState();
  const LikeMovie = () => {
    if (isAuthenticated) {
      onPerformLike();
    }
  };

  return (
    <>
      {isEditing ? (
        <MovieForm
          defaultValues={{
            selectedCategories: categories,
            video_url: videoURL,
            title,
            content,
            movie_created_at: createdAt,
          }}
          categories={allCategories}
          isEditing={isEditing}
          setIsEditing={() => setIsEditing(!isEditing)}
          onUpdate={(data) => onUpdate(data)}
        />
      ) : (
        <TopicMovieWrapper>
          <Loader isLoading={!createdAt || !videoURL || (!categories && !previewCategories)}>
            {isAuthenticated && author.id === user.id && !previewCategories && (
              <EditButton reset gray type="button" onClick={() => setIsEditing(!isEditing)}>
                {!isEditing
                  ? <Hint place="bottom" hint="Bearbeiten"><Icon icon={faEdit} /></Hint>
                  : <Hint place="bottom" hint="Abbrechen"><Icon icon={faTimes} /></Hint>}
              </EditButton>
            )}
            {(categories || previewCategories) && createdAt && videoURL && (
              <>
                <InformationWrapper>
                  <Element>
                    <Key>
                      Kategorien:
                    </Key>
                    <Values>
                      {previewCategories ? (
                        <>
                          {previewCategories.map((category) => (
                            <>
                              <Tag name={category.label} />
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {categories.map((category) => (
                            <>
                              <Tag name={category.attributes.name} />
                            </>
                          ))}
                        </>
                      )}

                    </Values>
                  </Element>
                  <Element>
                    <Key>
                      Erscheinungsdatum:
                    </Key>
                    <Values>
                      {format(new Date(createdAt), 'dd.MM.yyyy')}
                    </Values>
                  </Element>
                  <Element>
                    <Key>
                      Autoren:
                    </Key>
                    <Values>
                      <Link href={`/profil/${author.id}`}>
                        {author.attributes.display_name}
                      </Link>
                    </Values>
                  </Element>
                </InformationWrapper>
                <VideoWrapper>
                  {videoURL && (
                    <iframe
                      title="Youtube Video"
                      id="ytplayer"
                      width="640"
                      height="360"
                      src={`https://www.youtube.com/embed/${getYouTubeId(videoURL)}`}
                      frameBorder="0"
                    />
                  )}
                </VideoWrapper>
                {!isEditing && likes >= 0 && (
                  <FlexBottom>
                    <Like like_count={likes} onClick={() => LikeMovie()} />
                  </FlexBottom>
                )}

              </>
            )}
          </Loader>
        </TopicMovieWrapper>
      )}
    </>
  );
};

export default TopicMovie;
