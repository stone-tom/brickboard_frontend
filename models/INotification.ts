import IRelationship from './IRelationship';

export interface IPNotificationAttributes {
  name: string,
  description: string,
  url: string,
  moderation_state: 'pending_moderation' | 'approved' | 'blocked',
  created_at: string,
  updated_at: string,
}

export default interface INotification {
  id: string,
  type: string,
  attributes: IPNotificationAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
