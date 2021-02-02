import IThreddedUserAttributes from './IThreddedUserAttributes';

export interface IThreddedDetailData {
  id: string,
  type: 'thredded_user_detail',
}

export default interface IModerationUser {
  id: string,
  attributes: IThreddedUserAttributes,
  relationships: {
    thredded_user_detail: {
      data: IThreddedDetailData | null,
    }
    type: 'user',
  }
}
