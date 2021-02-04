import getMessageBoardGroups from './messageboard/get-messageboard-groups';
import getTopicViews from './topic/get-topic-views';
import getTopic from './topic/get-topic';
import login from './authentication/login';
import logout from './authentication/logout';
import register from './authentication/register';
import confirmAccount from './authentication/confirm-account';
import answerTopic from './topic/answer-topic';
import createTopic from './topic/create-topic';
import markTopicAsRead from './topic/mark-topic-as-read';
import incrementViewCount from './topic/increment-view-count';
import followTopic from './topic/follow-topic';
import initiatePasswordReset from './authentication/initiate-pw-reset';

export const backendURL = 'https://brickboard.herokuapp.com';

export {
  getMessageBoardGroups,
  getTopicViews,
  getTopic,
  login,
  logout,
  register,
  confirmAccount,
  answerTopic,
  createTopic,
  markTopicAsRead,
  incrementViewCount,
  followTopic,
  initiatePasswordReset,
};
