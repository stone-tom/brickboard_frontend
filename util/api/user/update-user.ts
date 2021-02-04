import { backendURL } from '../index';
import { put } from '../../methods';

const updateUser = async (
  data: FormData,
) => {
  const fetchURL = `${backendURL}/signup`;
  let content: any;
  let error: any;
  try {
    const res = await put(fetchURL, data);
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

export default updateUser;
