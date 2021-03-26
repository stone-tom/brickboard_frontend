import { backendURL } from '../index';
import { post } from '../../methods';

const updateModerationUser = async (
  id: number,
  moderation_state: string,
) => {
  const data = {
    moderation_state,
  };

  const fetchURL = `${backendURL}/admin/moderation/user/${id}`;
  let content: any;
  let error: any;
  try {
    const res = await post(fetchURL, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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

export default updateModerationUser;
