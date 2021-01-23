export const filterTopics = (boards) => boards.included.filter((item) => item.type === 'topic');
export const filterMessageboards = (boards) => boards.included.filter((item) => item.type === 'messageboard');
export const filterUsers = (boards) => boards.included.filter((item) => item.type === 'user');
export const filterPostViews = (boards) => boards.included.filter((item) => item.type === 'post_view');
export const filterPosts = (boards) => boards.included.filter((item) => item.type === 'post');
