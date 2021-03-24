import { backendURL } from '../index';
import { deleteMethod } from '../../methods';

const deleteEvents = async (id) => {
  const fetchURL = `${backendURL}/events/${id}`;

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

export default deleteEvents;
