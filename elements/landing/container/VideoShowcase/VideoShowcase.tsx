import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import EventItem from '../../components/EventItem/EventItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../../core/components/Button/Button';
import { FlexRight } from '../../../../styles/global.styles';
import { EventCalendarHeading, EventCalendarWrapper, SliderWrapper } from '../EventCalendar/EventCalendar.styles';
import VideoCard from '../../../core/container/VideoCard/VideoCard';
import findObject from '../../../../util/finder';
import ICategory from '../../../../models/ICategory';
import { VideoMargin } from './VideoShowcase.styles';

interface VideoShowcaseProps {
  movieList: any;
  authorList: any;
  categories: any;
}

const VideoShowcase = ({ movieList, authorList, categories }: VideoShowcaseProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    variableHeight: true,
    variableWidth: true,
    arrows: false,
    dots: false,
    speed: 1000,

    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          rows: 2,
        },
      },
    ],
  };
  const filterCategories = (movie) => (
    categories.filter((category: ICategory) => {
      for (const cat of movie.relationships.categories.data) {
        if (cat.id === category.id) return category;
      }
      return null;
    }));

  return (
    <EventCalendarWrapper>
      <EventCalendarHeading>
        Schon gesehen?
      </EventCalendarHeading>
      {movieList.length > 0 ? (
        <>
          <SliderWrapper>
            <Slider {...settings}>
              <EventItem
                infoItem
                borderless
                icon={faVideo}
                title="Brickfilme aus der Community"
                short_description="Hier werden zufällig Brickfilme aus der Community präsentiert! Schau sie dir an und lass ein Kommentar da!"
              />
              {movieList.map((movie) => (
                <VideoMargin>
                  <VideoCard
                    title={movie.attributes.title}
                    videoURL={movie.attributes.video_url}
                    categories={filterCategories(movie)}
                    key={`movie_${movie.id}`}
                    creator={
                      findObject(authorList,
                        movie.relationships.user.data.id)
                        .attributes.display_name
                    }
                    created_at={movie.attributes.created_at}
                  />
                </VideoMargin>
              ))}
            </Slider>
          </SliderWrapper>
          <FlexRight>
            <Link href="./forum/filmvorstellungen"><Button>Alle Filme anzeigen</Button></Link>
          </FlexRight>
        </>
      ) : (
        <p>Noch sind keine Events vorhanden</p>
      )}

    </EventCalendarWrapper>
  );
};

export default VideoShowcase;
