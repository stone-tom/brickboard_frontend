import IRelationship from './IRelationship';

export interface ITopicAttributes {
  title: string,
  slug: string,
  posts_count: number,
  sticky: boolean,
  locked: boolean,
  hash_id?: string,
  moderation_state: 'pending_moderation' | 'approved' | 'blocked',
  last_post_at: string,
  type?: any,
  video_url?: string,
  movie_categories?: any,
  view_count: number,
  created_at: string,
  updated_at: string,
}

export default interface ITopic {
  id: string,
  type: string,
  attributes: ITopicAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
