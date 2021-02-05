import { backendURL } from '../index';
import { put } from '../../methods';

const updateUserDetail = async (
  id: string,
  data: FormData | string,
  formData?: boolean,
) => {
  const fetchURL = `${backendURL}/user-details/${id}`;
  let content: any;
  let error: any;
  try {
    const res = await put(fetchURL, data, !formData && {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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

export default updateUserDetail;
