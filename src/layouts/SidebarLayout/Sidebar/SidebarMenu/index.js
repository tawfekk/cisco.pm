import { List, ListItem, Button} from "@mui/material";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { NavLink as RouterLink } from 'react-router-dom';

import AltRouteIcon from "@mui/icons-material/AltRoute";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";



const MenuWrapper = styled(List)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(3)};
    }

    .MuiButton-root {
      width: 100%;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(14)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0.8, 2)};
      line-height: 1.4;
    }
`
);

function buttonStyles(key) {
  if (key === localStorage.getItem("activeButton")) {
    return {justifyContent: "flex-start", backgroundColor: "#1c2444"};
  } else {
    return {justifyContent: "flex-start"};
  }
}

if(localStorage.getItem("activeButton") && localStorage.getItem("activeButton") !== window.location.href.substring(window.location.href.lastIndexOf("/") + 1)) {
localStorage.setItem("activeButton", window.location.href.substring(window.location.href.lastIndexOf("/") + 1))
}else{
localStorage.setItem("activeButton", "router")
}

function SidebarMenu() {
  //const location = useLocation();

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <ListItem component="div">
            <Button
              disableRipple
              size="large"
              component={RouterLink}
              onClick={"2"}
              to="/components/oversigt"
              startIcon={<ListAltIcon />}
              style={buttonStyles("oversigt")}
            >
              Overview
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              disableRipple
              size="large"
              component={RouterLink}
              onClick={"2"}
              to="/components/vlan"
              startIcon={<AltRouteIcon />}
              style={buttonStyles("vlan")}
            >
              VLAN
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              disableRipple
              size="large"
              component={RouterLink}
              onClick={"2"}
              to="/components/router"
              startIcon={<HubOutlinedIcon />}
              style={buttonStyles("router")}
            >
              Router
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              disableRipple
              size="large"
              component={RouterLink}
              onClick={"2"}
              to="/components/switch"
              startIcon={<DeviceHubIcon />}
              style={buttonStyles("switch")}
            >
              Switch
            </Button>
          </ListItem>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
