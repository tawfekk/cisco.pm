import AltRouteIcon from "@mui/icons-material/AltRoute";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";

const menuItems = [
  //{
  //  heading: '',
  //  items: [
  //  {
  //    name: 'Oversigt',
  //    link: '/components/oversigt',
  //  icon: ListAltIcon
  //  }
  //]
  //},
  {
    heading: "Menu",
    items: [
      {
        name: "Oversigt",
        icon: ListAltIcon,
        link: "/components/oversigt",
      },
      {
        name: "VLAN",
        icon: AltRouteIcon,
        link: "/components/vlan",
      },
      {
        name: "Router",
        icon: HubOutlinedIcon,
        link: "/components/router",
      },
      {
        name: "Switch",
        icon: DeviceHubIcon,
        link: "/components/switch",
      },
    ],
  },
];

export default menuItems;
