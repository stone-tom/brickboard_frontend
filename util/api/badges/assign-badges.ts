import { backendURL } from '../index';
import { put } from '../../methods';
import IUser from '../../../models/IUser';
import IBadge from '../../../models/IBadge';

const assignUsersToBadge = async (
  badge: IBadge,
  userList: IUser[],
) => {
  const fetchURL = `${backendURL}/badges/${badge.id}/users/${userList.map((user) => user.id).join()}`;
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

export default assignUsersToBadge;
