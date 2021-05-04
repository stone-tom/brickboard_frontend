import { backendURL } from '../index';
import { patch } from '../../methods';

const updateGlobalPreferences = async (status: boolean, preference: 'auto_follow_topics' | 'follow_topics_on_mention') => {
  const data = {
    user_preferences_form: {
      [preference]: status,
    },
  };
  const fetchURL = `${backendURL}/preferences`;
  let content: any;
  let error: any;
  try {
    const res = await patch(fetchURL, data);
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

export default updateGlobalPreferences;
