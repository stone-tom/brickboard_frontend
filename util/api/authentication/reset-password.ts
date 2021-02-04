import { backendURL } from '../index';
import { put } from '../../methods';

const resetPassword = async (code: string, password: string, password_confirmation: string) => {
  const data = {
    user: {
      reset_password_token: code,
      password,
      password_confirmation,
    },
  };

  const fetchURL = `${backendURL}/password`;
  let content: any;
  let error: any;
  try {
    const res = await put(fetchURL, data);
    if (res && res.data) content = res;
    if (res && res.error) throw new Error(res.error);
    if (res && res.errors) throw new Error(res.errors.reset_password_token[0]);
  } catch (e) {
    error = e;
  }
  return {
    content,
    fetchURL,
    error,
  };
};

export default resetPassword;
