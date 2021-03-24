import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import IEvent from '../../../../models/IEvent';
import EventItem from '../../components/EventItem/EventItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  EventCalendarHeading,
  EventCalendarWrapper,
} from './EventCalendar.styles';
import Button from '../../../core/components/Button/Button';
import { FlexRight } from '../../../../styles/global.styles';

interface EventCalendarProps {
  eventList: any;
}

const EventCalendar = ({ eventList }: EventCalendarProps) => {
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

  return (
    <EventCalendarWrapper>
      <EventCalendarHeading>
        Eventkalender
      </EventCalendarHeading>
      <Slider {...settings}>
        <EventItem
          infoItem
          title="Kommende Events"
          short_description="Hier sind alle kommenden Events aus der Brickfilmwelt aufgelistet"
        />
        {eventList.map((eventItem: IEvent) => (
          <EventItem
            eventItem={eventItem}
            key={`event_${eventItem.id}`}
          />
        ))}
      </Slider>
      <FlexRight>
        <Link href="./events"><Button>Alle Events anzeigen</Button></Link>
      </FlexRight>
    </EventCalendarWrapper>
  );
};

export default EventCalendar;
