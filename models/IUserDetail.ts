export interface IUserDetailAttributes {
  profile_banner: string,
  profile_description: string,
  occupation: string,
  date_of_registration: string,
  location: string,
  email: string,
  camera: string,
  cutting_program: string,
  sound: string,
  lighting: string,
  website_url: string,
  youtube_url: string,
  facebook_url: string,
  twitter_url: string,
  interests: string[],
  posts_count: number,
  movies_count: number,
  moderation_state: 'pending_moderation' | 'approved' | 'blocked',
}

export default interface IUserDetail {
  id: string,
  type: 'thredded_user_show_detail',
  attributes: IUserDetailAttributes,
}
