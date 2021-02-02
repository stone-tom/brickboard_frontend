import IRelationship from './IRelationship';

export interface IUserAttributes {
  admin: boolean,
  display_name: string,
  created_at: string,
  updated_at: string,
  avatar: string,
}

export default interface IUser {
  id: string,
  attributes: IUserAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
