import { backendURL } from '../index';
import { post } from '../../methods';

const banPost = async (postId: number, moderation_state: string) => {
  const data = {
    id: postId,
    moderation_state,
  };
  const fetchURL = `${backendURL}/admin/moderation`;
  let content: any;
  let error: any;
  try {
    const res = await post(fetchURL, data);
    if (res && res.data) content = res;
    if (res && res.error) throw new Error(res.error);
  } catch (e) {
    error = e;
  }
  return {
    content,
    fetchURL,
    error,
  };
};

export default banPost;
