import { backendURL } from '../index';
import { deleteMethod } from '../../methods';
import IUser from '../../../models/IUser';
import IBadge from '../../../models/IBadge';

const removeUsersFromBadge = async (
  badge: IBadge,
  userList: IUser[],
) => {
  const fetchURL = `${backendURL}/badges/${badge.id}/users/${userList.map((user) => user.id).join()}`;
  let error: any;
  try {
    await deleteMethod(fetchURL);
  } catch (e) {
    error = e;
  }
  return {
    fetchURL,
    error,
  };
};

export default removeUsersFromBadge;
