import { backendURL } from '../index';
import { get } from '../../methods';

const getLandingPage = async () => {
  const fetchURL = `${backendURL}/homepage`;
  let content: any;
  let error: any;

  try {
    const res = await get(fetchURL);
    console.log("RES", res);
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
