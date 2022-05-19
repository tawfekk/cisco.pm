import { Switch, Typography, TextField, Container, Grid, Card, CardHeader, CardContent, Divider, Chip, Box, Button } from "@mui/material";
import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Tooltip from '@mui/material/Tooltip';
import Modal from "@mui/material/Modal";
import { useState } from "react";
import * as React from "react";
import GroupsIcon from '@mui/icons-material/Groups';


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


function handleFormChange(event) {
  if (!sessionStorage.getItem('sessionid')){
  sessionStorage.sessionid = Math.floor(Math.random()*90000) + 10000}
  window.location.reload()
}

function handleFormChange3() {
sessionStorage.removeItem('sessionid'); window.location.reload()
}

function handleFormChange4() {
if (sessionStorage.t_sessionid != "") {
  localStorage.removeItem('router_data'); localStorage.removeItem('router_final')
  sessionStorage.sessionid = sessionStorage.t_sessionid; window.location.reload()
}
}


function HeaderButtons() {



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function issessionshared() {
    if (!sessionStorage.sessionid) {
      return  <Chip label="Offline session" variant="outlined" />;
    } else {
      return (
      <Box component="span">
      <Button
          onClick={() => handleFormChange3()}
          variant="outlined"
          size="small"
          color="error"
          sx={{ mr: 2}}
        >
          Stop session
      </Button>
      <Chip label={sessionStorage.sessionid} color="success" variant="contained" />
      </Box>
    )
    }
  }

  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: 0.5 }} component="span">
        {issessionshared()}
        <Button startIcon={<GroupsIcon />} onClick={() => {handleOpen()}} sx={{ ml: 3, mr: 3 }} variant="contained">
          Delt session
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
                    <Typography
                      variant="h4"
                      sx={{ mb: 1 }}
                    >
                      Indtast en sessionskode her for at deltage
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{color: "#DD4B34"}}
                      sx={{ ml: 1.2, mb: 2 }}
                    >
                      Dine eksisterende configs bliver overskrevet
                    </Typography>
                    <TextField
                      size="small"
                      style={{ width: "35%" }}
                      onChange={(event) => {sessionStorage.t_sessionid = event.target.value}}
                      inputProps={{ style: { color: "#FFC13D" } }}
                      sx={{ left: '10%' }}
                    ></TextField>
                    <Button
                      variant="contained"
                      sx={{ ml: 2, left: '10%'}}
                      size="medium"
                      color="primary"
                      onClick={() => handleFormChange4()}
                    >
                      Deltag i session
                    </Button>
                    <Divider sx={{ m: 4, bgcolor: '#FFC13D' }}> Eller </Divider>
                    <Button
                      onClick={(event) => handleFormChange(event)}
                      variant="contained"
                      sx={{ left: '30%' }}
                      size="medium"
                      color="success"
                    >
                      Del min session
                    </Button>

          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default HeaderButtons;
