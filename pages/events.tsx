import React, { useState } from 'react';
import useSWR from 'swr';
import { GetStaticProps } from 'next';
import Layout from '../elements/core/container/Layout/Layout';
import { FlexRight, ViewWrapper } from '../styles/global.styles';
import { backendURL, deleteEvent, getEvents } from '../util/api';
import { useStoreDispatch, useStoreState } from '../context/custom_store';
import Button from '../elements/core/components/Button/Button';
import { get } from '../util/methods';
import IEvent from '../models/IEvent';
import EventItem from '../elements/landing/components/EventItem/EventItem';
import { EventList } from '../elements/landing/container/EventCalendar/EventCalendar.styles';
import EventCreator from '../elements/landing/container/EventCreator/EventCreator';
import Prompt from '../elements/core/container/Prompt/Prompt';
import { MessageType } from '../models/IMessage';

export const getStaticProps: GetStaticProps = async () => {
  const { content, fetchURL } = await getEvents();

  return {
    props: {
      content,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface NewsProps {
  content: any;
}
const NewsPage = ({ content }: NewsProps) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, mutate } = useSWR(
    `${backendURL}/events/page-${pageIndex}`,
    get,
    { revalidateOnMount: true, initialData: content },
  );
  const { isAuthenticated, user } = useStoreState();
  const { addComponent, setMessage } = useStoreDispatch();
  const [editorActive, setEditorActive] = useState(false);
  const toggleEditor = () => setEditorActive(!editorActive);

  if (data === undefined || data.data === undefined) {
    return (
      <Layout title="Events - Brickboard 2.0">
        <ViewWrapper center column>
          <h1>Keine Events vorhanden</h1>
        </ViewWrapper>
      </Layout>
    );
  }
  let eventList = data.data;

  const upcomingEvents = eventList.filter((eventItem: IEvent) => (
    new Date(eventItem.attributes.event_date) >= new Date()
  ));
  const pastEvents = eventList.filter((eventItem: IEvent) => (
    new Date(eventItem.attributes.event_date) < new Date(Date.now())
  ));

  const mutateEvents = (freshEvent) => {
    const insertIndex = eventList.findIndex((item: IEvent) => (
      new Date(item.attributes.event_date) > new Date(freshEvent.attributes.event_date)));
    eventList = eventList.splice(insertIndex, 0, freshEvent);
    toggleEditor();
  };

  const performDelete = async (id) => {
    const { error } = await deleteEvent(id);
    if (error) {
      setMessage({
        content: 'Fehler beim löschen',
        type: MessageType.error,
      });
    } else {
      setMessage({
        content: 'Event erfolgreich gelöscht',
        type: MessageType.success,
      });
      const updatedEvents = {
        data: data.data.filter((item) => {
          if (item.id === id) return null;
          return item;
        }),
        included: [
          ...data.included,
        ],
      };
      mutate(updatedEvents, false);
    }
  };

  const onTryDeleting = (id) => {
    addComponent((
      <Prompt
        headline="Löschen bestätigen?"
        onAccept={() => performDelete(id)}
      >
        <div>
          <p>Event löschen kann nicht rückgängig gemacht werden!</p>
        </div>
      </Prompt>));
  };

  return (
    <Layout title="Brickfilm-Events - Brickboard 2.0">
      <ViewWrapper>
        <h1>Alle Brickfilming Events</h1>
        {isAuthenticated && user.attributes.admin && (
          <FlexRight>
            <Button onClick={() => toggleEditor()}>
              {editorActive ? 'Abbrechen' : 'Event erstellen'}
            </Button>
          </FlexRight>
        )}
        {editorActive && (
          <EventCreator
            onCreateEvent={({ content: freshEvent }) => mutateEvents(freshEvent.data)}
          />
        )}
        <EventList space>
          {upcomingEvents.map((eventItem: IEvent) => {
            if (eventItem !== null) {
              return (
                <EventItem
                  key={`event_${eventItem.id}`}
                  eventItem={eventItem}
                  showModifiers={isAuthenticated && user.attributes.admin}
                  onDelete={({ id }) => onTryDeleting(id)}
                />
              );
            }
            return null;
          })}
        </EventList>
        <EventList>
          {pastEvents.map((eventItem: IEvent) => {
            if (eventItem !== null) {
              return (
                <EventItem
                  pastEvent
                  key={`event_${eventItem.id}`}
                  eventItem={eventItem}
                  showModifiers={isAuthenticated && user.attributes.admin}
                  onDelete={({ id }) => onTryDeleting(id)}

                />
              );
            }
            return null;
          })}
        </EventList>
        {pageIndex > 1 && (
          <Button small type="button" onClick={() => setPageIndex(pageIndex - 1)}>
            Vorige Seite
          </Button>
        )}
        {eventList.length >= 10 && (
          <Button small type="button" onClick={() => setPageIndex(pageIndex + 1)}>
            Nächste Seite
          </Button>
        )}
      </ViewWrapper>
    </Layout>
  );
};

export default NewsPage;
