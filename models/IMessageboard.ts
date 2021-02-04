import IRelationship from './IRelationship';

export interface IMessageboardtAttributes {
  name: string,
  description: string,
  slug: string,
  topics_count: number,
  posts_count: number,
  position?: number,
  locked: boolean,
  topic_types: any,
  created_at: string,
  updated_at: string,
}

export default interface IMessageboard {
  id: string,
  type: string,
  attributes: IMessageboardtAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
