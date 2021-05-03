import { backendURL } from '../index';
import { deleteMethod } from '../../methods';

const deleteTopic = async (topicId) => {
  const fetchURL = `${backendURL}/topics/${topicId}`;

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

export default deleteTopic;
