import { backendURL } from '../index';
import { patch } from '../../methods';
import { ICreateTopic } from '../../../elements/forum/container/MovieForm/MovieForm';

const updatePost = async (postId: number, values: ICreateTopic) => {
  const data = {
    post: {
      ...values,
    },
  };
  const fetchURL = `${backendURL}/posts/${postId}`;
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
