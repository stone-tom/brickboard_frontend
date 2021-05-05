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
import resetPassword from './authentication/reset-password';
import updateTopic from './topic/update-topic';
import banPost from './post/ban-post';
import getNews from './news/get-news';
import createNews from './news/create-news';
import deleteNews from './news/delete-news';
import updateNews from './news/update-news';
import getEvents from './events/get-events';
import getLandingPage from './landingpage/get-landing-page';
import createEvent from './events/create-event';
import deleteEvent from './events/delete-events';
import resendCode from './authentication/resend-code';
import markAllAsReadMessageboard from './topic/mark-all-as-read-messageboard';
import deletePost from './post/delete-post';
import deleteTopic from './topic/delete-topic';

// export const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendURL = 'https://dev.brickboard.de';

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
  resetPassword,
  updateTopic,
  banPost,
  getNews,
  createNews,
  deleteNews,
  updateNews,
  getEvents,
  getLandingPage,
  createEvent,
  deleteEvent,
  resendCode,
  markAllAsReadMessageboard,
  deletePost,
  deleteTopic,
};
