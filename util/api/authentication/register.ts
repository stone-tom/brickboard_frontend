import { backendURL } from '../index';
import { post } from '../../methods';

const register = async (email: string, displayName: string, password: string) => {
  const data = {
    user: {
      email,
      display_name: displayName,
      password,
    },
  };
  const fetchURL = `${backendURL}/signup`;

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

export default register;