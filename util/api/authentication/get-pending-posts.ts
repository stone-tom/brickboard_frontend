import { backendURL } from '../index';
import { get } from '../../methods';

const getPendingPosts = async () => {
  const fetchURL = `${backendURL}/admin/moderation/page-1`;

  let content: any;
  let error: any;
  try {
    const res = await get(fetchURL);
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

export default getPendingPosts;
