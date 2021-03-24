import React from 'react';
import MovieCard from '../elements/core/container/MovieCard/MovieCard';
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
      category_icon: '/assets/images/vercel.svg',
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
  <MovieCard
    created_at="2021-02-02T15:05:48.632+01:00"
    creator="Test Creator"
    title="Title"
    categories={categories}
  />
);

export default PresentMovie;
