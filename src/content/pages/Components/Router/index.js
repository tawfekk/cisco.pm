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
import { syncup, syncdown } from "src/handlers/Sync";
import {
  Initial,
  DHCP,
  OSPF,
  Interfaces,
  Staticroute,
} from "src/handlers/ConfigGenerator/Router";
import { StatusComingSoon } from "src/content/pages/Status/ComingSoon";
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

  const [tabs, setAddTab] = useState([]);
  const [tabid, settabid] = useState(0);
  const handleTabChange = (event, newtabid) => {
    if (newtabid === "tabProperties") {
      let workingtabindex = maxTabIndex + 2;
      let data = [...formFields];
      let object = {
        interfaces: [{ porte: [], subinterfaces: [] }],
        linterfaces: [],
        dhcp: [{ ip: "" }],
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
            lldp: true,
            motd: "Må din dag være fyldt med Cisco",
            domæne: "network.internal",
            secret: "class",
            con0pass: "cisco",
            vtypass: "cisco",
          },
        ],
        staticroute: [{}],
        ospf: [
          {
            processid: Math.floor(Math.random() * (65535 - 1 + 1)) + 1,
            enabled: [],
            passive: [],
            area: 0,
          },
        ],
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
    await sleep(350);
    onreloadtab();
    setValue(value);
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
      enabled: [],
      passive: [],
      subinterfaces: [],
      processid: Math.floor(Math.random() * (65535 - 1 + 1)) + 1,
      area: 0,
    };
    data[sessionStorage.router_tabid][id].push(object);
    //workingarray = formFields[tabid]
    setformFields(data);
  };

  const addNestedFields = (nest, index, id) => {
    let data = [...formFields];
    let object = {
      porte: [],
      dhcp: [],
      hostname: "",
      enabled: [],
      passive: [],
    };
    data[sessionStorage.router_tabid][nest][index][id].push(object);
    //workingarray = formFields[tabid]
    setformFields(data);
  };

  const removeNestedFields = (nest, nestindex, id, index) => {
    let data = [...formFields];
    data[sessionStorage.router_tabid][nest][nestindex][id].splice(index, 1);
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    syncup(formFields, "router");
  };

  const removeFields = (id, index) => {
    let data = [...formFields];
    data[sessionStorage.router_tabid][id].splice(index, 1);
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    syncup(formFields, "router");
  };

  if (maxTabIndex == 0) {
    syncdown("router");
    onreloadtab();
  }

  function porte() {
    try {
      return RouterInterfaces(formFields[tabid]["initial"][0]["model"]).map(
        (name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        )
      );
    } catch (e) {}
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
          <Tab label="Generel     " />
          <Tab label="Interfaces" />
          <Tab label="DHCP" />
          <Tab label="Static route" />
          <Tab label="FHRP" />
          <Tab label="OSPF" />
          <Tab label="ACL" />
          <Tab label="Samlet config" />
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
                        <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                          <InputLabel>Model</InputLabel>
                          <Select
                            name="initial.model"
                            value={form.model}
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
                          <FormControlLabel
                            sx={{ m: 1.5 }}
                            control={
                              <Switch
                                name="clock"
                                label="Set clock"
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
                      <TextField
                        name="ip"
                        error={form.subnet && !form.ip}
                        label="IP"
                        id="interfaces"
                        placeholder="192.168.1.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip}
                      />
                      <TextField
                        name="subnet"
                        id="interfaces"
                        error={form.ip && !form.subnet}
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
                          required
                          error={!form.porte.length}
                          name="interfaces.porte"
                          multiple
                          value={form.porte}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
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
                      {formFields[tabid]["interfaces"][index][
                        "subinterfaces"
                      ].map((form2, index2) => {
                        return (
                          <Card
                            sx={{
                              border: 2,
                              borderColor: "#9EA4C1",
                              borderRadius: "12px",
                              ml: "12.5%",
                              width: "75%",
                              mb: 2,
                              mt: 2,
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
                                  name="subnet"
                                  id="interfaces"
                                  size="small"
                                  error={form.ip && !form.subnet}
                                  label="Subinterface ID"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleFormChange(event, index2)
                                  }
                                  value={form.subnet}
                                />
                                <TextField
                                  name="subnet"
                                  id="interfaces"
                                  size="small"
                                  error={form.ip && !form.subnet}
                                  label="IP"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleFormChange(event, index2)
                                  }
                                  value={form.subnet}
                                />
                                <TextField
                                  name="subnet"
                                  id="interfaces"
                                  size="small"
                                  error={form.ip && !form.subnet}
                                  label="Subnet"
                                  placeholder="255.255.255.0"
                                  onChange={(event) =>
                                    handleFormChange(event, index2)
                                  }
                                  value={form.subnet}
                                />
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
                        Tilføj sub-interface
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
                        error={!form.id || form.id != 0}
                        label="Loopback ID"
                        placeholder="1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.id}
                      />
                      <TextField
                        name="ip"
                        id="linterfaces"
                        error={!form.ip}
                        label="IP"
                        helperText="må ikke være i 127.x.x.x"
                        placeholder="192.168.99.1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip}
                      />
                      <TextField
                        name="subnet"
                        id="linterfaces"
                        error={!form.subnet}
                        label="Subnet"
                        placeholder="255.255.255.255"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet}
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
            Tilføj interface
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 0.2 }}
            size="medium"
            color="primary"
            onClick={() => addFields("linterfaces")}
          >
            Tilføj Loopback
          </Button>
          <Button
            sx={{ margin: 1 }}
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
                        name="navn"
                        id="dhcp"
                        error={!form.navn}
                        label="Pool navn"
                        placeholder="pool1"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.navn}
                      />
                      <TextField
                        name="ip"
                        id="dhcp"
                        error={!form.ip}
                        label="Netværk"
                        placeholder="192.168.1.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.ip}
                      />
                      <TextField
                        name="subnet"
                        id="dhcp"
                        error={!form.subnet}
                        label="Subnet"
                        placeholder="255.255.255.0"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.subnet}
                      />
                      <TextField
                        name="gateway"
                        label="Gateway"
                        error={!form.gateway}
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
        </TabPanel>
        <TabPanel value={value} index={3}>
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
                        value={form.destinationip}
                      />
                      <TextField
                        name="destinationsubnet"
                        id="staticroute"
                        error={!form.destinationsubnet}
                        label="Destination subnet"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.destinationsubnet}
                      />
                      <TextField
                        name="nexthopip"
                        id="staticroute"
                        label="Next-hop IP"
                        onChange={(event) => {
                          handleFormChange(event, index);
                          form.nexthopinterface = [];
                        }}
                        value={form.nexthopip}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Next-hop Interface</InputLabel>
                        <Select
                          name="staticroute.nexthopinterface"
                          value={form.nexthopinterface}
                          onChange={(event) => {
                            handleFormChange(event, index);
                            form.nexthopip = "";
                          }}
                          input={<OutlinedInput label="Next-hop Interface" />}
                        >
                          {RouterInterfaces(
                            formFields[tabid]["initial"][0]["model"]
                          ).map((name) => (
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
        </TabPanel>
        <TabPanel value={value} index={4}>
          {StatusComingSoon()}
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
                      <TextField
                        name="processid"
                        id="ospf"
                        required
                        error={!form.processid}
                        label="Process ID"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.processid}
                      />
                      <TextField
                        name="override"
                        id="ospf"
                        placeholder="1.1.1.1"
                        label="Router ID override"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.override}
                      />
                      <TextField
                        required
                        error={!form.area || form.area != 0}
                        name="area"
                        id="ospf"
                        label="Area"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.area}
                      />
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Enabled interfaces</InputLabel>
                        <Select
                          name="ospf.enabled"
                          multiple
                          value={form.enabled}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Enabled interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ mr: 1, ml: 1.2, mt: 1, width: 220 }}>
                        <InputLabel>Passive interfaces</InputLabel>
                        <Select
                          name="ospf.passive"
                          multiple
                          value={form.passive}
                          onChange={(event) => handleFormChange(event, index)}
                          input={<OutlinedInput label="Passive interfaces" />}
                          MenuProps={MenuProps}
                        >
                          {porte()}
                        </Select>
                      </FormControl>
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            color="warning"
                            name="defaultroute"
                            id="ospf"
                            checked={form.defaultroute}
                            onChange={(event) => {
                              handleFormChange(event, index);
                            }}
                          />
                        }
                        label="Advertise default route"
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
            onClick={() => addFields("ospf")}
          >
            Tilføj OSPF process
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
            {ModalContent(OSPF, "ospf")}
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={6}>
          {StatusComingSoon()}
        </TabPanel>
        <TabPanel value={value} index={7}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="Noter" />
            <Divider />
            <CardContent></CardContent>
          </Card>
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
  } catch (e) {
    console.log(e);
    //if (localStorage.router_data){
    //localStorage.setItem("router_data", 0);
    //window.location.reload()}
  }
}

export default Router;
