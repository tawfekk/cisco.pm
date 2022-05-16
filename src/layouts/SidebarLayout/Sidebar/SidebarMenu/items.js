
import AltRouteIcon from '@mui/icons-material/AltRoute';
import RouterIcon from '@mui/icons-material/Router';
import GroupsIcon from '@mui/icons-material/Groups';


const menuItems = [
//  {
//    heading: '',
//    items: [
//      {
//        name: 'Overview',
//        link: '/overview',
//        icon: DesignServicesTwoToneIcon
//      }
//    ]
//  },
  {
    heading: 'Menu',
    items: [
      {
        name: 'VLAN',
        icon: AltRouteIcon,
        link: '/components/accordions'
      },
      {
        name: 'Router',
        icon: RouterIcon,
        link: '/components/router'
      },
      {
        name: 'Delt session',
        icon: GroupsIcon,
        link: '/components/tooltips'
      },
    ]
  },
];

export default menuItems;
