import { backendURL } from '../index';
import { deleteMethod } from '../../methods';

const logout = async () => {
  const fetchURL = `${backendURL}/logout`;
  let content: any;
  let error: any;
  try {
    deleteMethod(fetchURL);
  } catch (e) {
    error = e;
  }

  return {
    content,
    fetchURL,
    error,
  };
};

export default logout;
