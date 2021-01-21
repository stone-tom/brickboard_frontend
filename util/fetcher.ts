import { get } from './methods';

export const backendURL = 'https://brickboard.herokuapp.com';

export const getMessageboardGroups = async () => {
  const fetchURL = `${backendURL}/messageboard-groups`;
  let content: any;
  try {
    const res = await get(fetchURL);
    if (res && res.data) content = res;
  } catch (e) {
    return e;
  }
  return {
    content,
    fetchURL,
  };
};
