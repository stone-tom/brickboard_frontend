import IRelationship from './IRelationship';

export interface INewsAttributes {
  title: string,
  url?: string,
  topic_url?: string,
  user_id?: number
  short_description?: string,
  news_banner?: string,
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
