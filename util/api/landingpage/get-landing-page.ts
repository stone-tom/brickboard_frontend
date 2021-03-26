import { backendURL } from '../index';
import { get } from '../../methods';

const getLandingPage = async () => {
  const fetchURL = `${backendURL}/homepage?desired_objects=3`;
  let content: any;
  let error: any;

  try {
    const res = await get(fetchURL);
    if (res) content = res;
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

export default getLandingPage;
