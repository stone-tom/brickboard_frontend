import { backendURL } from '../index';
import { post } from '../../methods';

const markTopicAsRead = async (topicId: number | string) => {
  const fetchURL = `${backendURL}/action/topics/${topicId}/mark_as_read`;
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

export default markTopicAsRead;
