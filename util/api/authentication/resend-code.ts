import { backendURL } from '../index';
import { post } from '../../methods';

const login = async (email: string) => {
  const data = {
    user: {
      email,
    },
  };

  const fetchURL = `${backendURL}/confirmation`;
  let content: any;
  let error: any;
  try {
    const res = await post(fetchURL, data, {
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

export default login;
