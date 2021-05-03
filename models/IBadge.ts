import IRelationship from './IRelationship';

export interface IBadgeAttributes {
  title: string,
  description: string,
  created_at: string,
  updated_at: string,
  badge_icon: string,
  secret: boolean,
}

export default interface IBadge {
  id: string,
  attributes: IBadgeAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
