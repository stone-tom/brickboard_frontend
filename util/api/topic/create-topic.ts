import { backendURL } from '../index';
import { post } from '../../methods';

const createTopic = async (slug: string, data: any) => {
  const fetchURL = `${backendURL}/${slug}/topics/`;
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

export default createTopic;
