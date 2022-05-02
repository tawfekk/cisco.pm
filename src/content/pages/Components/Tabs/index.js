import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { TextareaAutosize, Paper, IconButton, FormControlLabel, Checkbox, Dialog, DialogTitle, Alert, Button, Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from 'src/components/Footer';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';


import TextField from '@mui/material/TextField';
function Forms() {

  const [currency, setCurrency] = useState('EUR');

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



function TabsDemo() {

  const porte = [
    "gi0/0",
    "gi0/1",
    "port-channel 1"
  ];




  const [value, setValue] = useState(0);

//  const handleChange = (event, newValue) => {
//    setValue(newValue);
//  };

  const [Hostname, setHostname] = useState(localStorage.router_initial_hostname);
  const [Motd, setMotd] = useState(localStorage.router_initial_motd);
//  const [Hostname, setHostname] = useState(localStorage.router_initial_hostname_input);
//  const [Hostname, setHostname] = useState(localStorage.router_initial_hostname_input);
//  const [Hostname, setHostname] = useState(localStorage.router_initial_hostname_input);
//  const [Hostname, setHostname] = useState(localStorage.router_initial_hostname_input);
//  const [Hostname, setHostname] = useState(localStorage.router_initial_hostname_input);

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const styles = {
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
  }
};


























const [formFields, setFormFields] = useState([{interfaces_porte: [], dhcp_porte: []}])
//const [formFields, setFormFields] = useState(localStorage.router_interfaces_array)

const handleFormChange = (event, index) => {
  let data = [...formFields]
  data[index][event.target.name] = event.target.value;
  setFormFields(data);
  localStorage.router_interfaces_array = JSON.stringify(data)
}

const submit = (e) => {
  e.preventDefault();
  console.log(formFields)
}

const addFields = () => {
  let object = {
    interfaces_porte: [],
    dhcp_porte: []
  }

  setFormFields([...formFields, object])
}

const removeFields = (index) => {
  let data = [...formFields];
  data.splice(index, 1)
  setFormFields(data)
  localStorage.router_interfaces_array = JSON.stringify(data)
}










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
  var workingvar = ""
  if (localStorage.getItem('router_interfaces_array')){
  for (const element of JSON.parse(localStorage.router_interfaces_array)){
  workingvar += "\nservice dhcp \nip dhcp pool \"" + element.dhcp_navn+"\""+"\nnetwork "+element.dhcp_ip +" "+element.dhcp_subnet+"\ndefault-router "+element.dhcp_gateway
  	if (element.dhcp_domæne != "") {workingvar +=  "\ndomain-name "+element.dhcp_domæne}
  	if (element.dhcp_DNS != "") {workingvar +=  "\ndns-server "+element.dhcp_DNS}
  	workingvar += "\nexit"
  	//for (const elem of Input29.text.replace("-", " ").split("+")){workingvar += "\nip dhcp excluded-address "+elem}
}}
    localStorage.router_DHCP_final = workingvar ; return workingvar
  }





const Interfaces = () => {
  var workingvar = ""
  if (localStorage.getItem('router_interfaces_array')){
  for (const element of JSON.parse(localStorage.router_interfaces_array)){
    workingvar += "\ninterface range "+element.interfaces_porte.toString()+"\nip address "+element.ip +" "+element.interfaces_subnet
  		if(element.interfaces_description != "" && element.interfaces_description != undefined) {workingvar += "\ndescription "+element.interfaces_description}
  		workingvar += "\nexit"
  }}
    localStorage.router_interfaces_final = workingvar ; return workingvar
}


const Start = () => {
		var today = new Date()
		var workingvar = ""
    if (true == true) {workingvar += "clock set " + today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+" "+today.getDate()+" "+today.toLocaleString('en-us', { month: 'short' })+" "+today.getFullYear()}
    workingvar +=  "\nconfigure terminal"
    workingvar += "\nset hostname " + localStorage.router_initial_hostname_input
    localStorage.router_initial_final = workingvar; return workingvar
  }


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
                <Box sx={{ width: '100%' }}>
                  <Tabs variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary" value={value} onChange={(event, newValue) => {setValue(newValue); if (localStorage.getItem('router_interfaces_array')){setFormFields(JSON.parse(localStorage.router_interfaces_array))} }} aria-label="basic tabs example">
                    <Tab label="Initial settings" {...a11yProps(0)} />
                    <Tab label="Interfaces" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Card>
                    <CardHeader title="Basale router indstillinger" />
                    <Divider />
                    <CardContent>
                  <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        required
                        label="Hostname"
                        value = {Hostname}
                        placeholder="R1"
                        onChange={(event) => {localStorage.router_initial_hostname= event.target.value; setHostname(event.target.value)}}
                      />
                      <TextField
                        id="router_initial_motd_input"
                        label="MOTD"
                        value = {Motd}
                        defaultValue={localStorage.router_initial_motd}
                        placeholder="Authorized access only!"
                        onChange={(event) => {localStorage.router_initial_motd = event.target.value; setMotd(event.target.value)}}
                      />
                      <TextField
                        id="router.initial.domæne.input"
                        label="Domæne"
                        //defaultValue="R1"
                        placeholder="domain.internal"
                      />
                      <TextField
                        id="router.initial.secret.input"
                        label="Enable secret"
                        //defaultValue="R1"
                        placeholder="domain.internal"
                      />
                      <TextField
                        id="router.initial.con0pass.input"
                        label="Con 0 password"
                        //defaultValue="R1"
                        placeholder="domain.internal"
                      />
                      <TextField
                        id="router.initial.vtypass.input"
                        label="Vty 0-15 password"
                        //defaultValue="R1"
                        placeholder="domain.internal"
                      />
                    </div>
                        <Divider sx={{m: 2}} />
                        <Button variant="outlined" color="error" sx={{ margin: 1 }} size="medium" onClick={() =>{
                        localStorage.router_initial_motd_input = "" ; setMotd("")
                        localStorage.router_initial_hostname_input = "" ; setHostname("")
                      //  alert(Hostname)
                      }}
                        >
                          Ryd felter
                        </Button>
                    <Button onClick={handleOpen} variant="outlined" sx={{ margin: 1 }} size="medium" color="primary">
                      Vis config
                    </Button>

                      <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                          <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h4" component="h2">Konfig genereret</Typography>
                              <TextField
                                    multiline
                                    sx={{  mt: 2 }}
                                    inputProps={{ style: { color: "#FFC13D" } }}
                                    maxRows={Infinity}
                                    rows={5}
                                    style={{width: '100%'}}
                                    id="modal-modal-description"
                                    value= {Start()}>
                              </TextField>
                          <Button onClick={() => {navigator.clipboard.writeText(localStorage.router_initial_final)}} variant="contained" sx={{right: '20%',left: '20%', margin: 2 }} size="small" color="secondary">
                            Kopier til udklipsholder
                          </Button>
                          </Box>
                      </Modal>
                  </Box>
                  </CardContent>
                  </Card>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                                        <Card sx={{ width: '100%' }}>
                                        <CardHeader title="Interfaces" />
                                        <Divider />
                                        <CardContent>
                                                        {formFields.map((form, index) => {
                                                          return (
                                                            <div key={index}>
                                                              <Box// sx={{ width: '100%' }}
                                                              sx={{
                                                              '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                              }}
                                                              autoComplete="off">
                                                              <TextField
                                                                name='interfaces_ip'
                                                                label="IP"
                                                                placeholder="192.168.1.1"
                                                                onChange={event => handleFormChange(event, index)}
                                                                value={form.interfaces_ip}
                                                              />
                                                              <TextField
                                                                name='interfaces_subnet'
                                                                label="Subnet"
                                                                placeholder='255.255.255.0'
                                                                onChange={event => handleFormChange(event, index)}
                                                                value={form.interfaces_subnet}
                                                              />
                                                              <TextField
                                                                name='interfaces_description'
                                                                label="Description"
                                                                placeholder='portbeskrivelse'
                                                                onChange={event => handleFormChange(event, index)}
                                                                value={form.interfaces_description}
                                                              />
                                                              <FormControl sx={{ m: 1, width: 220 }}>
                                                                                                <InputLabel id="demo-multiple-chip-label">
                                                                                                  Porte
                                                                                                </InputLabel>
                                                                                                <Select
                                                                                                  name='interfaces_porte'
                                                                                                  labelId="demo-multiple-chip-label"
                                                                                                  id="demo-multiple-chip"
                                                                                                  multiple
                                                                                                  value={form.interfaces_porte}
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
                                                                                                        display: 'flex',
                                                                                                        flexWrap: 'wrap',
                                                                                                        gap: 0.5
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
                                                                                              <FormControlLabel control={<Checkbox sx={{ margin: 1.7, left: '10%'}}
                                                                                                  color="warning"
                                                                                                  name='shutdown'
                                                                                                  checked={form.shutdown}
                                                                                                  onChange={(event) =>
                                                                                                    handleFormChange(event, index)
                                                                                                  }
                                                                                                />} label="Shutdown" />
                                                                                                  <IconButton>
                                                                                                  <DeleteIcon color="secondary" onClick={() => removeFields(index)} />
                                                                                                  </IconButton>
                                                              <Divider sx={{m: 2}} />
                                                              </Box>
                                                            </div>
                                                          )
                                                        })}
                                                      <Button variant="contained" sx={{ margin: 1 }} size="medium" color="primary" onClick={addFields}>Tilføj interface</Button>
                                                      <Button variant="outlined" onClick={handleOpen}>Vis config</Button>
                                                      <Modal
                                                          open={open}
                                                          onClose={handleClose}
                                                          aria-labelledby="modal-modal-title"
                                                          aria-describedby="modal-modal-description"
                                                          >
                                                          <Box sx={style}>
                                                          <Typography id="modal-modal-title" variant="h4" component="h2">Konfig genereret</Typography>
                                                              <TextField
                                                                    multiline
                                                                    sx={{  mt: 2 }}
                                                                    inputProps={{ style: { color: "#FFC13D" } }}
                                                                    maxRows={Infinity}
                                                                    rows={5}
                                                                    style={{width: '100%'}}
                                                                    id="modal-modal-description"
                                                                    value= {"conf terminal"+Interfaces()+"\nend"}>
                                                              </TextField>
                                                          <Button onClick={() => {navigator.clipboard.writeText(localStorage.router_interfaces_final)}} variant="contained" sx={{right: '20%',left: '20%', margin: 2 }} size="small" color="secondary">
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
                  <Card sx={{ width: '100%' }}>
                  <CardHeader title="DHCP" />
                  <Divider />
                  <CardContent>
                                  {formFields.map((form, index) => {
                                    return (
                                      <div key={index}>
                                        <Box// sx={{ width: '100%' }}
                                        sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        autoComplete="off">
                                        <TextField
                                          name='dhcp_navn'
                                          label="Pool navn"
                                          placeholder='pool1'
                                          onChange={event => handleFormChange(event, index)}
                                          value={form.dhcp_navn}
                                        />
                                        <TextField
                                          name='dhcp_ip'
                                          label="Netværk"
                                          placeholder="192.168.1.0"
                                          onChange={event => handleFormChange(event, index)}
                                          value={form.dhcp_ip}
                                        />
                                        <TextField
                                          name='dhcp_subnet'
                                          label="Subnet"
                                          placeholder='255.255.255.0'
                                          onChange={event => handleFormChange(event, index)}
                                          value={form.dhcp_subnet}
                                        />
                                        <TextField
                                          name='dhcp_gateway'
                                          label="Gateway"
                                          placeholder='192.168.1.1'
                                          onChange={event => handleFormChange(event, index)}
                                          value={form.dhcp_gateway}
                                        />
                                        <TextField
                                          name='dhcp_domæne'
                                          label="Domæne"
                                          placeholder='domain.internal'
                                          onChange={event => handleFormChange(event, index)}
                                          value={form.dhcp_domæne}
                                        />
                                        <TextField
                                          name='dhcp_DNS'
                                          label="DNS"
                                          placeholder='1.1.1.1'
                                          onChange={event => handleFormChange(event, index)}
                                          value={form.dhcp_DNS}
                                        />
                                        <IconButton>
                                        <DeleteIcon color="secondary"  sx={{ m: 1.7}} onClick={() => removeFields(index)} />
                                        </IconButton>
                                        <Divider sx={{m: 2}} />
                                        </Box>
                                      </div>
                                    )
                                  })}
                                <Button variant="outlined" sx={{ margin: 1 }} size="medium" color="primary" onClick={addFields}>Tilføj pool</Button>
                                <Button variant="contained" onClick={handleOpen}>Vis config</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    >
                                    <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h4" component="h2">Konfig genereret</Typography>
                                        <TextField
                                              multiline
                                              sx={{  mt: 2 }}
                                              inputProps={{ style: { color: "#FFC13D" } }}
                                              maxRows={Infinity}
                                              rows={5}
                                              style={{width: '100%'}}
                                              id="modal-modal-description"
                                              value= {"conf terminal"+DHCP()+"\nend"}>
                                        </TextField>
                                    <Button onClick={() => {navigator.clipboard.writeText(localStorage.router_DHCP_final)}} variant="contained" sx={{right: '20%',left: '20%', margin: 2 }} size="small" color="secondary">
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
