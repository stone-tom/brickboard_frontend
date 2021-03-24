import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import IEvent from '../../../../models/IEvent';
import { MessageType } from '../../../../models/IMessage';
import { FlexRight } from '../../../../styles/global.styles';
import { createEvent } from '../../../../util/api';
import Button from '../../../core/components/Button/Button';
import FormInput from '../../../core/components/FormInput/FormInput';
import {
  EventHeader,
  EventHostWrapper,
  EventTitleWrapper,
} from '../../components/EventItem/EventItem.styles';
import {
  EventCreatorInfos,
  EventCreatorMargin,
  EventCreatorSelect,
  EventCreatorTitle,
  EventCreatorWrapper,
} from './EventCreator.styles';

interface EventCreatorProps {
  eventItem?: IEvent;
  onCreateEvent?: any;
}

const EventCreator = ({
  eventItem, onCreateEvent,
}: EventCreatorProps) => {
  const [title, setTitle] = useState(eventItem ? eventItem.attributes.title : '');
  const [host, setHost] = useState(eventItem ? eventItem.attributes.host : 'Brickboard');
  const [short_description, setShortDescription] = useState(eventItem ? eventItem.attributes.short_description : '');
  const [event_date, setEventDate] = useState(eventItem ? eventItem.attributes.event_date : '');
  const [url, setUrl] = useState(eventItem ? eventItem.attributes.url : '');
  const [topic_url, setTopicUrl] = useState(eventItem ? eventItem.attributes.topic_url : '');
  const [submissionDate, setSubmissionDate] = useState(eventItem ? eventItem.attributes.end_of_submission_date : '');

  const { setMessage } = useStoreDispatch();

  const submitEvent = async () => {
    const data = {
      title,
      short_description,
      host,
      topic_url,
      url,
      event_date,
      end_of_submission_date: submissionDate,
    };
    const { content, error } = await createEvent(data);
    if (content) {
      setMessage({
        content: 'Event wurde erstellt',
        type: MessageType.success,
      });
      onCreateEvent({ content });
    }
    if (error) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    }
  };

  return (
    <EventCreatorWrapper>

      <EventHeader>
        <EventTitleWrapper>
          <EventCreatorTitle>Titel</EventCreatorTitle>
          <FormInput type="text" placeholder="Steinerei 20XX" onChange={(value) => setTitle(value)} defaultValue={eventItem && eventItem.attributes.title} />
        </EventTitleWrapper>
        <EventHostWrapper>
          <div>
            <EventCreatorTitle>Veranstalter</EventCreatorTitle>
            <EventCreatorSelect onChange={(value) => setHost(value.target.value)}>
              <option value="Brickboard">Brickboard</option>
              <option value="Bricks in Motion">Bricks in Motion</option>
              <option value="Brick à Brack">Brick à Brack</option>
              <option value="Brickfilmers Guild">Brickfilmers Guild</option>
              <option value="Andere">Andere</option>
            </EventCreatorSelect>
          </div>
        </EventHostWrapper>
      </EventHeader>
      <EventCreatorMargin>
        <EventCreatorTitle>Mini Beschreibung</EventCreatorTitle>
        <FormInput type="text" placeholder="Es gibt tolle Sachen zu gewinnen!" onChange={(value) => setShortDescription(value)} defaultValue={eventItem && eventItem.attributes.short_description} />
      </EventCreatorMargin>
      <EventCreatorInfos>
        <EventCreatorMargin>
          <EventCreatorTitle>Eventdatum</EventCreatorTitle>
          <FormInput type="date" onChange={(value) => setEventDate(value)} />
        </EventCreatorMargin>
        <EventCreatorMargin>
          <EventCreatorTitle>Einsendeschluss (optional)</EventCreatorTitle>
          <FormInput type="date" onChange={(value) => setSubmissionDate(value)} />
        </EventCreatorMargin>
        <EventCreatorMargin>
          <EventCreatorTitle>Link zur Seite (optional)</EventCreatorTitle>
          <FormInput type="text" placeholder="https://bricksinmotion.com" onChange={(value) => setUrl(value)} />
        </EventCreatorMargin>
        <EventCreatorMargin>
          <EventCreatorTitle>Pfad im Forum (optional)</EventCreatorTitle>
          <FormInput type="text" placeholder="/forum/steinerei-und-wettbewerbe/38" onChange={(value) => setTopicUrl(value)} />
        </EventCreatorMargin>
      </EventCreatorInfos>

      <FlexRight>
        <Button onClick={() => submitEvent()}>
          Abschicken
        </Button>
      </FlexRight>
    </EventCreatorWrapper>

  );
};

export default EventCreator;
