export default interface IPost {
  id: string,
  attributes: {
    content: string,
    created_at: string,
    moderation_state: 'pending_moderation' | 'approved',
    source: string,
    updated_at: string,
  }
}
