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

export const getTopicViews = async (slug: string) => {
  const fetchURL = `${backendURL}/${slug}/topics/page-1`;
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

export const getTopic = async (slug: string, id: any) => {
  const fetchURL = `${backendURL}/${slug}/topics/${id}`;
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
