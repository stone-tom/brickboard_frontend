import { backendURL } from '../index';
import { post } from '../../methods';

const initiatePasswordReset = async (email: string) => {
  const data = {
    user: {
      email,
    },
  };

  const fetchURL = `${backendURL}/password`;
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
    if (res && res.errors) throw new Error(res.errors.email[0]);
  } catch (e) {
    error = e;
  }
  return {
    content,
    fetchURL,
    error,
  };
};

export default initiatePasswordReset;
