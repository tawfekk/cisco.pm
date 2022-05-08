import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  TextareaAutosize,
  Paper,
  IconButton,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  Alert,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Footer from "src/components/Footer";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as React from "react";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

import TextField from "@mui/material/TextField";
function Forms() {
  const [currency, setCurrency] = useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabsDemo() {
  const porte = ["gi0/0", "gi0/1", "port-channel 1"];

  const [value, setValue] = useState(0);

  function sleep(ms) {
    setValue(99);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run(value) {
    // Pause execution of this async function for 2 seconds
    await sleep(250);
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
  const styles = {
    input: {
      "&:invalid": {
        border: "red solid 2px",
      },
    },
  };

  //const Initial_hostname = () => {try{return JSON.parse(localStorage.router_data)[0]['initial'].hostname}catch(error){}}

  const [formFields, setFormFields] = useState({
    interfaces: [{ porte: [] }],
    dhcp: [{ ip: "" }],
    initial: [{ hostname: "" }],
  });

  const handleFormChange = (event, index) => {
    let data = { ...formFields };
    //if (data[0][event.target.id][index] == undefined) {data[0][event.target.id] = {}}
    data[event.target.id][index][event.target.name] = event.target.value;
    setFormFields(data);
    localStorage.router_data = JSON.stringify(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const addFields = (id) => {
    let data = { ...formFields };
    let object = {
      porte: [],
      dhcp: [],
    };
    data[id].push(object);
    //workingarray = formFields
    setFormFields(data);
    //localStorage.router_data = JSON.stringify(data)
  };

  const removeFields = (id, index) => {
    let data = { ...formFields };
    data[id].splice(index, 1);
    setFormFields(data);
    localStorage.router_data = JSON.stringify(data);
  };

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

  const DHCP = () => {
    try {
      var workingvar = "";
      if (localStorage.getItem("router_data")) {
        for (const element of JSON.parse(localStorage.router_data)["dhcp"]) {
          workingvar +=
            '\nservice dhcp \nip dhcp pool "' +
            element.navn +
            '"' +
            "\nnetwork " +
            element.ip +
            " " +
            element.subnet +
            "\ndefault-router " +
            element.gateway;
          if (element.domæne != undefined) {
            workingvar += "\ndomain-name " + element.domæne;
          }
          if (element.DNS != undefined) {
            workingvar += "\ndns-server " + element.DNS;
          }
          workingvar += "\nexit";
          //for (const elem of Input29.text.replace("-", " ").split("+")){workingvar += "\nip dhcp excluded-address "+elem}
        }
      }
      localStorage.router_final = JSON.stringify({ dhcp: workingvar });
      return workingvar;
    } catch (error) {}
  };

  const Interfaces = () => {
    try {
      var workingvar = "";
      if (localStorage.getItem("router_data")) {
        for (const element of JSON.parse(localStorage.router_data)[
          "interfaces"
        ]) {
          workingvar +=
            "\ninterface range " +
            element.porte.toString() +
            "\nip address " +
            element.ip +
            " " +
            element.subnet;
          if (element.description != "" && element.description != undefined) {
            workingvar += "\ndescription " + element.description;
          }
          workingvar += "\nexit";
        }
      }
      localStorage.router_final = JSON.stringify({ interfaces: workingvar });
      return workingvar;
    } catch (error) {}
  };

  window.onload = function () {
    if (localStorage.getItem("router_data")) {
      setFormFields(JSON.parse(localStorage.router_data));
    }
  };

  const Start = () => {
    try {
      if (localStorage.getItem("router_data")) {
        var today = new Date();
        var workingvar = "";
        var workingarr = JSON.parse(localStorage.router_data)["initial"][0];
        if (true == true) {
          workingvar +=
            "clock set " +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds() +
            " " +
            today.getDate() +
            " " +
            today.toLocaleString("en-us", { month: "short" }) +
            " " +
            today.getFullYear();
        }
        workingvar += "\nconfigure terminal";
        workingvar += "\nset hostname " + workingarr.hostname;
        if (workingarr.motd != "") {
          workingvar += "\nbanner motd #" + workingarr.motd + "#";
        }
        localStorage.router_final = JSON.stringify({ initial: workingvar });
        return workingvar;
      }
    } catch (error) {}
  };

  return (
    <>
      <Helmet>
        <title>Router</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
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
            <Box sx={{ width: "100%" }}>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <Tab label="Initial settings" {...a11yProps(0)} />
                <Tab label="Interfaces" {...a11yProps(1)} />
                <Tab label="Subinterfaces" {...a11yProps(2)} />
                <Tab label="DHCP" {...a11yProps(3)} />
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
                      {formFields["initial"].map((form, index) => {
                        return (
                          <div key={0}>
                            <TextField
                              required
                              id="initial"
                              name="hostname"
                              label="Hostname"
                              value={form.hostname}
                              placeholder="R1"
                              onChange={(event) => handleFormChange(event, 0)}
                              InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                              required
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
                          </div>
                        );
                      })}
                      <Divider sx={{ m: 2 }} />
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ margin: 1 }}
                        size="medium"
                        onClick={() => {
                          removeFields("initial", 0);
                          addFields("initial");
                          run(0);
                        }}
                      >
                        Ryd felter
                      </Button>
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        sx={{ margin: 1 }}
                        size="medium"
                        color="primary"
                      >
                        Vis config
                      </Button>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h4"
                            component="h2"
                          >
                            Konfig genereret
                          </Typography>
                          <TextField
                            multiline
                            sx={{ mt: 2 }}
                            inputProps={{ style: { color: "#FFC13D" } }}
                            maxRows={Infinity}
                            rows={5}
                            style={{ width: "100%" }}
                            id="modal-modal-description"
                            value={Start()}
                          ></TextField>
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                localStorage.router_initial_final
                              );
                            }}
                            variant="contained"
                            sx={{ right: "20%", left: "20%", margin: 2 }}
                            size="small"
                            color="secondary"
                          >
                            Kopier til udklipsholder
                          </Button>
                        </Box>
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
                    {formFields["interfaces"].map((form, index) => {
                      return (
                        <div key={index}>
                          <Box // sx={{ width: '100%' }}
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            autoComplete="off"
                          >
                            <TextField
                              name="ip"
                              label="IP"
                              id="interfaces"
                              placeholder="192.168.1.1"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.ip}
                            />
                            <TextField
                              name="subnet"
                              id="interfaces"
                              label="Subnet"
                              placeholder="255.255.255.0"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.subnet}
                            />
                            <TextField
                              name="description"
                              id="interfaces"
                              label="Description"
                              placeholder="portbeskrivelse"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.description}
                            />
                            <FormControl sx={{ m: 1, width: 220 }}>
                              <InputLabel id="interfaces">Porte</InputLabel>
                              <Select
                                name="porte"
                                id="interfaces"
                                multiple
                                value={form.porte}
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
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
                              control={
                                <Checkbox
                                  sx={{ margin: 1.7, left: "10%" }}
                                  color="warning"
                                  name="shutdown"
                                  id="interfaces"
                                  checked={form.shutdown}
                                  onChange={(event) =>
                                    handleFormChange(event, index)
                                  }
                                />
                              }
                              label="Shutdown"
                            />
                            <IconButton
                              onClick={() => removeFields("interfaces", index)}
                            >
                              <DeleteIcon color="secondary" />
                            </IconButton>
                            <Divider sx={{ m: 2 }} />
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
                    <Button variant="outlined" onClick={handleOpen}>
                      Vis config
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                        >
                          Konfig genereret
                        </Typography>
                        <TextField
                          multiline
                          sx={{ mt: 2 }}
                          inputProps={{ style: { color: "#FFC13D" } }}
                          maxRows={Infinity}
                          rows={5}
                          style={{ width: "100%" }}
                          id="modal-modal-description"
                          value={"conf terminal" + Interfaces() + "\nend"}
                        ></TextField>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              localStorage.router_interfaces_final
                            );
                          }}
                          variant="contained"
                          sx={{ right: "20%", left: "20%", margin: 2 }}
                          size="small"
                          color="secondary"
                        >
                          Kopier til udklipsholder
                        </Button>
                      </Box>
                    </Modal>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Card sx={{ width: "100%" }}>
                  <CardHeader title="DHCP" />
                  <Divider />
                  <CardContent>
                    {formFields["dhcp"].map((form, index) => {
                      return (
                        <div key={index}>
                          <Box // sx={{ width: '100%' }}
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            autoComplete="off"
                          >
                            <TextField
                              name="navn"
                              id="dhcp"
                              label="Pool navn"
                              placeholder="pool1"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.navn}
                            />
                            <TextField
                              name="ip"
                              id="dhcp"
                              label="Netværk"
                              placeholder="192.168.1.0"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.ip}
                            />
                            <TextField
                              name="subnet"
                              id="dhcp"
                              label="Subnet"
                              placeholder="255.255.255.0"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.subnet}
                            />
                            <TextField
                              name="gateway"
                              label="Gateway"
                              id="dhcp"
                              placeholder="192.168.1.1"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.gateway}
                            />
                            <TextField
                              name="domæne"
                              label="Domæne"
                              id="dhcp"
                              placeholder="domain.internal"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.domæne}
                            />
                            <TextField
                              name="DNS"
                              id="dhcp"
                              label="DNS"
                              placeholder="1.1.1.1"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.DNS}
                            />
                            <IconButton
                              onClick={() => removeFields("dhcp", index)}
                            >
                              <DeleteIcon color="secondary" />
                            </IconButton>
                            <Divider sx={{ m: 2 }} />
                          </Box>
                        </div>
                      );
                    })}
                    <Button
                      variant="outlined"
                      sx={{ margin: 1 }}
                      size="medium"
                      color="primary"
                      onClick={() => addFields("dhcp")}
                    >
                      Tilføj pool
                    </Button>
                    <Button variant="contained" onClick={handleOpen}>
                      Vis config
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                        >
                          Konfig genereret
                        </Typography>
                        <TextField
                          multiline
                          sx={{ mt: 2 }}
                          inputProps={{ style: { color: "#FFC13D" } }}
                          maxRows={Infinity}
                          rows={5}
                          style={{ width: "100%" }}
                          id="modal-modal-description"
                          value={"conf terminal" + DHCP() + "\nend"}
                        ></TextField>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              localStorage.router_DHCP_final
                            );
                          }}
                          variant="contained"
                          sx={{ right: "20%", left: "20%", margin: 2 }}
                          size="small"
                          color="secondary"
                        >
                          Kopier til udklipsholder
                        </Button>
                      </Box>
                    </Modal>
                  </CardContent>
                </Card>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default TabsDemo;
