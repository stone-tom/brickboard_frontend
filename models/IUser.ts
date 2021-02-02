export default interface IUser {
  id: number,
  admin: boolean,
  display_name: string,
  created_at: string,
  updated_at: string,
  avatar: string,
  pending_moderation: 'locked' | 'pending' | 'approved',
}
