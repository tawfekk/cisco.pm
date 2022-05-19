
import AltRouteIcon from '@mui/icons-material/AltRoute';
import RouterIcon from '@mui/icons-material/Router';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';


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
      name: 'Oversigt',
      icon: ListAltIcon,
      link: '/components/oversigt'
    },
      {
        name: 'VLAN',
        icon: AltRouteIcon,
        link: '/components/vlan'
      },
      {
        name: 'Router',
        icon: RouterIcon,
        link: '/components/router'
      },
      {
        name: 'Switch',
        icon: DeviceHubIcon,
        link: '/components/switch'
      },
    ]
  },
];

export default menuItems;
