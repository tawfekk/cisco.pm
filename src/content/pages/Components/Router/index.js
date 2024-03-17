import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import { useState, useEffect} from "react";
import * as React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Switch from "src/components/Switch";
import { syncup, syncupchange, syncdown } from "src/handlers/Sync";
import {
  Initial,
  DHCP,
  NAT,
  OSPF,
  Interfaces,
  Staticroute,
  FHRP,
  EIGRP,
  VPN,
  Security,
  BGP,
  RSA
  //ACL
} from "src/handlers/ConfigGenerator/Router";
import { StatusComingSoon } from "src/content/pages/Status/ComingSoon";
import { StatusError } from "src/content/pages/Status/Error";
import { RouterInterfaces } from "src/handlers/Interfaces";

import {
  TextField,
  Snackbar,
  Alert,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tabs,
  Radio,
  RadioGroup,
  Tooltip,
  Tab,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  Modal,
  Autocomplete
} from "@mui/material";
import { Close } from "@mui/icons-material";

//import {
//  Button,
//  Divider
//} from "@mui/material-next";

//import Divider from '@mui/material-next/Divider';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

let maxTabIndex = 0;
let alerttext = "";
let alertsev = "info";

sessionStorage.router_tabid = 0;


/*if (
  JSON.parse(localStorage.router_final).length !=
  JSON.parse(localStorage.router_data).length
) {
  var times = JSON.parse(localStorage.router_data).length;
  let data = JSON.parse(localStorage.router_final);
  for (var i = 0; i < times; i++) {
    let object = {
      initial: "",
    };
    data.push(object);
  }
  localStorage.router_final = JSON.stringify(data);
}
*/

var p = 0;
let newtabs = false;

function Router() {
  function tablabel(maxTabIndex) {
    try {
      let data = JSON.parse(localStorage.router_data);
      let workingdata = data[maxTabIndex]["initial"][0]["hostname"];
      if (workingdata) {
        return workingdata;
      } else {
        let routerid = maxTabIndex + 1;
        return "R" + routerid;
        data[2]["initial"][0]["hostname"] = "R" + routerid;
        localStorage.router_data = JSON.stringify(data);
      }
    } catch (e) {}
  }

  const [tabs, setAddTab] = useState([]);
  const [tabid, settabid] = useState(0);
  const handleTabChange = (event, newtabid) => {
    if (newtabid === "tabProperties") {
      let workingtabindex = maxTabIndex + 2;
      let data = [...formFields];
      let object = {
        interfaces: [{ subinterfaces: [] }],
        v6interfaces: [{ v6subinterfaces: [] }],
        dynamicnatport: [],
        dynamicnat: [],
        misc: [{}, {}, {}],
        staticnat: [],
        linterfaces: [],
        basicsecurity: [{}],
        urpf: [],
        localaaa: [{users: []}],
        advancedaaa: [],
        namedeigrp: [], 
        eigrp: [], 
        bgp: [{ redistributions: [], networks: [], v6networks: [], passive: [], enabled: [], neighbours: [], v6neighbours: [] }], 
        hsrp: [],
        vrrp: [],
        dhcp: [{ ip: "" }],
        dhcpexclusion: [],
        dhcphelper: [],
        initial: [
          {
            hostname: "R" + workingtabindex,
            clock: true,
            model: 4300,
            synchronuslogging: true,
            ipv6unicastrouting: true,
            passwordencryption: true,
            disabledomainlookup: true,
            enablessh: true,
            cdp: true,
            sshv2: true,
            genereatersa: true,
            lldp: false,
            motd: "May your day be filled with Cisco",
            domæne: "network.internal",
            secret: "class",
            con0pass: "cisco",
            vtypass: "cisco",
          },
        ],
        staticroute: [{}],
        ospf: [],
        v3ospf: []
      };
      data.push(object);
      setformFields(data);
      syncup(data, "router");
      localStorage.router_data = JSON.stringify(data);
      handleAddTab();
    } else {
      sessionStorage.router_tabid = newtabid;
      settabid(newtabid);
      run2();
    }
  };

  // Handle Add Tab Button

  function onreloadtab() {
    let tabdata = [...tabs];
    if (
      JSON.parse(localStorage.router_data).length != 1 &&
      JSON.parse(localStorage.router_data).length != tabdata.length + 1
    ) {
      while (
        JSON.parse(localStorage.router_data).length !=
        tabdata.length + 1
      ) {
        maxTabIndex = maxTabIndex + 1;
        tabdata.push(<Tab label={tablabel(maxTabIndex)} key={maxTabIndex} />);
      }
      setAddTab(tabdata);
      newtabs = true;
    } else {
      newtabs = false;
    }
  }

  const handleAddTab = () => {
    let tabdata = [...tabs];
    maxTabIndex = maxTabIndex + 1;
    tabdata.push(<Tab label={tablabel(maxTabIndex)} key={maxTabIndex}/>);
    setAddTab(tabdata);
  };

  const [value, setValue] = useState(0);

  function sleep(ms) {
    setValue(false);
    syncdown("router");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run() {
    await sleep(350);
    onreloadtab();
    if (newtabs) {
      window.location.reload();
    }
    setValue(value);
    setformFields(JSON.parse(localStorage.router_data));
  }

  async function run3() {
    await sleep(250);
    addFields("initial");
    setValue(value);
  }

  async function run2() {
    await sleep(350);
    setformFields(JSON.parse(localStorage.router_data));
    setValue(value);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };

  const [formFields, setformFields] = useState(
    JSON.parse(localStorage.router_data)
  );

  
  const handleFormChange = (event, index, value) => {
    let data = [...formFields];
    console.log(event.target.id)
    //if (data[0][event.target.id][index] == undefined) {data[0][event.target.id] = {}}
    if (event.target.type == "checkbox") {
      data[sessionStorage.router_tabid][event.target.id][index][
        event.target.name
      ] = event.target.checked;
      var id = event.target.id;
    } else if (event.target.type == "text" || event.target.type == "number" ) {
      if(event.target.name){
      data[sessionStorage.router_tabid][event.target.id][index][
        event.target.name
      ] = event.target.value;
      var id = event.target.id;}else{
        var parsed = event.target.id.split("."),
        id = parsed[0],
        name = parsed[1];
        data[sessionStorage.router_tabid][id][index][name] = event.target.value;
      }
    } else {
      var splitcandidate = event.target.name
      if (!splitcandidate){splitcandidate = event.target.id.split("-")[0]}

      var valuecandidate = event.target.value;
      if (!valuecandidate){valuecandidate = value}

      if(valuecandidate === "true"){valuecandidate = true}
      if (valuecandidate === "false"){valuecandidate = false}

      var parsed = splitcandidate.split("."),
        id = parsed[0],
        name = parsed[1];
      data[sessionStorage.router_tabid][id][index][name] = valuecandidate;
    }
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    if (sessionStorage.sessionid) {
      syncupchange(
        sessionStorage.router_tabid,
        id,
        data[sessionStorage.router_tabid][id],
        "router"
      );
      //syncup(data, 'router')
    }
  };

  
  const handleNestedFormChange = (nest, nestindex, event, index, value) => {
    let data = [...formFields];
    //if (data[0][event.target.id][index] == undefined) {data[0][event.target.id] = {}}
    if (event.target.type == "checkbox") {
      data[sessionStorage.router_tabid][nest][nestindex][event.target.id][
        index
      ][event.target.name] = event.target.checked;
      var id = event.target.id;
    } else if (event.target.type == "text" || event.target.type == "number" ) {
      if(event.target.name){
      data[sessionStorage.router_tabid][nest][nestindex][event.target.id][
        index
      ][event.target.name] = event.target.value;
      var id = event.target.id;
    }else{
      var parsed = event.target.id.split("."),
      id = parsed[0],
      name = parsed[1];
      data[sessionStorage.router_tabid][nest][nestindex][id][index][name] = event.target.value;
    }
    } //(Array.isArray(event.target.value))
    else {
      var splitcandidate = event.target.name
      if (!splitcandidate){splitcandidate = event.target.id.split("-")[0]}

      var valuecandidate = event.target.value;
      if (!valuecandidate){valuecandidate = String(value)}

      var parsed = splitcandidate.split("."),
        id = parsed[0],
        name = parsed[1];
      data[sessionStorage.router_tabid][nest][nestindex][id][index][name] =
        valuecandidate;
    }
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    if (sessionStorage.sessionid) {
      syncupchange(
        sessionStorage.router_tabid,
        id,
        data[sessionStorage.router_tabid][nest][nestindex][id],
        "router",
        nest,
        nestindex
      );
    }
  };

  const addFields = (id) => {
    let data = [...formFields];
    let object = {
      dhcp: [],
      hostname: "",
      enabled: [],
      enabledv6: [],
      ipv6: false,
      passive: [],
      v6networks: [],
      pointtopoint: [],
      overload: "true",
      neighbours: [],
      v6neighbours: [],
      networks: [],
      externalinterface: [],
      internalinterface: [],
      subinterfaces: [],
      disabled: [],
      users: [],
      redistributions: [],
      processid: Math.floor(Math.random() * (65535 - 1 + 1)) + 1,
      area: 0,
      index: data[sessionStorage.router_tabid][id].length,
    };
    data[sessionStorage.router_tabid][id].push(object);
    setformFields(data);
  };

  function addNestedFields(nest, index, id) {
    let data = [...formFields];
    let object = {
      dhcp: [],
      hostname: "",
      enabled: [],
      passive: [],
      defaultmetric: true
    };
    data[sessionStorage.router_tabid][nest][index][id].push(object);
    //workingarray = formFields[tabid]
    setformFields(data);
  }

  const removeNestedFields = (nest, nestindex, id, index) => {
    let data = [...formFields];
    data[sessionStorage.router_tabid][nest][nestindex][id].splice(index, 1);
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    syncupchange(
      sessionStorage.router_tabid,
      id,
      0,
      "router",
      nest,
      nestindex,
      index
    );
  };

  const removeFields = (id, index) => {
    let data = [...formFields];
    data[sessionStorage.router_tabid][id].splice(index, 1);
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    syncupchange(sessionStorage.router_tabid, id, 0, "router", 0, 0, index);
  };

  if (maxTabIndex == 0) {
    syncdown("router");
    onreloadtab();
  }


window.onload = (event) => {
  if (sessionStorage.sessionid){ setTimeout(() => {setformFields(JSON.parse(localStorage.router_data))}, 400)}
};



  function porte(sort) {
    try {
      let workingvar = RouterInterfaces(
        formFields[tabid]["initial"][0]["model"]
      );
      if (!sort) {
        for (const elem of formFields[tabid]["interfaces"]) {
          if(!workingvar.includes(elem.port)) {workingvar.push(elem.port)};
          for (const e of elem.subinterfaces) {
            workingvar.push(elem.port + "." + e.id);
          }
        }
        for (const elem of formFields[tabid]["linterfaces"]) {
          workingvar.push("loopback " + elem.id);
        }
      }
      if(sort == "custom"){
        return workingvar
        workingvar = [...new Set(workingvar)];
      }else{
        workingvar = [...new Set(workingvar)];
      return workingvar.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ));}
    } catch (e) {}
  }

  function isIPv6(address) {
    // Regular expression to match IPv6 address
    const ipv6Regex = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;  
      return ipv6Regex.test(address);
  }



  function networks(sort) {
    try {
    function calculateNetworkId(hostAddress, subnetMask) {
      // Convert the host address and subnet mask to arrays of integers
      const hostAddressArray = hostAddress.split('.').map(Number);
      const subnetMaskArray = subnetMask.split('.').map(Number);
    
      // Calculate the network ID using bitwise AND operation
      const networkIdArray = hostAddressArray.map((octet, index) => octet & subnetMaskArray[index]);
    
      // Convert the array back to a string
      const networkId = networkIdArray.join('.');
    
      return networkId
    }
    function ipinverter(data) {
      let arr = data.split(".");
      let x = 255 - arr[0] + ".";
      x += 255 - arr[1] + ".";
      x += 255 - arr[2] + ".";
      x += 255 - arr[3];
      if(arr.some(isNaN)){return ""}else{
      return x}
    }

      let workingvar = [];
      if (sort == "netid") {
        for (const elem of formFields[tabid]["interfaces"]) {
          workingvar.push(calculateNetworkId(elem.ip, elem.subnet));
          for (const e of elem.subinterfaces) {
            workingvar.push(calculateNetworkId(e.ip, e.subnet))
          }
        }
        for (const elem of formFields[tabid]["linterfaces"]) {
          workingvar.push(calculateNetworkId(elem.ip, elem.subnet));
        } 
        return workingvar;
      }
      else if(sort == "gateway"){
        for (const elem of formFields[tabid]["interfaces"]) {
          workingvar.push(String(elem.ip));
          for (const e of elem.subinterfaces) {
            workingvar.push(String(e.ip))
          }
        }
        for (const elem of formFields[tabid]["linterfaces"]) {
          workingvar.push(String(elem.ip));
        };
        return workingvar
        
      }
      else if(sort == "subnet"){
        for (const elem of formFields[tabid]["interfaces"]) {
          if(!workingvar.includes(String(elem.subnet))) {workingvar.push(String(elem.subnet))};
          for (const e of elem.subinterfaces) {
            if(!workingvar.includes(String(e.subnet))) {workingvar.push(String(e.subnet))};
          }
        }
        for (const elem of formFields[tabid]["linterfaces"]) {
          if(!workingvar.includes(String(elem.subnet))) {workingvar.push(String(elem.subnet))};
        }
        return workingvar;
      }
      else if(sort == "wildcard"){
        let ip = ""
        for (const elem of formFields[tabid]["interfaces"]) {
          ip = ipinverter(elem.subnet);
          if(!workingvar.includes(String(ip))) {workingvar.push(String(ip))};
          for (const e of elem.subinterfaces) {
            ip = ipinverter(e.subnet);
            if(!workingvar.includes(String(ip))) {workingvar.push(String(ip))};
          }
        }
        for (const elem of formFields[tabid]["linterfaces"]) {
          ip = ipinverter(elem.subnet);
          if(!workingvar.includes(String(ip))) {workingvar.push(String(ip))};
        }
        return workingvar;
      }
    } catch (e) {return [""]}
  }

  function redistributionchoices() {
    try{
    let workingvar = [];

      for (const e of formFields[tabid]["ospf"]){
        if (e.processid){workingvar.push(String("OSPF " + e.processid));}
      }

      for (const e of formFields[tabid]["v3ospf"]){
        if (e.processid){workingvar.push(String("OSPFv3 " + e.processid));}
      }

      for (const e of formFields[tabid]["eigrp"]){
        if (e.as){workingvar.push(String("EIGRP " + e.as));}
      }

      for (const e of formFields[tabid]["namedeigrp"]){
        if (e.as){workingvar.push(String("EIGRP " + e.as));}
      }

      for (const e of formFields[tabid]["bgp"]){
        if (e.as){workingvar.push(String("BGP " + e.as));}
      }
      

      return workingvar.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))
    }catch(e){console.log(e)}
  }

  function ModalContent(func, id) {
    return (
      <Box sx={style}>
        <Typography variant="h4" component="h2">
          Config generated
        </Typography>
        <TextField
          multiline
          sx={{ mt: 2 }}
          inputProps={{ style: { color: "#FFC13D" } }}
          maxRows={20}
          minRows={5}
          style={{ width: "100%" }}
          value={
            id != "initial" ? "configure terminal" + func(sessionStorage.router_tabid) + "\nend" : "configure terminal" + func(sessionStorage.router_tabid) + RSA(sessionStorage.router_tabid) + "\nend" 
          }
        ></TextField>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              "conf terminal" +
                JSON.parse(localStorage.router_final)[
                  sessionStorage.router_tabid
                ][id] +
                "\nend"
            );
            handleClose();
            handleClick("success", "Copied to clipboard");
          }}
          variant="contained"
          sx={{ right: "20%", left: "20%", mt: 3, ml: 1 }}
          size="small"
          color="secondary"
        >
          Copy to clipboard
        </Button>
        </Box>
    );
  }



  function ModalContentVersion() {
    return (
      <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 380, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: "20px"}}>

        <Typography sx={{mb: 3 }} variant="h3" component="h2" >
          A new version has been applied since last time you visited
        </Typography>
        <img
              alt="Upgrade"
              height={178}
              src="/static/images/status/upgrade.svg"
            />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
        
        <Button
          onClick={() => {
            handleCloseVersion();
          }}
          variant="text"
          size="large"
          startIcon={<Close />}
          sx={{ mt: 1.5}}
          color="primary"
        >
          Close
        </Button>
        </Box>
      </Box>
    );
  }


