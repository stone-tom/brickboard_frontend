import { backendURL } from '../index';
import { postWithoutJson } from '../../methods';

const createBadge = async (
  data: FormData | string,
  formData?: boolean,
) => {
  const fetchURL = `${backendURL}/badges`;
  let content: any;
  let error: any;
  try {
    const res = await postWithoutJson(fetchURL, data, !formData && {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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

export default createBadge;
