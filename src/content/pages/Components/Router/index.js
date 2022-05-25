import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import { useState } from "react";
import * as React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Switch from "src/components/Switch";
import { syncup } from "src/handlers/Sync";
import { syncdown } from "src/handlers/Sync";
import { Initial } from "src/handlers/ConfigGenerator/Router";
import { Interfaces } from "src/handlers/ConfigGenerator/Router";
import { DHCP } from "src/handlers/ConfigGenerator/Router";
import { Staticroute } from "src/handlers/ConfigGenerator/Router";
import { StatusComingSoon } from "src/content/pages/Status/ComingSoon";

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
  Tab,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  Modal,
} from "@mui/material";

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
    <div
    //role="tabpanel"
    //hidden={value !== index}
    //id={`simple-tabpanel-${index}`}
    //aria-labelledby={`simple-tab-${index}`}
    //{...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//function a11yProps(index) {
//  return {
//    id: `simple-tab-${index}`,
//    "aria-controls": `simple-tabpanel-${index}`,
//  };
//}
let maxTabIndex = 0;
let alerttext = "";
let alertsev = "info";

const porte = ["gi0/0", "gi0/1", "port-channel 1"];

sessionStorage.router_tabid = 0;

if (
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

var p = 0;

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

  // Handle Tab Button Click
  const [tabs, setAddTab] = useState([]);
  const [tabid, settabid] = useState(0);
  const handleTabChange = (event, newtabid) => {
    if (newtabid === "tabProperties") {
      let workingtabindex = maxTabIndex + 2;
      let data = [...formFields];
      let object = {
        interfaces: [{ porte: [] }],
        dhcp: [{ ip: "" }],
        initial: [
          {
            hostname: "R" + workingtabindex,
            clock: true,
            synchronuslogging: true,
            ipv6unicastrouting: true,
            passwordencryption: true,
            disabledomainlookup: true,
            enablessh: true,
            cdp: true,
            sshv2: false,
            genereatersa: false,
          },
        ],
        staticroute: [{}],
      };
      data.push(object);
      setformFields(data);
      syncup(data, "router");
      localStorage.router_data = JSON.stringify(data);
      //let data2 = JSON.parse(localStorage.router_final);
      //data2.push({ initial: "" });
      //localStorage.router_final = JSON.stringify(data2);
      handleAddTab();
    } else {
      sessionStorage.router_tabid = newtabid;
      settabid(newtabid);
      syncdown("router");
      setTimeout(() => {
        setformFields(JSON.parse(localStorage.router_data));
      }, 600);
      run2();
    }
  };

  // Handle Add Tab Button

  function onreloadtab() {
    let tabdata = [...tabs];
    if (JSON.parse(localStorage.router_data).length != 1) {
      while (
        JSON.parse(localStorage.router_data).length !=
        tabdata.length + 1
      ) {
        maxTabIndex = maxTabIndex + 1;
        tabdata.push(<Tab label={tablabel(maxTabIndex)} key={maxTabIndex} />);
      }
      setAddTab(tabdata);
    }
  }

  const handleAddTab = () => {
    let tabdata = [...tabs];
    maxTabIndex = maxTabIndex + 1;
    tabdata.push(<Tab label={tablabel(maxTabIndex)} key={maxTabIndex} />);
    setAddTab(tabdata);
  };

  const [value, setValue] = useState(0);

  function sleep(ms) {
    setValue(false);
    syncdown("router");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run() {
    // Pause execution of this async function for 2 seconds
    await sleep(250);
    onreloadtab();
    setValue(value);
  }

  function sleep3(ms) {
    setValue(false);
    syncdown("router");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run3() {
    await sleep(250);
    addFields("initial");
    setValue(value);
  }

  function sleep2(ms) {
    setValue(false);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run2() {
    await sleep2(350);
    setValue(0);
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
  };

  const [formFields, setformFields] = useState(
    JSON.parse(localStorage.router_data)
  );

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    //if (data[0][event.target.id][index] == undefined) {data[0][event.target.id] = {}}
    if (event.target.type == "checkbox") {
      data[sessionStorage.router_tabid][event.target.id][index][
        event.target.name
      ] = event.target.checked;
    } else if (event.target.type == "text") {
      data[sessionStorage.router_tabid][event.target.id][index][
        event.target.name
      ] = event.target.value;
    } //(Array.isArray(event.target.value))
    else {
      var parsed = event.target.name.split("."),
        id = parsed[0],
        name = parsed[1];
      data[sessionStorage.router_tabid][id][index][name] = event.target.value;
    }

    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    syncup(data, "router");
  };

  const addFields = (id) => {
    let data = [...formFields];
    let object = {
      porte: [],
      dhcp: [],
      hostname: "",
    };
    data[sessionStorage.router_tabid][id].push(object);
    //workingarray = formFields[tabid]
    setformFields(data);
  };

  const removeFields = (id, index) => {
    let data = [...formFields];
    data[sessionStorage.router_tabid][id].splice(index, 1);
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    syncup(formFields, "router");
  };

  //window.onload = function () {};

  if (maxTabIndex == 0) {
    syncdown("router");
    onreloadtab();
  }

  function ModalContent(func, id) {
    return (
      <Box sx={style}>
        <Typography variant="h4" component="h2">
          Konfig genereret
        </Typography>
        <TextField
          multiline
          sx={{ mt: 2 }}
          inputProps={{ style: { color: "#FFC13D" } }}
          maxRows={Infinity}
          rows={5}
          style={{ width: "100%" }}
          value={
            "configure terminal" + func(sessionStorage.router_tabid) + "\nend"
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
            handleClick("success", "Konfig kopieret til udklipsholder");
          }}
          variant="contained"
          sx={{ right: "20%", left: "20%", mt: 3, ml: 1 }}
          size="small"
          color="secondary"
        >
          Kopier til udklipsholder
        </Button>
      </Box>
    );
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

  function validhandleFormChange(statement, tru, errrormessage, event, index) {
    if (statement) {
      if (statement == tru) {
        handleClick("error", errrormessage);
      } else {
        handleFormChange(event, index);
      }
    } else {
      handleClick("error", errrormessage);
    }
  }

  function Content() {
    return (
      <div>
        <Snackbar
          open={open2}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleClose2}
          autoHideDuration={2000}
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
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            syncdown("router");
            setTimeout(() => {
              setformFields(JSON.parse(localStorage.router_data));
            }, 600);
          }}
        >
          <Tab label="Initial settings" />
          <Tab label="Interfaces" />
          <Tab label="Subinterfaces" />
          <Tab label="DHCP" />
          <Tab label="Static route" />
          <Tab label="FHRP" />
          <Tab label="RIP" />
          <Tab label="ACL" />
          <Tab label="Noter" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Card>
            <CardHeader title="Basale router indstillinger" />
            <Divider />
            <CardContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
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
                          error={form.hostname == ""}
                          id="initial"
                          name="hostname"
                          label="Hostname"
                          value={form.hostname}
                          autoFocus={true}
                          placeholder="R1"
                          onChange={(event) => {
                            handleFormChange(event, 0);
                            tablabel();
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          name="motd"
                          InputLabelProps={{ shrink: true }}
                          label="MOTD"
                          value={form.motd}
                          placeholder="Authorized access only!"
                          onChange={(event) => handleFormChange(event, 0)}
                        />
                        <TextField
                          id="initial"
                          label="Domæne"
                          name="domæne"
                          value={form.domæne}
                          placeholder="domain.internal"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          name="secret"
                          label="Enable secret"
                          value={form.secret}
                          placeholder="class"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          value={form.con0pass}
                          name="con0pass"
                          label="Con 0 password"
                          placeholder="cisco"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          name="vtypass"
                          value={form.vtypass}
                          label="Vty 0-15 password"
                          placeholder="cisco"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          id="initial"
                          name="model"
                          value={form.model}
                          label="Model"
                          placeholder="cisco"
                          onChange={(event) => handleFormChange(event, 0)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <Grid
                          sx={{ mt: 3, mb: 4 }}
                          container
                          justifyContent="center"
                        >
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="Set clock"
                                id="initial"
                                checked={form.clock}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Set clock"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="synchronuslogging"
                                id="initial"
                                checked={form.synchronuslogging}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Synchronus logging  (con0)"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="ipv6unicastrouting"
                                id="initial"
                                checked={form.ipv6unicastrouting}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="IPv6 unicast routing"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="passwordencryption"
                                id="initial"
                                checked={form.passwordencryption}
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
                                checked={form.disabledomainlookup}
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
                                checked={form.enablessh}
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
                                checked={form.sshv2}
                                onChange={(event) => {
                                  validhandleFormChange(
                                    form.genereatersa,
                                    false,
                                    "SSHv2 kræver RSA",
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
                                checked={form.genereatersa}
                                onChange={(event) =>
                                  validhandleFormChange(
                                    form.domæne,
                                    "",
                                    "RSA kræver domæne",
                                    event,
                                    index
                                  )
                                }
                              />
                            }
                            label="Genereate RSA"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="telnet"
                                id="initial"
                                checked={form.telnet}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="Telnet"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="cdp"
                                id="initial"
                                checked={form.cdp}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="CDP"
                          />
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="lldp"
                                id="initial"
                                checked={form.lldp}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                              />
                            }
                            label="LLDP"
                          />
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
                  Ryd felter
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
                  Vis config
                </Button>
                <Modal open={open} onClose={handleClose}>
                  {ModalContent(Initial, "initial")}
                </Modal>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="Interfaces" />
            <Divider />
            <CardContent>
              {formFields[tabid]["interfaces"].map((form, index) => {
                return (
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields("interfaces", index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="ip"
                        label="IP"
                        id="interfaces"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip}
                      />
                      <TextField
                        name="subnet"
                        id="interfaces"
                        label="Subnet"
                        placeholder="255.255.255.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet}
                      />
                      <TextField
                        name="description"
                        id="interfaces"
                        label="Description"
                        placeholder="portbeskrivelse"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.description}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel id="interfaces">Porte</InputLabel>
                        <Select
                          name="interfaces.porte"
                          multiple
                          value={form.porte}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {porte.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            color="warning"
                            name="shutdown"
                            id="interfaces"
                            checked={form.shutdown}
                            onChange={(event) => handleFormChange(event, index)}
                          />
                        }
                        label="Shutdown"
                      />

                      <Divider sx={{ mt: 2, mb: 2 }} />
                    </Box>
                  </div>
                );
              })}
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                size="medium"
                color="primary"
                onClick={() => addFields("interfaces")}
              >
                Tilføj interface
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleOpen();
                }}
              >
                Vis config
              </Button>
              <Modal open={open} onClose={handleClose}>
                {ModalContent(Interfaces, "interfaces")}
              </Modal>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="DHCP" />
            <Divider />
            <CardContent>
              {formFields[tabid]["dhcp"].map((form, index) => {
                return (
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
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
                        name="navn"
                        id="dhcp"
                        label="Pool navn"
                        placeholder="pool1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.navn}
                      />
                      <TextField
                        name="ip"
                        id="dhcp"
                        label="Netværk"
                        placeholder="192.168.1.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip}
                      />
                      <TextField
                        name="subnet"
                        id="dhcp"
                        label="Subnet"
                        placeholder="255.255.255.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet}
                      />
                      <TextField
                        name="gateway"
                        label="Gateway"
                        id="dhcp"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.gateway}
                      />
                      <TextField
                        name="domæne"
                        label="Domæne"
                        id="dhcp"
                        placeholder="domain.internal"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.domæne}
                      />
                      <TextField
                        name="DNS"
                        id="dhcp"
                        label="DNS"
                        placeholder="1.1.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.DNS}
                      />
                      <Divider sx={{ mt: 2, mb: 2 }} />
                    </Box>
                  </div>
                );
              })}
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                size="medium"
                color="primary"
                onClick={() => addFields("dhcp")}
              >
                Tilføj pool
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleOpen();
                }}
              >
                Vis config
              </Button>
              <Modal open={open} onClose={handleClose}>
                {ModalContent(DHCP, "dhcp")}
              </Modal>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="Static route" />
            <Divider />
            <CardContent>
              {formFields[tabid]["staticroute"].map((form, index) => {
                return (
                  <div key={index}>
                    <Box // sx={{ width: '100%' }}
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
                        label="Destination IP"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.destinationip}
                      />
                      <TextField
                        name="destinationsubnet"
                        id="staticroute"
                        label="Destination subnet"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.staticroute}
                      />
                      <TextField
                        name="nexthopip"
                        disabled={form.nexthopinterface}
                        id="staticroute"
                        label="Next-hop IP"
                        onChange={(event) => {
                          handleFormChange(event, index);
                          element.nexthopinterface = "";
                        }}
                        value={form.nexthopip}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Next-hop Interface</InputLabel>
                        <Select
                          disabled={form.nexthopip}
                          name="staticroute.nexthopinterface"
                          value={form.nexthopinterface}
                          onChange={(event) => {
                            handleFormChange(event, index);
                            element.nexthopip = "";
                          }}
                          input={<OutlinedInput label="Next-hop Interface" />}
                        >
                          {porte.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        name="distance"
                        label="Distance"
                        id="staticroute"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.distance}
                      />
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            color="warning"
                            name="permanent"
                            id="staticroute"
                            checked={form.permanent}
                            onChange={(event) => {
                              handleFormChange(event, index);
                              handleClick(
                                "warning",
                                "Permanent ruter er typisk en dårlig ide, slå kun til hvis du ved hvad du laver"
                              );
                            }}
                          />
                        }
                        label="Permanent"
                      />
                      <Divider sx={{ mt: 2, mb: 2 }} />
                    </Box>
                  </div>
                );
              })}
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                size="medium"
                color="primary"
                onClick={() => addFields("staticroute")}
              >
                Tilføj statisk rute
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleOpen();
                }}
              >
                Vis config
              </Button>
              <Modal open={open} onClose={handleClose}>
                {ModalContent(Staticroute, "staticroute")}
              </Modal>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={5}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={6}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={7}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={8}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="Noter" />
            <Divider />
            <CardContent></CardContent>
          </Card>
        </TabPanel>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Router</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          sx={{ mb: -2 }}
          heading="Router"
          //subHeading="Rouer konfiguration."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Box sx={{ mr: 6, float: "right" }}>
              <Button
                onClick={() => {
                  run();
                }}
                startIcon={<SyncIcon />}
                variant="outlined"
              >
                Synk
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabid}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3 }}
              >
                <Tab label={tablabel(0)} />
                {tabs.map((child) => child)}
                <Tab icon={<AddIcon />} value="tabProperties" />
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
}

export default Router;
