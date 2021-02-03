import { backendURL } from '../index';
import { get } from '../../methods';

const getTopic = async (id: any) => {
  const fetchURL = `${backendURL}/topics/${id}`;
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

export default getTopic;
