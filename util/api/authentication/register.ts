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
    const res = await post(fetchURL, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (res && res.data) content = res;
    if (res && res.error) throw new Error(res.error);
    if (res && res.errors) throw new Error(res.errors.email);
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
