import { backendURL } from '../index';
import { post } from '../../methods';

const sendLike = async (topicId: number | string) => {
  const fetchURL = `${backendURL}/topics/${topicId}/likes`;
  let content: any;
  let error: any;
  try {
    const res = await post(fetchURL);
    if (res && res.data) content = res;
    if (res && res.errors && res.errors.topic_id) error = res.errors.topic_id;
  } catch (e) {
    error = e;
  }
  return {
    content,
    fetchURL,
    error,
  };
};

export default sendLike;
