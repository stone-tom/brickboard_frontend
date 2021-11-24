import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import { faAward, faTimes } from '@fortawesome/free-solid-svg-icons';
import IEvent from '../../../../models/IEvent';
import Button from '../../../core/components/Button/Button';
import {
  CalendarIconWrapper,
  EventBody,
  EventDate,
  EventDay,
  EventDescription,
  EventHeader,
  EventHostWrapper,
  EventItemWrapper,
  EventItemWrapperLink,
  EventMonth,
  EventTitleWrapper,
} from './EventItem.styles';
import IconComponent from '../../../core/components/Icon/Icon';
import { FlexCenter } from '../../../../styles/global.styles';
import Hint from '../../../core/components/Hint/Hint';

interface EventItemProps {
  eventItem?: IEvent;
  title?: string;
  short_description?: string;
  pastEvent?: boolean;
  showModifiers?: boolean;
  onDelete?: (id) => void;
}

const EventItem = ({
  eventItem,
  pastEvent,
  showModifiers,
  onDelete,
}: EventItemProps) => {
  const item = (
    <>
      <EventDate>
        <EventDay>
          {format(new Date(eventItem.attributes.event_date), 'dd.')}
        </EventDay>
        <EventMonth>
          {format(new Date(eventItem.attributes.event_date), 'MMM', { locale: de })}
        </EventMonth>
      </EventDate>
      <EventHeader>
        <EventTitleWrapper>
          <h3>{eventItem.attributes.title}</h3>
        </EventTitleWrapper>
        <EventHostWrapper>
          {eventItem.attributes.host === 'Brickboard' && (
            <Hint hint="Brickboard Event">
              <Image src="/assets/images/bb_logo.png" alt="Brickboard" layout="fill" objectFit="contain" />
            </Hint>
          )}
          {eventItem.attributes.host === 'Bricks in Motion' && (
            <Hint hint="Bricks in Motion Event">
              <Image src="/assets/images/bim.png" alt="Bricks in Motion" layout="fill" objectFit="contain" />
            </Hint>
          )}
          {eventItem.attributes.host === 'Brickfilmers Guild' && (
            <Hint hint="Brickfilmers Guild Event">
              <Image src="/assets/images/bfg.png" alt="Brickfilmersguild" layout="fill" objectFit="contain" />
            </Hint>
          )}
          {(eventItem.attributes.host === 'Andere' || eventItem.attributes.host === 'Brick à Brack') && (
            <CalendarIconWrapper dark>
              <IconComponent icon={faAward} />
            </CalendarIconWrapper>
          )}
        </EventHostWrapper>
      </EventHeader>
      <EventBody>
        <EventDescription>
          <p>{eventItem.attributes.short_description}</p>
        </EventDescription>
        {showModifiers && (
          <FlexCenter>
            <Button
              reset
              icon={faTimes}
              onClick={() => onDelete({ id: eventItem.id })}
            >
              Löschen
            </Button>
          </FlexCenter>
        )}
      </EventBody>
    </>
  );

  if (eventItem && eventItem.attributes.topic_url) {
    return (
      <Link href={eventItem.attributes.topic_url} passHref>
        <EventItemWrapperLink pastEvent={pastEvent}>
          {item}
        </EventItemWrapperLink>
      </Link>
    );
  }
  if (eventItem && eventItem.attributes.url) {
    return (
      <EventItemWrapperLink href={eventItem.attributes.url} pastEvent={pastEvent}>
        {item}
      </EventItemWrapperLink>
    );
  }

  return (
    <EventItemWrapper pastEvent={pastEvent}>
      {item}
    </EventItemWrapper>
  );
};

export default EventItem;
