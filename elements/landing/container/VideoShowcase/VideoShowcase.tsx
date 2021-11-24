import React from 'react';
import Link from 'next/link';
import Button from '../../../core/components/Button/Button';
import { FlexRight } from '../../../../styles/global.styles';
import MovieCard from '../../../core/container/MovieCard/MovieCard';
import findObject from '../../../../util/finder';
import ICategory from '../../../../models/ICategory';
import {
  VideoColumnsWrapper,
  VideoList,
  VideoMargin,
  VideoShowCaseHeading,
  VideoShowCaseText,
  VideoShowCaseWrapper,
} from './VideoShowcase.styles';

interface VideoShowcaseProps {
  movieList: any;
  authorList: any;
  categories: any;
}

const VideoShowcase = ({ movieList, authorList, categories }: VideoShowcaseProps) => {
  const filterCategories = (movie) => (
    categories.filter((category: ICategory) => {
      for (const cat of movie.relationships.categories.data) {
        if (cat.id === category.id) return category;
      }
      return null;
    }));

  return (
    <VideoColumnsWrapper>
      <div>
        <VideoShowCaseHeading>
          Schon gesehen?
        </VideoShowCaseHeading>
        <VideoShowCaseText>
          {`Hier werden zufällig Brickfilme aus 
      der Community präsentiert! 
      Schau sie dir an und lass ein Kommentar oder eine Bewertung da!`}
        </VideoShowCaseText>
      </div>

      {movieList.length > 0 ? (
        <VideoList>
          <VideoShowCaseWrapper>
            {movieList.map((movie) => (
              <VideoMargin key={`movie_${movie.id}`}>
                <MovieCard
                  id={movie.id}
                  title={movie.attributes.title}
                  videoURL={movie.attributes.video_url}
                  categories={filterCategories(movie)}
                  creator={
                    movie.relationships.user.data
                      ? (
                        findObject(authorList,
                          movie.relationships.user.data.id)
                          .attributes.display_name
                      ) : (
                        'Gelöschter User'
                      )
                  }
                  created_at={movie.attributes.created_at}
                />
              </VideoMargin>
            ))}
          </VideoShowCaseWrapper>
          <FlexRight>
            <Link href="./forum/filmvorstellungen"><Button>Alle Filme anzeigen</Button></Link>
          </FlexRight>
        </VideoList>
      ) : (
        <p>Noch sind keine Events vorhanden</p>
      )}

    </VideoColumnsWrapper>
  );
};

export default VideoShowcase;
