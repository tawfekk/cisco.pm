import { useRoutes } from "react-router-dom";
import routes from "./router";
//import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ThemeProvider from "./theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { syncdown } from "src/handlers/Sync";

if(sessionStorage.getItem("sessionid")) {
syncdown("router");
syncdown("vlan");
syncdown("switch");
}

sessionStorage.version = "v0.04.4-beta";


if(!localStorage.version){localStorage.version = sessionStorage.version}

if (localStorage.router_data) {
  // Parse the string into an array of objects
  let routerDataArray = JSON.parse(localStorage.router_data);

  // Iterate over each object in the array
  routerDataArray.forEach((item, index) => {
    // Check if the "misc" property exists
    if (!item["misc"]) {
      // If it doesn't exist, create it as an empty array
      item["misc"] = [];
    }

    // Check if the third element of the "misc" array exists
    if (!item["misc"][2]) {
      // If it doesn't exist, create it as an empty string
      item["misc"][2] = "";
    }
  });

  // Save the updated array back to localStorage
  localStorage.router_data = JSON.stringify(routerDataArray);
}


if (!localStorage.router_data) {
  localStorage.router_data = JSON.stringify([
    {
      dynamicnatport: [],
      misc: [{},{},{}],
      dynamicnat: [],
      staticnat: [],
      interfaces: [{ subinterfaces: [] }],
      linterfaces: [],
      hsrp: [],
      vrrp: [],
      namedeigrp: [], 
      dhcp: [{ ip: "" }],
      initial: [
        {
          hostname: "R1",
          motd: "May your day be filled with Cisco",
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
          lldp: false,
          sshv2: true,
          genereatersa: true,
        },
      ],
      staticroute: [{}],
      ospf: [],
      v3ospf: [],
      eigrp: [],
      bgp: [
        {
          enabled: [],
          passive: [],
          redistributions: [],
          networks: [],
          neighbours: [],
          v6networks: [],
          v6neighbours: [],
        },
      ],
      basicsecurity: [{}],
      urpf: [],
      localaaa: [{users: []}],
      advancedaaa: [],
      dhcpexclusion: [],
      dhcphelper: [],
    },
  ]);
}

if (!localStorage.getItem("router_final")) {
  var times = 64;
  let array = [];
  var element = {};
  for (var i = 0; i < times; i++) array.push(element);
  localStorage.setItem("router_final", JSON.stringify(array));
}


if (!localStorage.switch_data) {
  localStorage.switch_data = JSON.stringify([
    {
      dynamicnatport: [],
      misc: [{},{},{}],
      dynamicnat: [],
      staticnat: [],
      interfaces: [{ subinterfaces: [] }],
      linterfaces: [],
      hsrp: [],
      vrrp: [],
      namedeigrp: [], 
      dhcp: [{ ip: "" }],
      initial: [
        {
          hostname: "S1",
          motd: "May your day be filled with Cisco",
          domæne: "network.internal",
          secret: "class",
          con0pass: "cisco",
          vtypass: "cisco",
          clock: true,
          model: 2960,
          synchronuslogging: true,
          ipv6unicastrouting: true,
          passwordencryption: true,
          disabledomainlookup: true,
          enablessh: true,
          cdp: true,
          lldp: false,
          sshv2: true,
          genereatersa: true,
        },
      ],
      staticroute: [{}],
      ospf: [],
      v3ospf: [],
      eigrp: [],
      bgp: [
        {
          enabled: [],
          passive: [],
          redistributions: [],
          networks: [],
          neighbours: [],
          v6networks: [],
          v6neighbours: [],
        },
      ],
      basicsecurity: [{}],
      urpf: [],
      localaaa: [{users: []}],
      advancedaaa: [],
      dhcpexclusion: [],
      dhcphelper: [],
    },
  ]);
}


if (localStorage.switch_data) {
  // Parse the string into an array of objects
  let switchDataArray = JSON.parse(localStorage.switch_data);

  // Iterate over each object in the array
  switchDataArray.forEach((item, index) => {
    // Check if the "misc" property exists
    if (!item["misc"]) {
      // If it doesn't exist, create it as an empty array
      item["misc"] = [];
    }

    // Check if the third element of the "misc" array exists
    if (!item["misc"][2]) {
      // If it doesn't exist, create it as an empty string
      item["misc"][2] = "";
    }
  });

  // Save the updated array back to localStorage
  localStorage.switch_data = JSON.stringify(switchDataArray);
}


if (!localStorage.getItem("switch_final")) {
  var times = 64;
  let array = [];
  var element = {};
  for (var i = 0; i < times; i++) array.push(element);
  localStorage.setItem("switch_final", JSON.stringify(array));
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