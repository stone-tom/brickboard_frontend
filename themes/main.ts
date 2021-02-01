export default {
  brickred: '#CB0000',
  brickredDark: '#AD0606',
  darkgray: '#333333',
  lightgray: '#f7f7f7',
  gray: '#e7e7e7',
  grayfont: '#979696',
  white: '#ffffff',
  black: 'black',
  warning: '#fff3cd',
  message: [ // is array so a typescript enum can be used to determine the color
    '#FC3838', // error
    '#4BBA31', // success
    '#F2CB07', // warning
  ],
  max_container_width: '1170px',
  nav_height: '80px',
  userTypes: {
    admin: 'cyan',
    user: 'purple',
  },
  userStatus: {
    pending: 'orange',
    approved: 'green',
    locked: 'red',
  }
};
