import { backendURL } from '../index';
import { post } from '../../methods';

const login = async (email: string, password: string) => {
  const data = {
    user: {
      email,
      password,
    },
  };

  const fetchURL = `${backendURL}/login`;
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

export default login;
