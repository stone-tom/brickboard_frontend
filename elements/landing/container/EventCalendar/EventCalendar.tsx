import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IEvent from '../../../../models/IEvent';
import EventItem from '../../components/EventItem/EventItem';
import {
  CalendarButtonWrapper,
  CalendarImageWrapper,
  CalendarSection,
  EventCalendarHeading,
  EventCalendarWrapper,
  EventList,
} from './EventCalendar.styles';
import { MenuLink } from '../../../core/components/MenuLink/MenuLink.styles';

interface EventCalendarProps {
  eventList: any;
}

const EventCalendar = ({ eventList }: EventCalendarProps) => (
  <EventCalendarWrapper>
    <EventCalendarHeading>
      Kommende Brickfilm-Events
    </EventCalendarHeading>
    <CalendarSection>
      <EventList>
        {eventList.length > 0 ? (
          <>
            {eventList.map((eventItem: IEvent) => (
              <EventItem
                eventItem={eventItem}
                key={`event_${eventItem.id}`}
              />
            ))}
          </>
        ) : (
          <li>Keine Events vorhanden</li>
        )}
      </EventList>
      <CalendarButtonWrapper>
        <Link href="./events" passHref><MenuLink>Alle Events anzeigen</MenuLink></Link>
      </CalendarButtonWrapper>
    </CalendarSection>
    <CalendarImageWrapper>
      <Image src="/assets/images/brickboard-promo-edgeless.jpg" alt="Peter beim Brickfilmen" layout="fill" objectFit="contain" />
    </CalendarImageWrapper>
  </EventCalendarWrapper>
);

export default EventCalendar;
