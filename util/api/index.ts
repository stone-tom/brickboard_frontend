import getMessageBoardGroups from './messageboard/get-messageboard-groups';
import getTopicViews from './topic/get-topic-views';
import getTopic from './topic/get-topic';
import login from './authentication/login';
import logout from './authentication/logout';
import register from './authentication/register';
import confirmAccount from './authentication/confirm-account';

export const backendURL = 'https://brickboard.herokuapp.com';

export {
  getMessageBoardGroups,
  getTopicViews,
  getTopic,
  login,
  logout,
  register,
  confirmAccount,
};
