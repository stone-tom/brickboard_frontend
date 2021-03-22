import IRelationship from './IRelationship';

export interface INewsAttributes {
  title: string,
  url?: string,
  topic_id?: number,
  user_id?: number,
  short_description?: string,
  description?: string,
  created_at: string,
  updated_at: string,
}

export default interface INewsItem {
  id: string,
  type: string,
  attributes: INewsAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
