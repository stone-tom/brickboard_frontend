import React from 'react';
import VideoCard from '../elements/core/container/VideoCard/VideoCard';
import ICategory from '../models/ICategory';

const categories: ICategory[] = [
  {
    id: '1',
    type: 'category',
    attributes: {
      name: 'Action',
      description: 'Eine Beschreibung',
      locked: false,
      position: 0,
      created_at: '2021-03-23T21:13:14.907+01:00',
      updated_at: '2021-03-23T21:13:14.907+01:00',
      category_icon: '<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12"><path d="M24 24H0V0h24v24z" fill="none"/><circle fill="currentColor" cx="12" cy="12" r="8"/></svg>',
    },
    relationships: {
      topics: {
        data: [
          {
            id: '7',
            type: 'topic',
          },
        ],
      },
    },
  },
  {
    id: '2',
    type: 'category',
    attributes: {
      name: 'Thriller',
      description: 'Eine Beschreibung',
      locked: false,
      position: 0,
      created_at: '2021-03-23T21:13:14.907+01:00',
      updated_at: '2021-03-23T21:13:14.907+01:00',
      category_icon: null,
    },
    relationships: {
      topics: {
        data: [
          {
            id: '7',
            type: 'topic',
          },
        ],
      },
    },
  },
];

const PresentMovie = () => (
  <VideoCard
    created_at="2021-02-02T15:05:48.632+01:00"
    creator="Test Creator"
    title="Title"
    categories={categories}
  />
);

export default PresentMovie;