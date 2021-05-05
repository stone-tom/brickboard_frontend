import IRelationship from './IRelationship';

export interface IMessageboardtAttributes {
  name: string,
  description: string,
  slug: string,
  topics_count: number,
  movies_count?: number,
  posts_count: number,
  position?: number,
  locked: boolean,
  topic_types: any,
  created_at: string,
  updated_at: string,
  unread_topics_count: number,
}

export default interface IMessageboard {
  id: string,
  type: string,
  attributes: IMessageboardtAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
