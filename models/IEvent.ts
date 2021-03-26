import IRelationship from './IRelationship';

export interface IEventAttributes {
  title: string,
  url?: string,
  topic_url?: string,
  host?: string,
  short_description?: string,
  description? : string,
  event_date?: string,
  end_of_submission_date?: string,
  created_at: string,
  updated_at: string,
}

export default interface IEvent {
  id: string,
  type: string,
  attributes: IEventAttributes,
  relationships: {
    [key: string]: IRelationship,
  },
}
