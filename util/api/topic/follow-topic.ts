import { backendURL } from '../index';
import { post } from '../../methods';

const followTopic = async (topicId: number, follow: boolean) => {
  let fetchURL = '';
  if (follow) {
    fetchURL = `${backendURL}/topics/${topicId}/follow`;
  } else {
    fetchURL = `${backendURL}/topics/${topicId}/unfollow`;
  }
  let content: any;
  let error: any;
  try {
    const res = await post(fetchURL);
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

export default followTopic;
