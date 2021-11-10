import { backendURL } from '../index';
import { deleteMethod } from '../../methods';

const deleteBadge = async (id) => {
  const fetchURL = `${backendURL}/badges/${id}`;

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

export default deleteBadge;
