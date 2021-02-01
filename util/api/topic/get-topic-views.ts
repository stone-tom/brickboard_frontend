import { backendURL } from '../index';
import { get } from '../../methods';

const getTopicViews = async (slug: string) => {
  const fetchURL = `${backendURL}/${slug}/topics/page-1`;
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

export default getTopicViews;