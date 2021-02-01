import { backendURL } from '../index';
import { patch } from '../../methods';

const updatePost = async (slug: string,
  topicId: number, postId: number, customContent: string) => {
  const data = {
    post: {
      content: customContent,
    },
  };
  const fetchURL = `${backendURL}/${slug}/topics/${topicId}/${postId}`;
  let content: any;
  let error: any;
  try {
    const res = await patch(fetchURL, data);
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

export default updatePost;
