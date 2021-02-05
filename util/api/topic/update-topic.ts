import { backendURL } from '../index';
import { patch } from '../../methods';

const updateTopic = async (topicId: number | string, data: any) => {
  const fetchURL = `${backendURL}/topics/${topicId}`;
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

export default updateTopic;
