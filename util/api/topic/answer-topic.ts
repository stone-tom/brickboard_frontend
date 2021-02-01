import { backendURL } from '../index';
import { post } from '../../methods';

const answerTopic = async (slug: string, id: number, customContent: string) => {
  const data = {
    post: {
      content: customContent,
    },
  };
  const fetchURL = `${backendURL}/${slug}/topics/${id}`;
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

export default answerTopic;
