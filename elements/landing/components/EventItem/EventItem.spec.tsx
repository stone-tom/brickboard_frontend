import React from 'react';
import Link from 'next/link';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Image from 'next/image';
import { format } from 'date-fns';
import main from '../../../../themes/main';
import IEvent from '../../../../models/IEvent';
import EventItem from './EventItem';
import { EventDescription, EventInfos, EventTitleWrapper } from './EventItem.styles';
import { ExternalLink } from '../../../core/components/ExternalLink/ExternalLink.styles';
import Button from '../../../core/components/Button/Button';

const eventItem: IEvent = {
  id: '4',
  type: 'event',
  attributes: {
    title: 'Steinerei 2021',
    short_description: 'Thema des Wettbewerbs: Geheimnis!',
    url: 'https://forum.brickboard.de/viewtopic.php?f=18&t=5701',
    topic_url: null,
    host: 'Brickboard',
    event_date: '2021-05-01T11:00:00.000+02:00',
    end_of_submission_date: '2021-04-25T15:00:00.000+02:00',
    created_at: '2021-03-23T18:05:47.968+01:00',
    updated_at: '2021-03-23T21:52:54.647+01:00',
  },
  relationships: {
    user: {
      data:
      {
        id: '1',
        type: 'user',
      },

    },
  },
};

describe('Render EventItem Component', async () => {
  it('renders correctly', () => {
    const eventComponent = mount((
      <ThemeProvider theme={main}>
        <EventItem
          eventItem={eventItem}
        />
      </ThemeProvider>
    ));

    expect(eventComponent.find(EventItem).length).toBe(1);
    expect(eventComponent.find(Image).length).toBe(1);
    expect(eventComponent.find(EventTitleWrapper).text()).toBe(eventItem.attributes.title);
    expect(eventComponent.find(EventDescription).text())
      .toBe(eventItem.attributes.short_description);
    expect(eventComponent.find(ExternalLink).length).toBe(1);
    expect(eventComponent.find(Link).length).toBe(0);
    expect(eventComponent.find(EventInfos).text()).toContain(format(new Date(eventItem.attributes.event_date), 'dd.MM.yyyy'));
    expect(eventComponent.find(Image).first().prop('src')).toBe('/assets/images/bb_logo.png');
  });

  it('renders correctly as InfoItem', () => {
    const eventComponent = mount((
      <ThemeProvider theme={main}>
        <EventItem
          infoItem
          title="Infoitem"
          icon={faCalendar}
          short_description="Test"
        />
      </ThemeProvider>
    ));

    expect(eventComponent.find(EventItem).length).toBe(1);
    expect(eventComponent.find(Image).length).toBe(0);
    expect(eventComponent.find(EventTitleWrapper).text()).toBe('Infoitem');
    expect(eventComponent.find(Button).length).toBe(0);
    expect(eventComponent.find(EventDescription).text())
      .toBe('Test');
  });
});
