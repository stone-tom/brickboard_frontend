export default interface IRelationship {
  data: {
    id: string,
    type: string,
  } | {
    id: string,
    type: string,
  }[] | any
}
