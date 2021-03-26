import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { format } from 'date-fns';
import { faAward, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  icon?: IconProp;
  borderless?: boolean;
  pastEvent?: boolean;
  showModifiers?: boolean;
  onDelete?: (id) => void;
}

const EventItem = ({
  eventItem,
  title,
  short_description,
  pastEvent,
  icon,
  borderless,
  infoItem,
  showModifiers,
  onDelete,
}: EventItemProps) => {
  if (infoItem) {
    return (
      <EventItemWrapper borderless={borderless} infoItem={infoItem}>
        <EventHeader>
          <EventTitleWrapper>
            <h3>{title}</h3>
          </EventTitleWrapper>
          <EventHostWrapper infoItem={infoItem}>
            <CalendarIconWrapper>
              <IconComponent icon={icon} />
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
          {eventItem.attributes.host === 'Brickboard' && (
            <Image src="/assets/images/bb_logo.png" alt="Brickboard" width="150" height="100" layout="responsive" />
          )}
          {eventItem.attributes.host === 'Bricks in Motion' && (
            <Image src="/assets/images/bim.png" alt="Brickboard" width="150" height="100" layout="responsive" />
          )}
          {eventItem.attributes.host === 'Brickfilmers Guild' && (
            <Image src="/assets/images/bfg.png" alt="Brickboard" width="150" height="100" layout="responsive" />
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