const [openVersion, setOpenVersion] = React.useState(false);
const handleOpenVersion = () => {
  setOpenVersion(true);
};
const handleCloseVersion = () => setOpenVersion(false);

if(localStorage.getItem("version") && sessionStorage.getItem("version")) {
  if (localStorage.getItem("version") != sessionStorage.getItem("version")) {
    localStorage.setItem("version", sessionStorage.getItem("version"));
    handleOpenVersion()
  }

}







  const [open2, setOpen2] = React.useState(false);
  const handleClick = (sev, text) => {
    alerttext = text;
    alertsev = sev;
    setOpen2(true);
  };
  const handleClose2 = () => setOpen2(false);
  const vertical = "top";
  const horizontal = "center";
  function validhandleFormChange(statement, bool, errormessage, event, index) {
    if (statement) {
      if (statement == bool) {
        handleClick("error", errormessage);
      } else {
        handleFormChange(event, index);
      }
    } else {
      handleClick("error", errormessage);
    }
  }


  function Content() {
    return (
      <div>
        <Modal open={openVersion} onClose={handleCloseVersion}>
        {ModalContentVersion()}
        </Modal>
        <Snackbar
          open={open2}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleClose2}
          autoHideDuration={5000}
        >
          <Alert
            variant="filled"
            onClose={handleClose2}
            severity={alertsev}
            sx={{ width: "100%" }}
          >
            {alerttext}
          </Alert>
        </Snackbar>
        <Tabs
          variant="fullWidth"
          //variant="scrollable"
          //scrollButtons
          //allowScrollButtonsMobile
          //scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          value={value}
          //style={{ width: '600px', display: "flex" }} 
          onChange={(event, newValue) => {
            setValue(newValue);
            syncdown("router");
            if(sessionStorage.sessionid){
            setTimeout(() => {
              setformFields(JSON.parse(localStorage.router_data));
            }, 400);}
          }}
        >
          <Tab label="Generel" />
          <Tab label="Interface" />
          <Tab label="DHCP" />
          <Tab label="FHRP" />
          <Tab label="Static route" />
          <Tab label="OSPF" />
          <Tab label="EIGRP" />
          <Tab label="BGP" />
          <Tab label="VPN" />
          <Tab label="ACL & routemap" />
          <Tab label="NAT" />
          <Tab label="Security" />
          <Tab label="Misc" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Card>
            <CardContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  mt: 1,
                }}
                noValidate
                autoComplete="off"
              >
                {formFields[sessionStorage.router_tabid]["initial"].map(
                  (form, index) => {
                    return (
                      <div key={0}>
                        <TextField
                          required
                          error={!form.hostname}
                          id="initial"
                          name="hostname"
                          label="Hostname"
                          value={form.hostname || ''}
                          autoFocus={true}
                          placeholder="R1"
                          onChange={(event) => {
                            handleFormChange(event, 0);
                            tablabel();
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                        fullWidth
                          id="initial"
                          name="motd"
                          label="MOTD"
                          value={form.motd || ''}
                          placeholder="Authorized access only!"
                          onChange={(event) => handleFormChange(event, 0)}
                        />
                        <TextField
                          id="initial"
                          label="Domain"
                          name="domæne"
                          value={form.domæne || ''}
                          placeholder="domain.internal"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          name="secret"
                          label="Enable secret"
                          value={form.secret || ''}
                          placeholder="class"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          value={form.con0pass || ''}
                          name="con0pass"
                          label="Con 0 password"
                          placeholder="cisco"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          name="vtypass"
                          value={form.vtypass || ''}
                          label="Vty 0-15 password"
                          placeholder="cisco"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                          <InputLabel>Model</InputLabel>
                          <Select
                            name="initial.model"
                            value={form.model || ''}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                            input={<OutlinedInput label="Model" />}
                          >
                            <MenuItem key={"1941"} value={"1941"}>
                              1941
                            </MenuItem>
                            <MenuItem key={"4300"} value={"4300"}>
                              4300
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <Grid
                          sx={{ mt: 3, mb: 4 }}
                          container
                          justifyContent="center"
                        >
                          <Tooltip arrow title="Applies current time to the device">
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="clock"
                                label="Set clock"
                                id="initial"
                                checked={form.clock || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Set clock"
                          />
                          </Tooltip>
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="synchronuslogging"
                                id="initial"
                                checked={form.synchronuslogging || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Synchronus logging  (con0)"
                          />
                          <Tooltip arrow title="Enable IPv6 routing">
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="ipv6unicastrouting"
                                id="initial"
                                checked={form.ipv6unicastrouting || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="IPv6 unicast routing"
                          />
                          </Tooltip>
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="passwordencryption"
                                id="initial"
                                checked={form.passwordencryption || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Password encryption"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="disabledomainlookup"
                                id="initial"
                                checked={form.disabledomainlookup || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Disable domain lookup"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="enablessh"
                                id="initial"
                                checked={form.enablessh || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Enable SSH"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="sshv2"
                                id="initial"
                                checked={form.sshv2 || null}
                                onChange={(event) => {
                                  validhandleFormChange(
                                    form.genereatersa,
                                    false,
                                    "SSHv2 requires RSA",
                                    event,
                                    index
                                  );
                                }}
                              />
                            }
                            label="SSH v2"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="genereatersa"
                                id="initial"
                                checked={form.genereatersa || null}
                                onChange={(event) =>
                                  validhandleFormChange(
                                    form.domæne,
                                    "",
                                    "RSA requires domain",
                                    event,
                                    index
                                  )
                                }
                              />
                            }
                            label="Generate RSA"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="telnet"
                                id="initial"
                                checked={form.telnet || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Telnet"
                          />
                          <Tooltip arrow title="Activates Cisco Discovery Protocol, which allows devices on a network to share information about themselves.">
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="cdp"
                                id="initial"
                                checked={form.cdp || null}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="CDP"
                          />
                          </Tooltip>
                          <Tooltip arrow title="Activates Link Layer Discovery Protocol (LLDP), which allows devices on a network to share information about themselves.">
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="lldp"
                                id="initial"
                                checked={form.lldp || null}
                                onChange={(event) => {
                                  handleFormChange(event, index);
                                  if(form.lldp){handleClick("warning", "Please be aware that LLDP is not supported on all IOS versions")}
                                }
                                }
                              />
                            }
                            label="LLDP"
                          />
                          </Tooltip>
                        </Grid>
                      </div>
                    );
                  }
                )}
                <Divider sx={{ m: 2 }} />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ margin: 1 }}
                  size="medium"
                  onClick={() => {
                    removeFields("initial", 0);
                    run3();
                  }}
                >
                  Clear fields
                </Button>
                <Button
                  onClick={() => {
                    handleOpen();
                  }}
                  variant="outlined"
                  sx={{ margin: 1 }}
                  size="medium"
                  color="primary"
                >
                  Show config
                </Button>
                <Modal open={open} onClose={handleClose}>
                  {ModalContent(Initial, "initial")}
                </Modal>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value || ''} index={1}>
          {formFields[tabid]["interfaces"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Interface " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("interfaces", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <Tooltip arrow placement="top" title="Enter a IPv4 or IPv6 address">
                      <TextField
                        name="ip"
                        error={form.subnet && !form.ip}
                        label="IP"
                        disabled={form.interfacedhcp}
                        id="interfaces"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow placement="top" title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, use mask (e.g. 255.255.255.0) \n\n For ipv6, use prefix (e.g. /64)"}</span>} >
                      <TextField
                        name="subnet"
                        id="interfaces"
                        disabled={form.interfacedhcp}
                        error={form.ip && !form.subnet}
                        label={isIPv6(form.ip) ? "Prefix": "Subnet"}
                        //sx={{display: isIPv6(form.ip) ? "none": ""}}
                        placeholder={isIPv6(form.ip) ? "/64": "255.0.0.0"}
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet || ''}
                      />
                      </Tooltip>
                      <Tooltip sx={{display: isIPv6(form.ip) ? "": "none"}} arrow title="" >
                      <TextField
                        name="linklocal"
                        id="interfaces"
                        label="Link local"
                        disabled={form.interfacedhcp}
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.linklocal || ''}
                      />
                      </Tooltip>
                      <TextField
                        name="description"
                        id="interfaces"
                        label="Description"
                        placeholder="LAN"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.description || ''}
                      />
                      <Tooltip arrow placement="top" title="This field accepts manual input">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        clearIcon={false}
                        clearText=""
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        name="interfaces.port"
                        id="interfaces.port"
                        value={form.port || ''} 
                        onChange={(event, value) => handleFormChange(event, index, value)}
                        options={porte("custom")}
                        renderInput={(params) => <TextField {...params} required={true} error={!form.port} label="Interface" />}
                      />
                      </FormControl>
                      </Tooltip>
                     <Tooltip sx={{display: isIPv6(form.ip) ? "": "none"}} arrow title="Use the MAC address for automatic IPv6 address creation">
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            name="eui64"
                            id="interfaces"
                            checked={form.eui64 || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="EUI-64"
                      />
                      </Tooltip>
                       <Tooltip  arrow title="Let this interface get a dynamic IP from a DHCP server">
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            name="interfacedhcp"
                            id="interfaces"
                            checked={form.interfacedhcp || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Dynamic IP assignment"
                      />
                      </Tooltip>
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            color="warning"
                            name="shutdown"
                            id="interfaces"
                            checked={form.shutdown || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Shutdown"
                      />
                      {formFields[tabid]["interfaces"][index][
                        "subinterfaces"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "interfaces",
                                      index,
                                      "subinterfaces",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <TextField
                                  name="id"
                                  error={!form2.id}
                                  id="subinterfaces"
                                  size="small"
                                  label="Subinterface ID"
                                  placeholder="1"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "interfaces",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.id || ''}
                                />
                                <FormControl
                                  sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}
                                >
                                  <InputLabel size="small" id="interfaces">
                                    VLAN
                                  </InputLabel>
                                  <Select
                                    name="subinterfaces.vlan"
                                    value={form2.vlan || ''}
                                    size="small"
                                    onChange={(event) =>
                                      handleNestedFormChange(
                                        "interfaces",
                                        index,
                                        event,
                                        index2
                                      )
                                    }
                                    input={<OutlinedInput label="VLAN" />}
                                    MenuProps={MenuProps}
                                  >
                                    {JSON.parse(localStorage.vlan_data)
                                      .map(({ id }) => id)
                                      .map((id) => (
                                        <MenuItem key={id} value={id}>
                                          {id}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  name="ip"
                                  id="subinterfaces"
                                  size="small"
                                  label="IP"
                                  placeholder="192.168.x.1"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "interfaces",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.ip || ''}
                                /> 
                               <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, use mask (e.g. 255.255.255.0) \n\n For ipv6, use prefix (e.g. /64)"}</span>} >                      
                               <TextField
                                  name="subnet"
                                  id="subinterfaces"
                                  size="small"
                                  label="Subnet"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "interfaces",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.subnet || ''}
                                />
                                </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("interfaces", index, "subinterfaces")
                        }
                      >
                        Add sub-interface
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["linterfaces"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Loopback " + form.id} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("linterfaces", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="id"
                        id="linterfaces"
                        error={!form.id && form.id != 0}
                        label="Loopback ID"
                        placeholder="1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.id || ''}
                      />
                      <TextField
                        name="ip"
                        id="linterfaces"
                        error={!form.ip}
                        label="IP"
                        helperText="Must not be 127.x.x.x"
                        placeholder="192.168.99.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      <TextField
                        name="subnet"
                        id="linterfaces"
                        error={!form.subnet}
                        label="Subnet"
                        placeholder="255.255.255.255"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet || ''}
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}         
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("interfaces")}
          >
            Add interface
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 0.2 }}
            size="medium"
            color="primary"
            onClick={() => addFields("linterfaces")}
          >
            Add loopback
          </Button>
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(Interfaces, "interfaces")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {formFields[tabid]["dhcp"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Pool " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("dhcp", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="name"
                        id="dhcp"
                        error={!form.name}
                        label="Pool name"
                        placeholder="pool1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.name || ''}
                      />
                      <FormControl sx={{ mr: 1, width: 220 }}>
                      <Autocomplete
                        required
                        freeSolo
                        autoSelect
                        id="dhcp.ip"
                        value={form.ip || ''}
                        onChange={(event, value) => handleFormChange(event, index, value)}
                        options={networks("netid")}
                        renderInput={(params) => <TextField {...params} error={!form.ip} required={true} label="Network" placeholder="192.168.1.0" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2,  width: 220 }}>
                      <Autocomplete
                        required
                        freeSolo
                        autoSelect
                        id="dhcp.subnet"
                        value={form.subnet || ''}
                        onChange={(event, value) => handleFormChange(event, index, value)}
                        options={networks("subnet")}
                        renderInput={(params) => <TextField {...params} error={!form.subnet} required={true} label="Subnet" placeholder="255.255.255.0" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2,  width: 220 }}>
                      <Autocomplete
                        required
                        freeSolo
                        autoSelect
                        id="dhcp.gateway"
                        value={form.gateway || ''}
                        onChange={(event, value) => handleFormChange(event, index, value)}
                        options={networks("gateway")}
                        renderInput={(params) => <TextField {...params} error={!form.gateway} required={true} label="Gateway" placeholder="192.168.1.1" />}
                      />
                      </FormControl>
                      <TextField
                        name="domæne"
                        label="Domain"
                        id="dhcp"
                        placeholder="domain.internal"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.domæne || ''}
                      />
                      <TextField
                        name="DNS"
                        id="dhcp"
                        label="DNS"
                        placeholder="1.1.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.DNS || ''}
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["dhcpexclusion"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Exclusion " +  index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("dhcpexclusion", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="from"
                        id="dhcpexclusion"
                        label="From"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.from || ''}
                      />
                      <TextField
                        name="to"
                        id="dhcpexclusion"
                        label="To"
                        placeholder="192.168.1.254"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.to || ''}
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["dhcphelper"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Helper " +  index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("dhcphelper", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="ip"
                        id="dhcphelper"
                        label="IP"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Enabled interfaces</InputLabel>
                        <Select
                          name="dhcphelper.enabled"
                          multiple
                          error={!form.enabled.length}
                          value={form.enabled || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}     
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("dhcp")}
          >
            Add pool
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 0.2 }}
            size="medium"
            color="primary"
            onClick={() => addFields("dhcpexclusion")}
          >
            Add exclusion
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("dhcphelper")}
          >
            Add helper
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(DHCP, "dhcp")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={3}>
        {formFields[tabid]["hsrp"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"HSRP " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("hsrp", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel id="hsrp">Port</InputLabel>
                        <Select
                          required
                          defaultValue=""
                         // error={!form.port}
                          name="hsrp.port"
                          value={form.port || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <Tooltip arrow title="Den fælles IP-adresse, som HSRP-gruppen bruger som routerens identitet. Denne IP-adresse flyttes mellem routerne afhængigt af, hvilken router der fungerer som master.">
                      <TextField
                        required
                        name="ip"
                        error={!form.ip}
                        label="Virtual IP"
                        id="hsrp"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Det numeriske ID, der identificerer en specifik HSRP-gruppe. Alle routere i samme VRRP-gruppe deler den virtuelle IP-adresse og arbejder sammen for at opretholde Networksredundans.">
                      <TextField
                        required
                        name="group"
                        id="hsrp"
                        error={!form.group}
                        label="Group"
                        placeholder="1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.group || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Det tal, der bestemmer, hvilken router der bliver master. Højere tal betyder højere prioritet.">
                      <TextField
                      required
                        name="priority"
                        id="hsrp"
                        error={!form.priority}
                        label="Priority"
                        placeholder="100"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.priority || ''}
                      />
                      </Tooltip>
                    </Box>
                    <Tooltip arrow title="preempt betyder at den router med højeste prioritet kan overtage som master, hvis den bliver tilgængelig igen efter en fejl">
                    <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            name="preempt"
                            id="hsrp"
                            checked={form.preempt || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Preempt"
                      />
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["vrrp"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"VRRP " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("vrrp", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel id="vrrp">Port</InputLabel>
                        <Select
                          required
                          defaultValue=""
                          error={!form.port}
                          name="vrrp.port"
                          value={form.port || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <Tooltip arrow title="Den fælles IP-adresse, som VRRP-gruppen bruger som routerens identitet. Denne IP-adresse flyttes mellem routerne afhængigt af, hvilken router der fungerer som master.">
                      <TextField
                        required
                        name="ip"
                        error={!form.ip}
                        label="Virtual IP"
                        id="vrrp"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Det numeriske ID, der identificerer en specifik VRRP-gruppe. Alle routere i samme VRRP-gruppe deler den virtuelle IP-adresse og arbejder sammen for at opretholde Networksredundans.">
                      <TextField
                        required
                        name="group"
                        id="vrrp"
                        error={!form.group}
                        label="Group"
                        placeholder="1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.group || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Det tal, der bestemmer, hvilken router der bliver master. Højere tal betyder højere prioritet.">
                      <TextField
                      required
                        name="priority"
                        id="vrrp"
                        error={!form.priority}
                        label="Priority"
                        placeholder="100"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.priority || ''}
                      />
                      </Tooltip>
                    </Box>
                    <Tooltip arrow title="preempt betyder at den router med højeste prioritet kan overtage som master, hvis den bliver tilgængelig igen efter en fejl">
                    <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            name="preempt"
                            id="vrrp"
                            checked={form.preempt || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Preempt"
                      />
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            );

          })}
          <Tooltip arrow title="HSRP (Hot Standby Router Protocol): Aktiv/standby-router, statisk router ID-tildeling, primært til Cisco-udstyr.">
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("hsrp")}
          >
            Add HSRP
          </Button>
          </Tooltip>
          <Tooltip arrow title="VRRP (Virtual Router Redundancy Protocol): Aktiv/standby-router, dynamisk router ID-tildeling, åben standard, understøttet af flere leverandører.">
          <Button
            variant="contained"
            sx={{ margin: 0.2 }}
            size="medium"
            color="primary"
            onClick={() => {addFields("vrrp");handleClick(
              "warning",
              "Please be aware that VRRP is not supported on older Cisco IOS versions"
            );}}
          >
            Add VRRP
          </Button>
          </Tooltip>
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(FHRP, "fhrp")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={4}>
          {formFields[tabid]["staticroute"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Rute " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("staticroute", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="destinationip"
                        id="staticroute"
                        error={!form.destinationip}
                        label="Destination IP"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.destinationip || ''}
                      />
                      <TextField
                        name="destinationsubnet"
                        id="staticroute"
                        error={!form.destinationsubnet}
                        label="Destination subnet"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.destinationsubnet || ''}
                      />
                      <TextField
                        name="nexthopip"
                        id="staticroute"
                        label="Next-hop IP"
                        onChange={(event) => {
                          handleFormChange(event, index);
                          form.nexthopinterface = [];
                        }}
                        value={form.nexthopip || ''}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Next-hop Interface</InputLabel>
                        <Select
                          name="staticroute.nexthopinterface"
                          value={form.nexthopinterface || ''}
                          defaultValue=""
                          onChange={(event) => {
                            handleFormChange(event, index);
                            form.nexthopip = "";
                          }}
                          input={<OutlinedInput label="Next-hop Interface" />}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <TextField
                        name="distance"
                        label="Distance"
                        id="staticroute"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.distance || ''}
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            color="warning"
                            name="permanent"
                            id="staticroute"
                            checked={form.permanent || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                              if(form.permanent){handleClick(
                                "warning",
                                "Permanent routes are typically a bad idea, only enable if you know what you're doing"
                              );}
                            }}
                          />
                        }
                        label="Permanent"
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("staticroute")}
          >
            Add static route
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(Staticroute, "staticroute")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={5}>
          {formFields[tabid]["ospf"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Process " + form.processid} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("ospf", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <Tooltip arrow title="Bruges til at adskille flere OSPF-processer på samme enhed. Skal være heltal mellem 1 og 65535">
                      <TextField
                        name="processid"
                        id="ospf"
                        required
                        error={!form.processid}
                        label="Process ID"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.processid || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Unik identifikator for OSPF-routeren. Brug en unik IPv4-adresse som router-id, f.eks. en loopback-adresse.">
                      <TextField
                        name="override"
                        id="ospf"
                        placeholder="1.1.1.1"
                        label="Router ID override"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.override || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Enheder i samme område deler OSPF-routingsinformation. Brug samme område-id på alle enheder, der skal kommunikere direkte.">
                      <TextField
                        required
                        error={form.area === undefined || form.area === ""}
                        type="number"
                        name="area"
                        id="ospf"
                        label="Area"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.area || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Tidsinterval mellem udsendelse af OSPF 'Hello' beskeder for at opdage naboer. Standardværdi er 10 sekunder. Øg intervallet forsigtigt for at mindske belastningen.">
                      <TextField
                        name="hellointerval"
                        type="number"
                        id="ospf"
                        placeholder="30"
                        label="Hello interval"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.hellointerval || ''}
                      />
                       </Tooltip>
                       <Tooltip arrow title="Tidsinterval, hvor en OSPF-nabo ikke har udsendt 'Hello' besked, før den betragtes som nede. Anvend en værdi, der er større end Hello-interval for at undgå unødvendige nedetidsproblemer.">
                      <TextField
                        name="deadinterval"
                        id="ospf"
                        type="number"
                        placeholder="120"
                        label="Dead interval"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.deadinterval || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Referencebåndbredde, der bruges til at beregne OSPF-metrisk for interne ruter.">
                      <TextField
                        name="referencebandwidth"
                        type="number"
                        id="ospf"
                        placeholder="1000"
                        label="Reference bandwidth (bits)"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.referencebandwidth || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Prioritet tildelt OSPF-routeren ved valg af Designated Router (DR) og Backup Designated Router (BDR). Højere prioritet øger chancen for at blive valgt som DR eller BDR.">
                      <TextField
                        name="priority"
                        id="ospf"
                        type="number"
                        label="Priority"
                        placeholder="50"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.priority || ''}
                      />
                      </Tooltip>
                      <Tooltip  arrow placement="top" enterDelay={1000} leaveDelay={0} title="Angivelse af de interfaces, hvor OSPF skal være fuldt aktiveret.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Enabled interfaces</InputLabel>
                        <Select
                          name="ospf.enabled"
                          multiple
                          error={!form.enabled.length}
                          value={form.enabled || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} title="Angivelse af de interfaces, hvor OSPF ikke skal sende 'Hello' / deltage i DR/BDR-valg. Brug dette til Network, hvor der ikke er forbundet en OSPF router, men som stadig skal annonceres">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Passive interfaces</InputLabel>
                        <Select
                          name="ospf.passive"
                          multiple
                          value={form.passive || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Passive interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} title="Enable on interfaces that are directly connected to another router without passing thorugh any networks.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Point-to-point interfaces</InputLabel>
                        <Select
                          name="ospf.pointtopoint"
                          multiple
                          value={form.pointtopoint || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={
                            <OutlinedInput label="Point-to-point interfaces" />
                          }
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="Defines if this OSPF process is IPv6">
                      <FormControl>
                          <RadioGroup defaultValue="false" name="ospf.ipv6" onChange={(event) => {
                            handleFormChange(event, index);
                          }} sx={{ ml: 4, mt: 1, mr: 1}}>
                          <FormControlLabel value="false" control={<Radio color="info" orientation="horizontal" size="md" variant="soft" checked={form.ipv6 === false || null} />} label="IPv4" />
                          <FormControlLabel value="true" control={<Radio color="info" orientation="horizontal" size="md" variant="soft" checked={form.ipv6 === true || null} />} label="IPv6" />
                         </RadioGroup>
                        </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="Does router lead to the internet, or should it be the gateway of last resort? If yes, enable this">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultroute"
                            id="ospf"
                            checked={form.defaultroute || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Advertise default route"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Aktiver for at tillade automatisk summarisering af ruter, hvilket kan forenkle ruteinformationen og reducere størrelsen på routetabellen.">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributestatic"
                            id="ospf"
                            checked={form.redistributestatic || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute static"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Aktiver for at tillade automatisk summarisering af ruter, hvilket kan forenkle ruteinformationen og reducere størrelsen på routetabellen.">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributeconnected"
                            id="ospf"
                            checked={form.redistributeconnected || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute connected"
                      />
                      </Tooltip>
                      {formFields[tabid]["ospf"][index][
                        "networks"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#8C7CF0",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "ospf",
                                      index,
                                      "networks",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="networks.ip"
                        value={form2.ip || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "ospf",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("netid")}
                        renderInput={(params) => <TextField {...params} error={!form2.ip} required={true} label="IP" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="networks.subnet"
                        value={form2.subnet || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "ospf",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("subnet")}
                        renderInput={(params) => <TextField {...params} error={!form2.subnet} required={true} label="Subnet" />}
                      />
                      </FormControl>
                            </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["ospf"][index][
                        "redistributions"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "ospf",
                                      index,
                                      "redistributions",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl
                                  sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}
                                >
                                  <InputLabel size="small" id="ospf">
                                    Route
                                  </InputLabel>
                                  <Select
                                    name="redistributions.id"
                                    value={form2.id || ''}
                                    size="small"
                                    onChange={(event) =>
                                      handleNestedFormChange(
                                        "ospf",
                                        index,
                                        event,
                                        index2
                                      )
                                    }
                                    input={<OutlinedInput label="Route" />}
                                    MenuProps={MenuProps}
                                  >
                                    {redistributionchoices()}
                                  </Select>
                                </FormControl>
                               <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, use mask (e.g. 255.255.255.0) \n\n For ipv6, use prefix (e.g. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, use mask (e.g. 255.255.255.0) \n\n For ipv6, use prefix (e.g. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.delaymetric}
                                  name="delaymetric"
                                  id="redistributions"
                                  size="small"
                                  label="Delay metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.delaymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, use mask (e.g. 255.255.255.0) \n\n For ipv6, use prefix (e.g. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.reliabilitymetric}
                                  name="reliabilitymetric"
                                  id="redistributions"
                                  size="small"
                                  label="Reliability metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.reliabilitymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, use mask (e.g. 255.255.255.0) \n\n For ipv6, use prefix (e.g. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.loadmetric}
                                  name="loadmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Load metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.loadmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.mtumetric}
                                  name="mtumetric"
                                  id="redistributions"
                                  size="small"
                                  label="MTU metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.mtumetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="Use default metric">
                                  <FormControlLabel
                                    sx = {{mt: 0}}
                                    labelPlacement="bottom"
                                    control={
                                      <Checkbox
                                        name="defaultmetric"
                                        id="redistributions"
                                        checked={form2.defaultmetric || null}
                                        onChange={(event) => 
                                          handleNestedFormChange(
                                            "ospf",
                                            index,
                                            event,
                                            index2
                                          )
                                        }
                                      />
                                    }
                                    label="Default metric"
                                  />
                                  </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("ospf", index, "networks")
                        }
                      >
                        Add Network advertisment
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("ospf", index, "redistributions")
                        }
                      >
                        Add redistribution
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
                    {formFields[tabid]["v3ospf"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"OSPFv3 process " + form.processid} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("v3ospf", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <Tooltip arrow title="Bruges til at adskille flere OSPF-processer på samme enhed. Skal være heltal mellem 1 og 65535">
                      <TextField
                        name="processid"
                        id="v3ospf"
                        required
                        error={!form.processid}
                        label="Process ID"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.processid || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Unik identifikator for OSPF-routeren. Brug en unik IPv4-adresse som router-id, f.eks. en loopback-adresse.">
                      <TextField
                        name="override"
                        id="v3ospf"
                        placeholder="1.1.1.1"
                        label="Router ID override"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.override || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Enheder i samme område deler OSPF-routingsinformation. Brug samme område-id på alle enheder, der skal kommunikere direkte.">
                      <TextField
                        required
                        error={form.area === undefined || form.area === ""}
                        type="number"
                        name="area"
                        id="v3ospf"
                        label="Area"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.area || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Tidsinterval mellem udsendelse af OSPF 'Hello' beskeder for at opdage naboer. Standardværdi er 10 sekunder. Øg intervallet forsigtigt for at mindske belastningen.">
                      <TextField
                        name="hellointerval"
                        type="number"
                        id="v3ospf"
                        placeholder="30"
                        label="Hello interval"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.hellointerval || ''}
                      />
                       </Tooltip>
                       <Tooltip arrow title="Tidsinterval, hvor en OSPF-nabo ikke har udsendt 'Hello' besked, før den betragtes som nede. Anvend en værdi, der er større end Hello-interval for at undgå unødvendige nedetidsproblemer.">
                      <TextField
                        name="deadinterval"
                        id="v3ospf"
                        type="number"
                        placeholder="120"
                        label="Dead interval"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.deadinterval || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Referencebåndbredde, der bruges til at beregne OSPF-metrisk for interne ruter.">
                      <TextField
                        name="referencebandwidth"
                        type="number"
                        id="v3ospf"
                        placeholder="1000"
                        label="Reference bandwidth (bits)"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.referencebandwidth || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Prioritet tildelt OSPF-routeren ved valg af Designated Router (DR) og Backup Designated Router (BDR). Højere prioritet øger chancen for at blive valgt som DR eller BDR.">
                      <TextField
                        name="priority"
                        id="v3ospf"
                        type="number"
                        label="Priority"
                        placeholder="50"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.priority || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Define authentication key to be used - this will be encrypted in sha1">
                      <TextField
                        name="key"
                        id="v3ospf"
                        label="Authkey"
                        placeholder="50"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.key || ''}
                      />
                      </Tooltip>
                      <Tooltip  arrow placement="top" enterDelay={1000} leaveDelay={0} title="Angivelse af de interfaces, hvor OSPF skal være fuldt aktiveret.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Enabled IPv4 interfaces</InputLabel>
                        <Select
                          name="v3ospf.enabled"
                          multiple
                          value={form.enabled || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled IPv4 interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip  arrow placement="top" enterDelay={1000} leaveDelay={0} title="Angivelse af de interfaces, hvor OSPF skal være fuldt aktiveret.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Enabled IPv6 interfaces</InputLabel>
                        <Select
                          name="v3ospf.enabledv6"
                          multiple
                          value={form.enabledv6 || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled IPv6 interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} title="Angivelse af de interfaces, hvor OSPF ikke skal sende 'Hello' / deltage i DR/BDR-valg. Brug dette til netværk, hvor der ikke er forbundet en OSPF router, men som stadig skal annonceres">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Passive interfaces</InputLabel>
                        <Select
                          name="v3ospf.passive"
                          multiple
                          value={form.passive || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Passive interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} title="Enable on interfaces that are directly connected to another router without passing thorugh any networks.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>IPv4 Point-to-point interfaces</InputLabel>
                        <Select
                          name="v3ospf.pointtopoint"
                          multiple
                          value={form.pointtopoint || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={
                            <OutlinedInput label="IPv4 Point-to-point interfaces" />
                          }
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} title="Enable on interfaces that are directly connected to another router without passing thorugh any networks.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>IPv6 Point-to-point interfaces</InputLabel>
                        <Select
                          name="v3ospf.pointtopointv6"
                          multiple
                          value={form.pointtopointv6 || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={
                            <OutlinedInput label="IPv6 Point-to-point interfaces" />
                          }
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="Make all interfaces be passive by default">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultpassive"
                            id="v3ospf"
                            checked={form.defaultpassive || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Default passive"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Does router lead to the internet, or should it be the gateway of last resort? If yes, enable this">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultroute"
                            id="v3ospf"
                            checked={form.defaultroute || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Advertise default route"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject manually configured (static) routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributestatic"
                            id="v3ospf"
                            checked={form.redistributestatic || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute static"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject directly connected network routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributeconnected"
                            id="v3ospf"
                            checked={form.redistributeconnected || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute connected"
                      />
                      </Tooltip>
                      {formFields[tabid]["v3ospf"][index][
                        "networks"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#8C7CF0",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "v3ospf",
                                      index,
                                      "networks",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="networks.ip"
                        value={form2.ip || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "v3ospf",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("netid")}
                        renderInput={(params) => <TextField {...params} error={!form2.ip} required={true} label="IP" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="networks.subnet"
                        value={form2.subnet || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "v3ospf",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("subnet")}
                        renderInput={(params) => <TextField {...params} error={!form2.subnet} required={true} label="Subnet" />}
                      />
                      </FormControl>
                            </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["v3ospf"][index][
                        "redistributions"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "v3ospf",
                                      index,
                                      "redistributions",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl
                                  sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}
                                >
                                  <InputLabel size="small" id="v3ospf">
                                    Route
                                  </InputLabel>
                                  <Select
                                    name="redistributions.id"
                                    value={form2.id || ''}
                                    size="small"
                                    onChange={(event) =>
                                      handleNestedFormChange(
                                        "v3ospf",
                                        index,
                                        event,
                                        index2
                                      )
                                    }
                                    input={<OutlinedInput label="Route" />}
                                    MenuProps={MenuProps}
                                  >
                                    {redistributionchoices()}
                                  </Select>
                                </FormControl>
                               <Tooltip arrow title="">                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) => 
                                    handleNestedFormChange(
                                      "v3ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="">                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.delaymetric}
                                  name="delaymetric"
                                  id="redistributions"
                                  size="small"
                                  label="Delay metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "v3ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.delaymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.reliabilitymetric}
                                  name="reliabilitymetric"
                                  id="redistributions"
                                  size="small"
                                  label="Reliability metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "v3ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.reliabilitymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="">                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.loadmetric}
                                  name="loadmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Load metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "v3ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.loadmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.mtumetric}
                                  name="mtumetric"
                                  id="redistributions"
                                  size="small"
                                  label="MTU metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "v3ospf",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.mtumetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="Use the default metric for OSPF: typically either 10, 20 or 25">
                                  <FormControlLabel
                                    sx = {{mt: 0}}
                                    labelPlacement="bottom"
                                    control={
                                      <Checkbox
                                        color="warning"
                                        name="defaultmetric"
                                        id="redistributions"
                                        checked={form2.defaultmetric || null}
                                        onChange={(event) => 
                                          handleNestedFormChange(
                                            "v3ospf",
                                            index,
                                            event,
                                            index2
                                          )
                                        }
                                      />
                                    }
                                    label="Default metric"
                                  />
                                  </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        disabled
                        onClick={() =>
                          addNestedFields("v3ospf", index, "networks")
                        }
                      >
                        Add Network advertisment
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("v3ospf", index, "redistributions")
                        }
                      >
                        Add redistribution
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("ospf")}
          >
            Add OSPFv2 process
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => {addFields("v3ospf"); handleClick("warning","Please be aware that OSPFv3 is not supported on older versions of IOS")}}
          >
            Add OSPFv3 process
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(OSPF, "ospf")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={6}>
        {formFields[tabid]["eigrp"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"AS " + form.as} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("eigrp", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <Tooltip arrow placement="top" enterDelay={100} leaveDelay={0} title="Det autonome systemnummer, der identificerer EIGRP-routingdomænet">
                      <TextField
                        name="as"
                        id="eigrp"
                        type="number"
                        required
                        error={!form.as}
                        label="AS"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.as || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} leaveDelay={0}  title={form.ipv6 ? "A 32-bit value, to identify this router - in IPv6, this is required" : "A 32-bit value, to identify this router"}>
                      <TextField
                        name="routerid"
                        error= {!form.routerid && form.ipv6}
                        required={form.ipv6}
                        id="eigrp"
                        placeholder="1.1.1.1"
                        label="Router ID"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.routerid || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Only change this if you know what you're doing">
                      <TextField
                        name="kvalues"
                        id="eigrp"
                        type="number"
                        placeholder="1000"
                        label="K-values (Metric Weights)"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.kvalues || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow  title="Define a secret key - this needs to be the same across all EIGRP routers">
                      <TextField
                        name="key"
                        id="eigrp"
                        label="Authentication key"
                        placeholder="mysecretkey"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.key || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} leaveDelay={0} title="Choose all interfaces where the key should be applied - typically all interfaces with a EIGRP neighbour should be chosen">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Authentication interfaces</InputLabel>
                        <Select
                          name="eigrp.authenabled"
                          multiple
                          error={form.key && !form.authenabled}
                          disabled = {!form.key}
                          value={form.authenabled || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Authentication interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                        <Tooltip
                          arrow
                          placement="top"
                          enterDelay={1000}
                          leaveDelay={0}
                          title={
                            form.defaultpassive
                              ? "Explitly choose what interfaces should be enabled - no neighbourships can be established if this is not defined"
                              : form.ipv6
                              ? "Select interfaces where EIGRP should advertise hello packets"
                              : "This does not need to adjusted, since interfaces are not passive by default"
                          }
                        >
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>{form.ipv6 ? "Participating interfaces" : "Enabled interfaces" }</InputLabel>
                        <Select
                          name="eigrp.enabled"
                          multiple
                          required={form.ipv6}
                          error={!form.enabled.length && form.ipv6}
                          disabled = {!form.defaultpassive && !form.ipv6}
                          value={form.enabled || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={5000} leaveDelay={0} title="Aktiver for at lade EIGRP fungere i passiv tilstand på de valgte grænseflader. Passive grænseflader deltager ikke aktivt i ruteberegninger men lytter stadig til annoncerede ruter fra naboer. Nyttigt for at begrænse trafik uden at deaktivere EIGRP helt.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Passive interfaces</InputLabel>
                        <Select
                          name="eigrp.passive"
                          multiple
                          disabled = {form.defaultpassive}
                          value={form.passive || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Passive interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="Defines if this EIGRP process is IPv6">
                      <FormControl>
                          <RadioGroup defaultValue="false" name="eigrp.ipv6" onChange={(event) => {
                            handleFormChange(event, index);
                          }} sx={{ ml: 4, mt: 1, mr: 1}}>
                          <FormControlLabel value="false" control={<Radio color="info" orientation="horizontal" size="md" variant="soft" checked={form.ipv6 === false || null} />} label="IPv4" />
                          <FormControlLabel value="true" control={<Radio color="info" orientation="horizontal" size="md" variant="soft" checked={form.ipv6 === true || null} />} label="IPv6" />
                         </RadioGroup>
                        </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="All interfaces will be passive by default unless otherwise specified">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultpassive"
                            id="eigrp"
                            checked={form.defaultpassive || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Default passive interfaces"
                      />
                      </Tooltip>
                      <Tooltip arrow title={form.ipv6 ? "This is not supported in IPv6 EIGRP, please explicitly select interfaces in the 'Participating interfaces' dropdown" : "This adds a 0.0.0.0 network statement, thus including all interfaces to be able to participate in the EIGRP routing process"}>
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultroute"
                            id="eigrp"
                            disabled={form.ipv6}
                            checked={form.defaultroute || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Include all interfaces"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Aggregate contiguous subnets into a single summarized route, simplifying the routing table and reducing its size when advertising networks to other routers">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="autosummary"
                            id="eigrp"
                            checked={form.autosummary || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Auto summarization"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject directly connected network routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributeconnected"
                            id="eigrp"
                            checked={form.redistributeconnected || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute connected"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject manually configured (static) routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributestatic"
                            id="eigrp"
                            checked={form.redistributestatic || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute static"
                      />
                      </Tooltip>
                      {formFields[tabid]["eigrp"][index][
                        "networks"
                      ].map((form2, index2) => {
                        return (
                          
                          <Card
                            sx={{
                              border: 2,
                              borderColor: form.ipv6 ? "#424242" : "#8C7CF0",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "eigrp",
                                      index,
                                      "networks",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }} disabled={form.ipv6}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        disabled={form.ipv6}
                        size="small"
                        //name="networks.ip"
                        id="networks.ip"
                        value={form2.ip || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "eigrp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("netid")}
                        getOptionLabel={(ip) => ip}
                        renderInput={(params) => <TextField {...params} error={!form2.ip && !form.ipv6} required={true} label="IP" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        disabled={form.ipv6}
                        //name="networks.ip"
                        id="networks.subnet"
                        value={form2.subnet || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "eigrp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("wildcard")}
                        renderInput={(params) => <TextField {...params} label="Wildcard mask" />}
                      />
                      </FormControl>                    
                               <TextField
                                  disabled={form2.defaultmetric || form.ipv6}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric && !form.ipv6}
                                  name="bandwidthmetric"
                                  type="number"
                                  id="networks"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "eigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                  </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["eigrp"][index][
                        "redistributions"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "eigrp",
                                      index,
                                      "redistributions",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl
                                  sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}
                                >
                                  <InputLabel size="small" id="eigrp">
                                    Route
                                  </InputLabel>
                                  <Select
                                    name="redistributions.id"
                                    value={form2.id || ''}
                                    size="small"
                                    onChange={(event) =>
                                      handleNestedFormChange(
                                        "eigrp",
                                        index,
                                        event,
                                        index2
                                      )
                                    }
                                    input={<OutlinedInput label="Route" />}
                                    MenuProps={MenuProps}
                                  >
                                    {redistributionchoices()}
                                  </Select>
                                </FormControl>
                               <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "eigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.delaymetric}
                                  name="delaymetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="Delay metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "eigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.delaymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.reliabilitymetric}
                                  name="reliabilitymetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="Reliability metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "eigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.reliabilitymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.loadmetric}
                                  name="loadmetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="Load metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "eigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.loadmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.mtumetric}
                                  name="mtumetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="MTU metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "eigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.mtumetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="Use default metric for EIGRP: 1000 100 255 1 1500">
                                  <FormControlLabel
                                    sx = {{mt: 0}}
                                    labelPlacement="bottom"
                                    control={
                                      <Checkbox
                                        color="warning"
                                        name="defaultmetric"
                                        id="redistributions"
                                        checked={form2.defaultmetric || null}
                                        onChange={(event) => 
                                          handleNestedFormChange(
                                            "eigrp",
                                            index,
                                            event,
                                            index2
                                          )
                                        }
                                      />
                                    }
                                    label="Default metric"
                                  />
                                  </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        sx={{display: form.ipv6? "none": ""}}
                        disabled={form.ipv6}
                        onClick={() =>
                          addNestedFields("eigrp", index, "networks")
                        }
                      >
                        Add Network advertisment
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("eigrp", index, "redistributions")
                        }
                      >
                        Add redistribution
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
            {formFields[tabid]["namedeigrp"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"(Named EIGRP) AS " + form.as} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("namedeigrp", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <Tooltip arrow placement="top" enterDelay={100} leaveDelay={0} title="The name of the process">
                      <TextField
                        name="name"
                        id="namedeigrp"
                        required
                        error={!form.name}
                        label="Name"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.name || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={100} leaveDelay={0} title="Det autonome systemnummer, der identificerer EIGRP-routingdomænet">
                      <TextField
                        name="as"
                        id="namedeigrp"
                        type="number"
                        required
                        error={!form.as}
                        label="AS"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.as || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} leaveDelay={0}  title={form.ipv6 ? "A 32-bit value, to identify this router - in IPv6, this is required" : "A 32-bit value, to identify this router"}>
                      <TextField
                        name="routerid"
                        error= {!form.routerid}
                        required={form.ipv6}
                        id="namedeigrp"
                        placeholder="1.1.1.1"
                        label="Router ID"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.routerid || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Only change this if you know what you're doing">
                      <TextField
                        name="kvalues"
                        id="namedeigrp"
                        type="number"
                        placeholder="1000"
                        label="K-values (Metric Weights)"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.kvalues || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow  title="Define a secret key - this needs to be the same across all EIGRP routers - please be aware that authkeys are only applied on explitly enabled interfaces">
                      <TextField
                        name="key"
                        id="namedeigrp"
                        label="Authentication key"
                        placeholder="mysecretkey"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.key || ''}
                      />
                      </Tooltip>
                        <Tooltip arrow placement="top" enterDelay={1000} leaveDelay={0} title={form.defaultpassive ? "Explitly choose what interfaces should be enabled - no neighbourships can be established if this is not defined" : "This does not need to adjusted, since interfaces are not passive by default"}>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Enabled IPv4 interfaces</InputLabel>
                        <Select
                          name="namedeigrp.enabled"
                          multiple
                          value={form.enabled || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled IPv4 interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} leaveDelay={0} title={form.defaultpassive ? "Explitly choose what interfaces should be enabled - no neighbourships can be established if this is not defined" : "This does not need to adjusted, since interfaces are not passive by default"}>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Enabled IPv6 interfaces</InputLabel>
                        <Select
                          name="namedeigrp.v6enabled"
                          multiple
                          value={form.v6enabled || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled IPv6 interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={5000} leaveDelay={0} title="Aktiver for at lade EIGRP fungere i passiv tilstand på de valgte grænseflader. Passive grænseflader deltager ikke aktivt i ruteberegninger men lytter stadig til annoncerede ruter fra naboer. Nyttigt for at begrænse trafik uden at deaktivere EIGRP helt.">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Passive interfaces</InputLabel>
                        <Select
                          name="namedeigrp.passive"
                          multiple
                          value={form.passive || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Passive interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={5000} leaveDelay={0} title="Interfaces that are excluded from the eigrp process">
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                        <InputLabel>Disabled interfaces</InputLabel>
                        <Select
                          name="namedeigrp.disabled"
                          multiple
                          value={form.disabled || []}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Disabled interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="All interfaces will be passive by default unless otherwise specified">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultpassive"
                            id="namedeigrp"
                            checked={form.defaultpassive || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Default passive interfaces"
                      />
                      </Tooltip>
                      <Tooltip arrow title={form.ipv6 ? "This is not supported in IPv6 EIGRP, please explicitly select interfaces in the 'Enabled interfaces' dropdown" : "This adds a 0.0.0.0 network statement, thus including all interfaces to be able to participate in the EIGRP routing process"}>
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultroute"
                            id="namedeigrp"
                            disabled={form.ipv6}
                            checked={form.defaultroute || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Include all IPv4 interfaces"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject directly connected network routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributeconnected"
                            id="namedeigrp"
                            checked={form.redistributeconnected || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute connected"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject manually configured (static) routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributestatic"
                            id="namedeigrp"
                            checked={form.redistributestatic || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute static"
                      />
                      </Tooltip>
                      {formFields[tabid]["namedeigrp"][index][
                        "networks"
                      ].map((form2, index2) => {
                        return (
                          
                          <Card
                            sx={{
                              border: 2,
                              borderColor: form.ipv6 ? "#424242" : "#8C7CF0",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "namedeigrp",
                                      index,
                                      "networks",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }} disabled={form.ipv6}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        disabled={form.ipv6}
                        size="small"
                        //name="networks.ip"
                        id="networks.ip"
                        value={form2.ip || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "namedeigrp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("netid")}
                        getOptionLabel={(ip) => ip}
                        renderInput={(params) => <TextField {...params} error={!form2.ip && !form.ipv6} required={true} label="IP" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        disabled={form.ipv6}
                        //name="networks.ip"
                        id="networks.subnet"
                        value={form2.subnet || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "namedeigrp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("wildcard")}
                        renderInput={(params) => <TextField {...params} label="Wildcard mask" />}
                      />
                      </FormControl>                    
                               <TextField
                                  disabled={form2.defaultmetric || form.ipv6}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric && !form.ipv6}
                                  name="bandwidthmetric"
                                  type="number"
                                  id="networks"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "namedeigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                  </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["namedeigrp"][index][
                        "redistributions"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "namedeigrp",
                                      index,
                                      "redistributions",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl
                                  sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}
                                >
                                  <InputLabel size="small" id="namedeigrp">
                                    Route
                                  </InputLabel>
                                  <Select
                                    name="redistributions.id"
                                    value={form2.id || ''}
                                    size="small"
                                    onChange={(event) =>
                                      handleNestedFormChange(
                                        "namedeigrp",
                                        index,
                                        event,
                                        index2
                                      )
                                    }
                                    input={<OutlinedInput label="Route" />}
                                    MenuProps={MenuProps}
                                  >
                                    {redistributionchoices()}
                                  </Select>
                                </FormControl>
                               <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "namedeigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.delaymetric}
                                  name="delaymetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="Delay metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "namedeigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.delaymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="">                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.reliabilitymetric}
                                  name="reliabilitymetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="Reliability metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "namedeigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.reliabilitymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.loadmetric}
                                  name="loadmetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="Load metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "namedeigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.loadmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.mtumetric}
                                  name="mtumetric"
                                  id="redistributions"
                                  size="small"
                                  type="number"
                                  label="MTU metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "namedeigrp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.mtumetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="Use the default metric for EIGRP: 1000 100 255 1 1500">
                                  <FormControlLabel
                                    sx = {{mt: 0}}
                                    labelPlacement="bottom"
                                    control={
                                      <Checkbox
                                        color="warning"
                                        name="defaultmetric"
                                        id="redistributions"
                                        checked={form2.defaultmetric || null}
                                        onChange={(event) => 
                                          handleNestedFormChange(
                                            "namedeigrp",
                                            index,
                                            event,
                                            index2
                                          )
                                        }
                                      />
                                    }
                                    label="Default metric"
                                  />
                                  </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        disabled={form.ipv6}
                        onClick={() =>
                          addNestedFields("namedeigrp", index, "networks")
                        }
                      >
                        Add Network advertisment
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("namedeigrp", index, "redistributions")
                        }
                      >
                        Add redistribution
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("eigrp")}
          >
            Add EIGRP process
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => {addFields("namedeigrp");handleClick("warning","Please be aware that named EIGRP is not supported on older versions of IOS")}}
          >
            Add named EIGRP process
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(EIGRP, "eigrp")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={7}>
        {formFields[tabid]["bgp"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"AS " + form.as} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <Tooltip arrow placement="left" enterDelay={100} leaveDelay={0} title="Det autonome systemnummer, der identificerer BGP-routingdomænet">
                      <TextField
                        name="as"
                        id="bgp"
                        required
                        type="number"
                        error={!form.as}
                        label="AS"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.as || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow placement="top" enterDelay={1000} leaveDelay={0}  title="Routerens ID er en 32-bit værdi, der bruges til at identificere routeren unikt inden for et AS">
                      <TextField
                        name="routerid"
                        id="bgp"
                        placeholder="1.1.1.1"
                        label="Router ID"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.routerid || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Defines a MD5 hased key to use - this needs to be the same across all BGP routers">
                      <TextField
                        name="key"
                        id="bgp"
                        disabled={!form.ipv6}
                        label="Authentication key"
                        placeholder="mysecretkey"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.key || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title="Use classic on older version of IOS / Packet Tracer - this will disable some features like ipv6 and max-prefix">
                      <FormControl>
                          <RadioGroup defaultValue="false" name="bgp.ipv6" onChange={(event) => {
                            handleFormChange(event, index);
                            if(form.ipv6){handleClick(
                              "warning",
                              "Please be aware that modern BGP is not supported on older Cisco IOS versions"
                            )};
                          }} sx={{ ml: 4, mt: 1, mr: 1}}>
                          <FormControlLabel value="false" control={<Radio color="info" orientation="horizontal" size="md" variant="soft" checked={form.ipv6 === false || null} />} label="Classic" />
                          <FormControlLabel value="true" control={<Radio color="info" orientation="horizontal" size="md" variant="soft" checked={form.ipv6 === true || null} />} label="Modern" />
                         </RadioGroup>
                        </FormControl>
                      </Tooltip>
                      <Tooltip arrow title="Activate if this router should be the gateway of last resort, e.g. if its connected to the internet">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultroute"
                            id="bgp"
                            checked={form.defaultroute || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Advertise default route"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Aggregate contiguous subnets into a single summarized route, simplifying the routing table and reducing its size when advertising networks to other routers">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="autosummary"
                            id="bgp"
                            disabled={!form.ipv6}
                            checked={form.autosummary || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Auto summarization"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject directly connected network routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributeconnected"
                            id="bgp"
                            checked={form.redistributeconnected || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute connected"
                      />
                      </Tooltip>
                      <Tooltip arrow title="Inject manually configured (static) routes into the list of advertised networks">
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="redistributestatic"
                            id="bgp"
                            checked={form.redistributestatic || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Redistribute static"
                      />
                      </Tooltip>
                      {formFields[tabid]["bgp"][index][
                        "neighbours"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#FFC13D",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardHeader sx={{mb:-0.5}} title={<Typography fontSize={13} variant="subtitle2">{"IPv4 peer "  + (index2 + 1)}</Typography>}  />
                            <Divider />
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "bgp",
                                      index,
                                      "neighbours",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  error={!form2.peerip}
                                  required
                                  name="peerip"
                                  id="neighbours"
                                  size="small"
                                  label="Peer IP"
                                  placeholder="192.168.1.1"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.peerip || ''}
                                />
                                </Tooltip>
                               <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  required
                                  name="peeras"
                                  type="number"
                                  id="neighbours"
                                  size="small"
                                  label="Peer AS"
                                  placeholder="27"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.peeras || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title={!form.ipv6 ? "Disabled in classic mode": "BGP neighbor prefix limit is a restriction on the maximum number of IP prefixes a BGP neighbor is allowed to advertise."} >                      
                               <TextField
                                  name="peerprefixlimit"
                                  type="number"
                                  id="neighbours"
                                  disabled={!form.ipv6}
                                  size="small"
                                  label="Prefix limit"
                                  placeholder="3000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.peerprefixlimit || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="If the configured prefix limit is reached, a warning will be issued instead of blocking new advertisements.">
                                    <FormControlLabel
                                      sx={{ m: 0.5 }}
                                      labelPlacement="left"
                                      control={
                                        <Checkbox
                                          color="warning"
                                          disabled={!form2.peerprefixlimit}
                                          name="warningonly"
                                          id="neighbours"
                                          checked={form2.warningonly || null}
                                          onChange={(event) =>
                                            handleNestedFormChange(
                                              "bgp",
                                              index,
                                              event,
                                              index2
                                            )
                                          }
                                        />
                                      }
                                      label="Warning only"
                                    />
                                    </Tooltip>
                                  </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                       {formFields[tabid]["bgp"][index]["v6neighbours"].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#FFC13D",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardHeader sx={{mb:-0.5}} title={<Typography fontSize={13} variant="subtitle2">{"IPv6 peer "  + (index2 + 1)}</Typography>}  />
                            <Divider />
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "bgp",
                                      index,
                                      "v6neighbours",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  error={!form2.peerip}
                                  required
                                  name="peerip"
                                  id="v6neighbours"
                                  size="small"
                                  label="Peer IP"
                                  placeholder="192.168.1.1"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.peerip || ''}
                                />
                                </Tooltip>
                               <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  required
                                  name="peeras"
                                  type="number"
                                  id="v6neighbours"
                                  size="small"
                                  label="Peer AS"
                                  placeholder="27"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.peeras || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="BGP neighbor prefix limit is a restriction on the maximum number of IP prefixes a BGP neighbor is allowed to advertise." >                      
                               <TextField
                                  name="peerprefixlimit"
                                  type="number"
                                  id="v6neighbours"
                                  size="small"
                                  label="Prefix limit"
                                  placeholder="3000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.peerprefixlimit || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="If the configured prefix limit is reached, a warning will be issued instead of blocking new advertisements.">
                                    <FormControlLabel
                                      sx={{ m: 0.5 }}
                                      labelPlacement="left"
                                      control={
                                        <Checkbox
                                          color="warning"
                                          disabled={!form2.peerprefixlimit}
                                          name="warningonly"
                                          id="v6neighbours"
                                          checked={form2.warningonly || null}
                                          onChange={(event) =>
                                            handleNestedFormChange(
                                              "bgp",
                                              index,
                                              event,
                                              index2
                                            )
                                          }
                                        />
                                      }
                                      label="Warning only"
                                    />
                                    </Tooltip>
                                  </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["bgp"][index][
                        "networks"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#8C7CF0",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardHeader sx={{mb:-0.5}} title={<Typography fontSize={13} variant="subtitle2">{"IPv4 network advertisment "  + (index2 + 1)}</Typography>}  />
                            <Divider />
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "bgp",
                                      index,
                                      "networks",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="networks.ip"
                        value={form2.ip || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "bgp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("netid")}
                        getOptionLabel={(ip) => ip}
                        renderInput={(params) => <TextField {...params} error={!form2.ip} required={true} label="IP" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="networks.subnet"
                        value={form2.subnet || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "bgp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("subnet")}
                        renderInput={(params) => <TextField {...params} error={!form2.subnet} required={true} label="Subnet" />}
                      />
                      </FormControl>
                               <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="networks"
                                  type="number"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                  </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["bgp"][index][
                        "v6networks"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#8C7CF0",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardHeader sx={{mb:-0.5}} title={<Typography fontSize={13} variant="subtitle2">{"IPv6 network advertisment " + (index2 + 1)}</Typography>}  />
                            <Divider />
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "bgp",
                                      index,
                                      "v6networks",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="v6networks.ip"
                        value={form2.ip || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "bgp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("netid")}
                        getOptionLabel={(ip) => ip}
                        renderInput={(params) => <TextField {...params} error={!form2.ip} required={true} label="IP" />}
                      />
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        size="small"
                        //name="networks.ip"
                        id="v6networks.prefix"
                        value={form2.prefix || ''}
                        onChange={(event, value) =>
                          handleNestedFormChange(
                            "bgp",
                            index,
                            event,
                            index2,
                            value
                          )
                        }
                        options={networks("subnet")}
                        renderInput={(params) => <TextField {...params} error={!form2.prefix} required={true} label="Prefix" />}
                      />
                      </FormControl>
                               <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="v6networks"
                                  type="number"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                  </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      {formFields[tabid]["bgp"][index][
                        "redistributions"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardHeader sx={{mb:-0.5}} title={<Typography fontSize={13} variant="subtitle2">{"Redistribution " + (index2 + 1)}</Typography>}  />
                            <Divider />
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "bgp",
                                      index,
                                      "redistributions",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <FormControl
                                  sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}
                                >
                                  <InputLabel size="small" id="bgp">
                                    Route
                                  </InputLabel>
                                  <Select
                                    name="redistributions.id"
                                    value={form2.id || ''}
                                    size="small"
                                    onChange={(event) =>
                                      handleNestedFormChange(
                                        "bgp",
                                        index,
                                        event,
                                        index2
                                      )
                                    }
                                    input={<OutlinedInput label="Route" />}
                                    MenuProps={MenuProps}
                                  >
                                    {redistributionchoices()}
                                  </Select>
                                </FormControl>
                               <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.bandwidthmetric}
                                  name="bandwidthmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Bandwidth metric"
                                  placeholder="1000000"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.bandwidthmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="">                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.delaymetric}
                                  name="delaymetric"
                                  id="redistributions"
                                  size="small"
                                  label="Delay metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.delaymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.reliabilitymetric}
                                  name="reliabilitymetric"
                                  id="redistributions"
                                  size="small"
                                  label="Reliability metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.reliabilitymetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="">                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.loadmetric}
                                  name="loadmetric"
                                  id="redistributions"
                                  size="small"
                                  label="Load metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.loadmetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="" >                      
                               <TextField
                                  disabled={form2.defaultmetric}
                                  error={!form2.defaultmetric && !form2.mtumetric}
                                  name="mtumetric"
                                  id="redistributions"
                                  size="small"
                                  label="MTU metric"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "bgp",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.mtumetric || ''}
                                />
                                </Tooltip>
                                <Tooltip arrow title="Use the default metric for bgp: 1">
                                  <FormControlLabel
                                    sx = {{mt: 0}}
                                    labelPlacement="bottom"
                                    control={
                                      <Checkbox
                                        defaultChecked
                                        color="warning"
                                        name="defaultmetric"
                                        id="redistributions"
                                        checked={form2.defaultmetric || null}
                                        onChange={(event) => 
                                          handleNestedFormChange(
                                            "bgp",
                                            index,
                                            event,
                                            index2
                                          )
                                        }
                                      />
                                    }
                                    label="Default metric"
                                  />
                                  </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("bgp", index, "neighbours")
                        }
                      >
                        Add IPv4 peer
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        disabled={!form.ipv6}
                        onClick={() =>
                          addNestedFields("bgp", index, "v6neighbours")
                        }
                      >
                        Add IPv6 peer
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("bgp", index, "networks")
                        }
                      >
                        Add IPv4 network advertisment
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        disabled={!form.ipv6}
                        onClick={() =>
                          addNestedFields("bgp", index, "v6networks")
                        }
                      >
                        Add IPv6 network advertisment
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("bgp", index, "redistributions")
                        }
                      >
                        Add redistribution
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(BGP, "bgp")}
          </Modal>
        </TabPanel>
        <TabPanel value={value || ''} index={8}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={9}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={10}>
          {formFields[tabid]["dynamicnat"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Dynamisk NAT " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("dynamicnat", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <Typography sx={{ ml: "1%" }} color="secondary">
                        Internal IP pool
                      </Typography>
                      <TextField
                        name="interalip"
                        id="dynamicnat"
                        error={!form.interalip}
                        label="Network identifier"
                        placeholder="192.168.1.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.interalip || ''}
                      />
                      <TextField
                        name="internalsubnet"
                        id="dynamicnat"
                        error={!form.internalsubnet}
                        label="Subnet"
                        placeholder="255.255.255.0"
                        onChange={(event) => {
                          handleFormChange(event, index);
                        }}
                        value={form.internalsubnet || ''}
                      />
                      <Divider sx={{ m: 3 }} />
                      <Typography sx={{ ml: "1%" }} color="secondary">
                        External IP pool
                      </Typography>
                      <TextField
                        name="externalstartip"
                        id="dynamicnat"
                        error={!form.externalstartip}
                        label="Start IP"
                        placeholder="209.165.200.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.externalstartip || ''}
                      />
                      <TextField
                        name="externalendip"
                        id="dynamicnat"
                        error={!form.externalendip}
                        label="End IP"
                        placeholder="209.165.200.10"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.externalendip || ''}
                      />
                      <TextField
                        name="externalsubnet"
                        id="dynamicnat"
                        error={!form.externalsubnet}
                        label="Subnet"
                        placeholder="255.255.255.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.externalsubnet || null}
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ mt: 0.5 }}
                        control={
                          <Checkbox
                            color="primary"
                            name="overload"
                            id="dynamicnat"
                            checked={form.overload || null}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="NAT overload"
                      />
                      <Divider sx={{ m: 3 }} />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Internal interface</InputLabel>
                        <Select
                          error={!form.internalinterface.length}
                          multiple
                          MenuProps={MenuProps}
                          name="dynamicnat.internalinterface"
                          value={form.internalinterface || ''}
                          onChange={(event) => {
                            handleFormChange(event, index);
                          }}
                          input={<OutlinedInput label="Internal interface" />}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>External interface</InputLabel>
                        <Select
                          error={!form.externalinterface.length}
                          multiple
                          MenuProps={MenuProps}
                          name="dynamicnat.externalinterface"
                          value={form.externalinterface || ''}
                          onChange={(event) => {
                            handleFormChange(event, index);
                          }}
                          input={<OutlinedInput label="External interface" />}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["dynamicnatport"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Portbaseret dynamisk NAT " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("dynamicnatport", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="interalip"
                        id="dynamicnatport"
                        error={!form.interalip}
                        label="Internal networkaddress"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.interalip || ''}
                      />
                      <TextField
                        name="internalsubnet"
                        id="dynamicnatport"
                        error={!form.internalsubnet}
                        label="Subnet"
                        placeholder="255.255.255.0"
                        onChange={(event) => {
                          handleFormChange(event, index);
                        }}
                        value={form.internalsubnet || ''}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Internal interface</InputLabel>
                        <Select
                          error={!form.internalinterface.length}
                          name="dynamicnatport.internalinterface"
                          multiple
                          value={form.internalinterface || ''}
                          MenuProps={MenuProps}
                          onChange={(event) => {
                            handleFormChange(event, index);
                          }}
                          input={<OutlinedInput label="Internal interface" />}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>External interface</InputLabel>
                        <Select
                          defaultValue=""
                          error={!form.externalinterface_}
                          name="dynamicnatport.externalinterface_"
                          value={form.externalinterface_ || ''}
                          onChange={(event) => {
                            handleFormChange(event, index);
                          }}
                          input={<OutlinedInput label="External interface" />}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Tooltip
                            arrow
                            placement="top"
                            title="Overload is requried"
                          >
                            <Checkbox color="primary" checked={true} />
                          </Tooltip>
                        }
                        label="Overload"
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["staticnat"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Statisk NAT " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("staticnat", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="interalip"
                        id="staticnat"
                        error={!form.interalip}
                        label="Internal IP"
                        placeholder="192.168.1.10"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.interalip || ''}
                      />
                      <TextField
                        name="externalip"
                        id="staticnat"
                        error={!form.externalip}
                        label="External IP"
                        placeholder="209.165.200.10"
                        onChange={(event) => {
                          handleFormChange(event, index);
                        }}
                        value={form.externalip || ''}
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Tooltip
            arrow
            title="NAT is between a pool of internal IPs and a pool external IPs"
          >
            <Button
              variant="contained"
              sx={{ m: 1 }}
              size="medium"
              color="primary"
              onClick={() => addFields("dynamicnat")}
            >
              Add dynamic NAT
            </Button>
          </Tooltip>
          <Tooltip
            arrow
            title="NAT is between a pool af internal IPs and the IP of a single external interface"
          >
            <Button
              variant="contained"
              sx={{ m: 1 }}
              size="medium"
              color="primary"
              onClick={() => addFields("dynamicnatport")}
            >
              Add portbased dynamic NAT
            </Button>
          </Tooltip>
          <Tooltip
            arrow
            title="NAT is between a single internal IP & a single external IP"
          >
            <Button
              variant="contained"
              sx={{ m: 1 }}
              size="medium"
              color="primary"
              onClick={() => addFields("staticnat")}
            >
              Add static NAT
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(NAT, "nat")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={11}>
        {formFields[tabid]["basicsecurity"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Basic security (not enabled) "} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                  <Tooltip arrow title="Automates the process of securing the router by applying recommended settings.">
                    <FormControlLabel
                      labelPlacement="bottom"
                      sx={{ m: 1.5 }}
                      control={
                        <Switch
                        disabled
                          name="autosecure"
                          id="basicsecurity"
                          checked={form.autosecure}
                          onChange={(event) => handleFormChange(event, index)}
                        />
                      }
                      label="Cisco AutoSecure"
                    />
                  </Tooltip>
                <Tooltip arrow title="Protects against TCP SYN-flooding attacks by intercepting and validating TCP connection requests.">
                <FormControlLabel
                  labelPlacement="bottom"
                  sx={{ m: 1.5 }}
                  control={
                    <Switch
                    disabled
                      name="tcpintercept"
                      id="basicsecurity"
                      checked={form.tcpintercept}
                      onChange={(event) => handleFormChange(event, index)}
                    />
                  }
                  label="TCP Intercept"
                />
              </Tooltip>
              <Tooltip arrow title="Configures security features for IPv6 networks.">
              <FormControlLabel
                labelPlacement="bottom"
                sx={{ m: 1.5 }}
                control={
                  <Switch
                  disabled
                    name="ipv6security"
                    id="basicsecurity"
                    checked={form.ipv6security}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                }
                label="IPv6 First Hop Security"
              />
            </Tooltip>
            <Tooltip arrow placement="top" title="Restricts IP traffic on untrusted Layer 2 interfaces by filtering based on IP source addresses.">
            <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
            <InputLabel>IP Source Guard</InputLabel>
              <Select
                  disabled
                  multiple
                  defaultValue=""
                  name="basicsecurity.ipsourceguard"
                  value={form.ipsourceguard || []}
                  onChange={(event) => {
                      handleFormChange(event, index);
                  }}
                  input={<OutlinedInput label="IP Source Guard" />}
               >
              {porte()}
              </Select>
            </FormControl>
            </Tooltip>
            <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
            <InputLabel>Dynamic ARP Inspection</InputLabel>
              <Select
                                     disabled
                  multiple
                  defaultValue=""
                  name="basicsecurity.dai"
                  value={form.dai || []}
                  onChange={(event) => {
                      handleFormChange(event, index);
                  }}
                  input={<OutlinedInput label="Dynamic ARP Inspection" />}
               >
              {JSON.parse(localStorage.vlan_data).map(({ id }) => id).map((id) => (<MenuItem key={id} value={id}>VLAN {id}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 180 }}>
            <InputLabel>DHCP snooping</InputLabel>
              <Select
                                  disabled
                  multiple
                  defaultValue=""
                  name="basicsecurity.dhcpsnooping"
                  value={form.dhcpsnooping || []}
                  onChange={(event) => {
                      handleFormChange(event, index);
                  }}
                  input={<OutlinedInput label="DHCP snooping" />}
               >
              {JSON.parse(localStorage.vlan_data).map(({ id }) => id).map((id) => (<MenuItem key={id} value={id}>VLAN {id}</MenuItem>))}
              </Select>
            </FormControl>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {formFields[tabid]["localaaa"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"Local AAA"} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                        <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultcon0"
                            id="localaaa"
                            checked={form.defaultcon0 || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Apply for con0"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultaux0"
                            id="localaaa"
                            checked={form.defaultaux0 || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Apply for aux0"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultvty"
                            id="localaaa"
                            checked={form.defaultvty  || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Apply for vty"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultauthentication"
                            id="localaaa"
                            checked={form.defaultauthentication || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Default authentication"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultauthorization"
                            id="localaaa"
                            checked={form.defaultauthorization || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Default authorization"
                      />
                      {formFields[tabid]["localaaa"][index][
                        "users"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              width: "100%",
                              mb: 3,
                              mt: 3,
                            }}
                          >
                            <CardContent>
                              <div key={index}>
                                <IconButton
                                  sx={{ float: "right", mt: 1 }}
                                  onClick={() =>
                                    removeNestedFields(
                                      "localaaa",
                                      index,
                                      "users",
                                      index2
                                    )
                                  }
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                                <TextField
                                  name="username"
                                  error={!form2.username}
                                  id="users"
                                  size="small"
                                  label="Username"
                                  placeholder="1"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "localaaa",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.username || ''}
                                />
                                <TextField
                                  name="password"
                                  id="users"
                                  size="small"
                                  label="Password"
                                  error={!form2.password}
                                  placeholder="Kode1234!"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "localaaa",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.password || ''}
                                /> 
                                     <Tooltip arrow title={
                                      <Typography>
                                        0: Limited commands.<br />
                                        1-14: Gradual access increase.<br />
                                        15: Full admin control.<br />
                                      </Typography>
                                    }>
                                 <TextField
                                  name="privilege"
                                  id="users"
                                  size="small"
                                  label="Privilege"
                                  placeholder="5"
                                  onChange={(event) =>
                                    handleNestedFormChange(
                                      "localaaa",
                                      index,
                                      event,
                                      index2
                                    )
                                  }
                                  value={form2.privilege || ''}
                                /> 
                                </Tooltip>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      <Divider sx={{ m: 2.5 }} />
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          addNestedFields("localaaa", index, "users")
                        }
                      >
                        Add user
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
           {formFields[tabid]["advancedaaa"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={form.protocol +" "+ index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("advancedaaa", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                      <InputLabel>Protokol</InputLabel>
                      <Select
                          defaultValue=""
                          error={!form.id}
                          name="advancedaaa.protocol"
                          value={form.protocol || ''}
                          onChange={(event) => {
                            handleFormChange(event, index);
                          }}
                          input={<OutlinedInput label="Protokol" />}
                        >
                              <MenuItem value={"radius"}>RADIUS</MenuItem>
                              <MenuItem value={"tacacs"}>TACACS</MenuItem>
                        </Select>
                        </FormControl>
                      <TextField
                        name="id"
                        id="advancedaaa"
                        error={!form.id}
                        label="Process name"
                        placeholder="pro1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.id || ''}
                      />
                       <Tooltip arrow title={`${form.protocol} server IP`}>
                      <TextField
                        required
                        name="ip"
                        id="advancedaaa"
                        label="IP"
                        placeholder="192.168.1.100"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title={`${form.protocol} server port`}>
                      <TextField
                        required
                        name="port"
                        error={!form.port}
                        id="advancedaaa"
                        label="Port"
                        placeholder={form.protocol === "radius" ? "1812" : "49"}
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.port || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title={`Accounting port (radius only)`}>
                      <TextField
                        name="port2"
                        disabled={form.protocol === "tacacs"}
                        id="advancedaaa"
                        label="Accounting Port"
                        placeholder="1813"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.port2 || ''}
                      />
                      </Tooltip>
                      <Tooltip arrow title={`${form.protocol} secret key`}>
                      <TextField
                        name="secret"
                        id="advancedaaa"
                        label="Shared key"
                        placeholder="mysecret"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.secret || ''}
                      />
                      </Tooltip>
                      <TextField
                      label="Timeouts (seconds)"
                      type="number"
                      name="timeout"
                      id="advancedaaa"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={form.timeout || ''}
                       onChange={(event) => handleFormChange(event, index)}
                      />
                       <Tooltip arrow placement="top" title={`Angiver interfacet til kommunikation med ${form.protocol} serveren`}>
                       <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 218 }}>
                      <InputLabel>Source interface</InputLabel>
                       <Select
                          name="advancedaaa.sourceinterface"
                          value={form.sourceinterface || ''}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Source interface" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                        </FormControl>
                        </Tooltip>
                      <Tooltip arrow title={`Fald tilbage til local authentication, hvis ${form.protocol} server ikke er tilgængelig`}>
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="fallback"
                            id="advancedaaa"
                            checked={form.fallback || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Local fallback"
                      />
                       </Tooltip>
                        <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultcon0"
                            id="advancedaaa"
                            checked={form.defaultcon0 || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Apply for con0"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultvty"
                            id="advancedaaa"
                            checked={form.defaultvty || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Apply for vty"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultaux0"
                            id="advancedaaa"
                            checked={form.defaultaux0 || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Apply for aux0"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultauthentication"
                            id="advancedaaa"
                            checked={form.defaultauthentication|| null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Default authentication"
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        sx={{ m: 1.5 }}
                        control={
                          <Switch
                            name="defaultauthorization"
                            id="advancedaaa"
                            checked={form.defaultauthorization|| null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Default authorization"
                      />
                        <FormControlLabel
                        sx={{ m: 1.5 }}
                        labelPlacement="bottom"
                        control={
                          <Switch
                            name="defaultaccounting"
                            id="advancedaaa"
                            checked={form.defaultaccounting || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Default accounting"
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}          
            {formFields[tabid]["urpf"].map((form, index) => {
            return (
              <Card sx={{ width: "100%", mb: 3 }}>
                <CardHeader title={"urpf " + index} />
                <Divider />
                <CardContent>
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        mt: 1,
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("urpf", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="ip"
                        error={form.subnet && !form.ip}
                        label="IP"
                        id="urpf"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip || ''}
                      />
                      <Tooltip arrow title={<span style={{ whiteSpace: 'pre-line' }}>{"For ipv4, benyt subnet maske (ex. 255.255.255.0) \n\n For ipv6, benyt cidr (ex. /64)"}</span>} >
                      <TextField
                        name="subnet"
                        id="urpf"
                        error={form.ip && !form.subnet}
                        label="Subnet"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet || ''}
                      />
                      </Tooltip>
                      <TextField
                        name="description"
                        id="urpf"
                        label="Description"
                        placeholder="portbeskrivelse"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.description || ''}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                      <Autocomplete
                        sx={{ mr: -1, ml: -1.2, mt: -1, width: 220 }}
                        required
                        freeSolo
                        autoSelect
                        name="urpf.port"
                        id="urpf.port"
                        value={form.port || ''} 
                        onChange={(event, value) => handleFormChange(event, index, value)}
                        options={porte("custom")}
                        renderInput={(params) => <TextField {...params} required={true} error={!form.port} label="Port" />}
                      />
                      </FormControl>
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            color="warning"
                            name="shutdown"
                            id="urpf"
                            checked={form.shutdown || null}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Shutdown"
                      />
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })} 
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            size="medium"
            color="primary"
            onClick={() => addFields("advancedaaa")}
          >
            Add RADIUS/TACACS
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 0.2 }}
            size="medium"
            color="primary"
            onClick={() => addFields("urpf")}
          >
            Add uRPF
          </Button>
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Show config
          </Button>
          <Modal open={open} onClose={handleClose}>
            {ModalContent(Security, "security")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={12}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={3}
            >
                <Grid item xs="auto">
                <Card>
                  <CardHeader title="Notes" />
                  <Divider />
                  <CardContent sx={{ width: 1085, justifyContent: "center" }}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "100%" },
                      }}
                      autoComplete="off"
                    >
                      <TextField
                        label="Notes about this router (will not included in the final configuration)"
                        multiline
                        maxRows={Infinity}
                        minRows={5}
                        style={{ width: "97%" }}
                        onChange={(event) => {
                          let data = [...formFields];
                          data[tabid]["misc"][1] = {
                            noter: event.target.value,
                          };
                          setformFields(data);
                          localStorage.router_data = JSON.stringify(data);
                          if (sessionStorage.sessionid) {
                            syncupchange(
                              sessionStorage.router_tabid,
                              "misc",
                              data[tabid]["misc"],
                              "router"
                            );
                          }
                        }}
                        value={formFields[tabid]["misc"][1]["noter"] || ''}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs="auto">
                <Card>
                  <CardHeader title="Top custom configuration" />
                  <Divider />
                  <CardContent sx={{ width: 530, justifyContent: "center" }}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <TextField
                        label="Will be added at the top of the final configuration"
                        multiline
                        placeholder='One line at a time - do NOT include "configure terminal"'
                        maxRows={Infinity}
                        minRows={5}
                        inputProps={{ style: { color: "#FFC13D" } }}
                        style={{ width: "97%" }}
                        onChange={(event) => {
                          let data = [...formFields];
                          data[tabid]["misc"][2] = {
                            customconfig: event.target.value,
                          };
                          setformFields(data);
                          localStorage.router_data = JSON.stringify(data);
                          if (sessionStorage.sessionid) {
                            syncupchange(
                              sessionStorage.router_tabid,
                              "misc",
                              data[tabid]["misc"],
                              "router"
                            );
                          }
                        }}
                        value={formFields[tabid]["misc"][2]["customconfig"] || ''}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs="auto">
                <Card>
                  <CardHeader title="Bottom custom configuration" />
                  <Divider />
                  <CardContent sx={{ width: 530, justifyContent: "center" }}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <TextField
                        label="Will be added at the bottom of the final configuration"
                        multiline
                        placeholder='One line at a time - do NOT include "configure terminal"'
                        maxRows={Infinity}
                        minRows={5}
                        inputProps={{ style: { color: "#FFC13D" } }}
                        style={{ width: "97%" }}
                        onChange={(event) => {
                          let data = [...formFields];
                          data[tabid]["misc"][0] = {
                            customconfig: event.target.value,
                          };
                          setformFields(data);
                          localStorage.router_data = JSON.stringify(data);
                          if (sessionStorage.sessionid) {
                            syncupchange(
                              sessionStorage.router_tabid,
                              "misc",
                              data[tabid]["misc"],
                              "router"
                            );
                          }
                        }}
                        value={formFields[tabid]["misc"][0]["customconfig"] || ''}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </TabPanel>
      </div>
    );
  }
  try {
    return (
      <>
        <Helmet>
          <title>Router</title>
        </Helmet>
        <Container>
          <Grid
            sx={{ mt: 2 }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Box sx={{ float: "right"}}>
                <Button
                  onClick={() => {
                    run();
                  }}
                  startIcon={<SyncIcon />}
                  variant="outlined"
                >
                  Sync
                </Button>
              </Box>
              <Box>
                <Tabs
                  value={tabid}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons={true}
                  sx={{ mb: 3}}
                  //style={{ width: "87%"}}
                >
                  <Tab label={tablabel(0)} />
                  {tabs.map((child) => child)}
                  <Tab icon={<AddIcon />} value="tabProperties" disabled={tabs.length > 13} />
                </Tabs>
                <Divider />
                <TabPanel tabid={tabid}>{Content()}</TabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  } catch (e) {
    console.error(e);
    return StatusError("router");
  }
}

export default Router;