import { backendURL } from '../index';
import { patchWithoutJson } from '../../methods';

const updateNews = async (newsId: number, data: FormData | string) => {
  const fetchURL = `${backendURL}/news/${newsId}`;
  let content: any;
  let error: any;
  try {
    const res = await patchWithoutJson(fetchURL, data);
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

export default updateNews;
