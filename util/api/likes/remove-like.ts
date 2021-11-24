import { backendURL } from '../index';
import { deleteMethod } from '../../methods';

const removeLike = async (topicId: number | string) => {
  const fetchURL = `${backendURL}/topics/${topicId}/unlike`;

  let content: any;
  let error: any;
  try {
    const status = await deleteMethod(fetchURL);
    if (status === 401) error = 'Nicht berechtigt';
    if (status === 500) error = 'Fehler am Server';
  } catch (e) {
    error = e;
  }

  return {
    content,
    fetchURL,
    error,
  };
};

export default removeLike;
