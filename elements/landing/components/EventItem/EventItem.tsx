import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { faAward, faCalendar, faTimes } from '@fortawesome/free-solid-svg-icons';
import IEvent from '../../../../models/IEvent';
import Button from '../../../core/components/Button/Button';
import ExternalLink from '../../../core/components/ExternalLink/ExternalLink';
import {
  CalendarIconWrapper,
  EventBody,
  EventDescription,
  EventHeader,
  EventHostWrapper,
  EventInfos,
  EventItemWrapper,
  EventTitleWrapper,
} from './EventItem.styles';
import IconComponent from '../../../core/components/Icon/Icon';
import { FlexCenter } from '../../../../styles/global.styles';

interface EventItemProps {
  eventItem?: IEvent;
  title?: string;
  short_description?: string;
  infoItem?: boolean;
  pastEvent?: boolean;
  showModifiers?: boolean;
  onDelete?: (id) => number;
}

const EventItem = ({
  eventItem,
  title,
  short_description,
  pastEvent,
  infoItem,
  showModifiers,
  onDelete,
}: EventItemProps) => {
  if (infoItem) {
    return (
      <EventItemWrapper infoItem={infoItem}>
        <EventHeader>
          <EventTitleWrapper>
            <h3>{title}</h3>
          </EventTitleWrapper>
          <EventHostWrapper infoItem={infoItem}>
            <CalendarIconWrapper>
              <IconComponent icon={faCalendar} />
            </CalendarIconWrapper>
          </EventHostWrapper>
        </EventHeader>
        <EventBody>
          <EventDescription>
            <p>{short_description}</p>
          </EventDescription>
          <EventInfos infoItem />
        </EventBody>
      </EventItemWrapper>

    );
  }

  return (
    <EventItemWrapper pastEvent={pastEvent}>
      <EventHeader>
        <EventTitleWrapper>
          <h3>{eventItem.attributes.title}</h3>
        </EventTitleWrapper>
        <EventHostWrapper>
          {eventItem.attributes.host === 'Brickboard' ? (
            <Image src="/assets/images/bb_logo.png" alt="Brickboard" width="150" height="100" layout="responsive" />
          ) : (
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
        <EventInfos>
          <strong>{format(new Date(eventItem.attributes.event_date), 'dd.MM.yyyy')}</strong>
          {eventItem.attributes.url && (
            <ExternalLink href={eventItem.attributes.url} small>Zur Seite</ExternalLink>
          )}
          {eventItem.attributes.topic_url && (
            <Link href={`.${eventItem.attributes.topic_url}`}><Button small>Zum Thema</Button></Link>
          )}
        </EventInfos>
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
    </EventItemWrapper>
  );
};

export default EventItem;