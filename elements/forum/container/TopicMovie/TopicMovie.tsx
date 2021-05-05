import Link from 'next/link';
import React from 'react';
import ICategory from '../../../../models/ICategory';
import ITopic from '../../../../models/ITopic';
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
} from './TopicMovie.styles';

interface TopicMovieProps {
  categories: ICategory[],
  topic: ITopic,
  author: IUser,
}

const TopicMovie = ({
  categories,
  topic,
  author,
}: TopicMovieProps) => {
  console.log(topic, categories);
  return (
    <TopicMovieWrapper>
      <Loader isLoading={!topic || !categories}>
        {categories && topic && (
          <>
            <InformationWrapper>
              <Element>
                <Key>
                  Kategorien:
                </Key>
                <Values>
                  {categories.map((category) => (
                    <>
                      <Tag name={category.attributes.name} />
                    </>
                  ))}
                </Values>
              </Element>
              <Element>
                <Key>
                  Erscheinungsdatum:
                </Key>
                <Values>
                  {topic.attributes.movie_created_at}
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
              <iframe
                title="Youtube Video"
                id="ytplayer"
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${getYouTubeId(topic.attributes.video_url)}`}
                frameBorder="0"
              />
            </VideoWrapper>
          </>
        )}
      </Loader>
    </TopicMovieWrapper>
  );
};

export default TopicMovie;
