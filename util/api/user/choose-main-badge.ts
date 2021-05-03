import { backendURL } from '../index';
import { put } from '../../methods';

const chooseMainBadge = async (
  badge_id: string,
) => {
  const fetchURL = `${backendURL}/badges/${badge_id}/main`;
  let content: any;
  let error: any;
  try {
    const res = await put(fetchURL);
    if (res && res.data) content = res;
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

export default chooseMainBadge;
