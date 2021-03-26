import { backendURL } from '../index';
import { deleteMethod } from '../../methods';

const deleteNews = async (id) => {
  const fetchURL = `${backendURL}/news/${id}`;

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

export default deleteNews;
