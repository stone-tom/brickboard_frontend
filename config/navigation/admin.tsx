import Link from 'next/link';
import HomeSVG from '../../assets/icons/home.svg';

const adminNav = [
  {
    path: "/",
    icon: <HomeSVG />,
    text: 'Home',
  },
  // {
  //   "path": null,
  //   "icon": "settings",
  //   "text": "settings.name",
  //   "children": [
  //     {
  //       "path": "/user-management",
  //       "text": "settings.usermanagement"
  //     },
  //     {
  //       "path": "/regions",
  //       "text": "settings.regions"
  //     },
  //     {
  //       "text": "settings.anamnesis",
  //       "path": "/config/anamnesis"
  //     },
  //     {
  //       "path": "/config/app",
  //       "text": "settings.app_config"
  //     },
  //     {
  //       "path": "/config/meds",
  //       "text": "settings.med_config"
  //     }
  //   ]
  // },
];

export default adminNav;