import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
} from './TopicMovie.styles';
import { useStoreState } from '../../../../context/custom_store';

interface TopicMovieProps {
  categories?: ICategory[],
  previewCategories?: {
    label: string,
    value: string,
  }[]
  createdAt: string
  videoURL: string
  author: IUser,
}

const TopicMovie = ({
  categories,
  createdAt,
  videoURL,
  author,
  previewCategories,
}: TopicMovieProps) => {
  const { isAuthenticated, user } = useStoreState();
  return (
    <TopicMovieWrapper>
      <Loader isLoading={!createdAt || !videoURL || (!categories && !previewCategories)}>
        {isAuthenticated && author.id === user.id && !previewCategories && (
          <EditButton
            reset
          >
            <Icon icon={faEdit} />
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
          </>
        )}
      </Loader>
    </TopicMovieWrapper>
  );
};

export default TopicMovie;