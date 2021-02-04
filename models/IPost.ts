import IRelationship from './IRelationship';

export interface IPostAttributes {
  content: string,
  source: string,
  moderation_state: 'pending_moderation' | 'approved' | 'blocked',
  created_at: string,
  updated_at: string,
}

export default interface IPost {
  id: string,
  type: string,
  attributes: IPostAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
