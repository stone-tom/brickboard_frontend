import { backendURL } from '../index';
import { patch } from '../../methods';

const activateCategory = async (categoryId: string | number, deactivate: boolean) => {
  const fetchURL = `${backendURL}/categories/${categoryId}`;
  const data = { category: { is_active: !deactivate } };
  let content: any;
  let error: any;
  try {
    const res = await patch(fetchURL, data);
    if (res && res.data) content = res;
    if (res && res.error) throw new Error(res.error);
    if (res && res.errors) throw new Error(res.errors);
  } catch (e) {
    error = e;
  }
  return {
    content,
    fetchURL,
    error,
  };
};

export default activateCategory;
