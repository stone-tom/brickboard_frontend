import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import EventItem from '../../components/EventItem/EventItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../../core/components/Button/Button';
import { FlexRight } from '../../../../styles/global.styles';
import { EventCalendarHeading, EventCalendarWrapper } from '../EventCalendar/EventCalendar.styles';
import VideoCard from '../../../core/container/VideoCard/VideoCard';
import findObject from '../../../../util/finder';
import ICategory from '../../../../models/ICategory';

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
    autoplay: true,
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
  console.log("THE MOVIES", movieList);
  console.log("THE CATEGORIES", categories);
  console.log("THE AUTHORS", authorList);

  const filterCategories = (movie) => {
    console.log("THE MOVIE CATS", movie.relationships.categories.data);

    const result = categories.filter((category: ICategory) => {
      for (const cat of movie.relationships.categories.data) {
        if (cat.id === category.id) return category;
      }
      return null;
    });
    console.log("RESULT", result);
    return result;
  };

  return (
    <EventCalendarWrapper>
      <EventCalendarHeading>
        Schon gesehen? Unsere Filmempfehlungen:
      </EventCalendarHeading>
      {movieList.length > 0 ? (
        <>
          <Slider {...settings}>
            <EventItem
              infoItem
              title="Brickfilme aus der Community"
              short_description="Hier werden zufällig Brickfilme aus der Community präsentiert! Schau sie dir an und lass ein Kommentar da!"
            />
            {movieList.map((movie) => (
              <VideoCard
                title={movie.attributes.title}
                videoURL={movie.attributes.video_url}
                categories={filterCategories(movie)}
                key={`movie_${movie.id}`}
                creator={findObject(authorList, movie.relationships.user.data.id)}
                created_at={movie.attributes.created_at}
              />
            ))}
          </Slider>
          <FlexRight>
            <Link href="./events"><Button>Alle Events anzeigen</Button></Link>
          </FlexRight>
        </>
      ) : (
        <p>Noch sind keine Events vorhanden</p>
      )}

    </EventCalendarWrapper>
  );
};

export default VideoShowcase;
