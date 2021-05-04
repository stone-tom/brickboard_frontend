import IRelationship from './IRelationship';

export default interface ITopicView {
  id: string,
  type: string,
  relationships: {
    [key: string]: IRelationship,
  },
}
