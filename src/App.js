import { useRoutes } from "react-router-dom";
import routes from "./router";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ThemeProvider from "./theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { syncdown } from "src/handlers/Sync";

syncdown("router");
syncdown("vlan");
syncdown("switch");

sessionStorage.version = "0.02.1-beta";


if (!localStorage.router_data) {
  localStorage.router_data = JSON.stringify([
    {
      dynamicnatport: [],
      misc: [{},{}],
      dynamicnat: [],
      staticnat: [],
      interfaces: [{ subinterfaces: [] }],
      linterfaces: [],
      hsrp: [],
      vrrp: [],
      dhcp: [{ ip: "" }],
      initial: [
        {
          hostname: "R1",
          motd: "Må din dag være fyldt med Cisco",
          domæne: "network.internal",
          secret: "class",
          con0pass: "cisco",
          vtypass: "cisco",
          clock: true,
          model: 4300,
          synchronuslogging: true,
          ipv6unicastrouting: true,
          passwordencryption: true,
          disabledomainlookup: true,
          enablessh: true,
          cdp: true,
          lldp: true,
          sshv2: true,
          genereatersa: true,
        },
      ],
      staticroute: [{}],
      ospf: [
        {
          processid: Math.floor(Math.random() * (65535 - 1 + 1)) + 1,
          enabled: [],
          passive: [],
          area: 0,
          pointtopoint: []
        },
      ],
      eigrp: [
        {
          processid: Math.floor(Math.random() * (65535 - 1 + 1)) + 1,
          enabled: [],
          passive: [],
          area: 0,
          pointtopoint: [],
          redistributions: [],
          networks: [] 
        },
      ]
    },
  ]);
}

if (!localStorage.router_final) {
  var times = 20;
  let array = [];
  var element = {};
  for (var i = 0; i < times; i++) array.push(element);
  localStorage.router_final = JSON.stringify(array);
}

if (!localStorage.switch_data) {
  localStorage.switch_data = JSON.stringify([
    {
      interfaces: [{ porte: [] }],
      dhcp: [{ ip: "" }],
      initial: [{ hostname: "S1" }],
    },
  ]);
}

if (!localStorage.switch_final) {
  var times = 20;
  let array = [];
  var element = {
    initial: "",
  };
  for (var i = 0; i < times; i++) array.push(element);
  localStorage.switch_final = JSON.stringify(array);
}

if (!localStorage.vlan_data) {
  localStorage.vlan_data = JSON.stringify([
    {
      navn: "VLAN1",
      id: "",
    },
  ]);
}


const App = () => {
  const content = useRoutes(routes);
  return (
    <ThemeProvider>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};
export default App;

//før:
//<LocalizationProvider dateAdapter={AdapterDateFns}>
//<CssBaseline />
//{content}
//</LocalizationProvider>