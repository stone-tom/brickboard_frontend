import IRelationship from './IRelationship';

export interface IReadStateAttributes {
  unread_posts_count: number,
  read_posts_count: number,
  integer?: number,
  read_at: string,
  locked: boolean,
  first_unread_pos_page?: number | null,
  las_read_post_page?: number | null,
}

export default interface IReadState {
  id: string,
  type: string,
  attributes: IReadStateAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
