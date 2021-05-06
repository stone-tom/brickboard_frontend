export default {
  brickred: '#CB0000',
  brickredDark: '#AD0606',
  green: 'green',
  darkgray: '#333333',
  darkgrayRGB: 'rgb(51,51,51)',
  lightgray: '#f7f7f7',
  gray: '#e7e7e7',
  grayfont: '#979696',
  white: '#ffffff',
  black: 'black',
  warning: '#fff3cd',
  boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.15)',
  message: [ // is array so a typescript enum can be used to determine the color
    '#FC3838', // error
    '#4BBA31', // success
    '#F2CB07', // warning
  ],
  max_container_width: '1550px',
  nav_height: '80px',
  userTypes: {
    admin: 'cyan',
    user: 'purple',
  },
  userStatus: {
    pending_moderation: 'orange',
    approved: 'green',
    blocked: 'red',
  },
  burger_break: '815px',
  burger_break_number: '815',
  breakpoints: {
    xs: '(max-width: 400px)',
    sm: '(max-width: 576px)',
    md: '(max-width: 768px)',
    lg: '(max-width: 992px)',
    xl: '(max-width: 1200px)',
    xxl: '(max-width: 1400px)',
  },
};
