import IRelationship from './IRelationship';

export interface ICategoryAttributes {
  name: string,
  description: string,
  locked: boolean,
  position: number,
  created_at: string,
  updated_at: string,
  category_icon: string
}

export default interface ICategory {
  id: string,
  type: string,
  attributes: ICategoryAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
