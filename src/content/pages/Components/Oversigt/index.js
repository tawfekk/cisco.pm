import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { useState } from "react";
import * as React from "react";

import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box,
  Modal,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';
import {syncup} from "src/handlers/Sync"
import {Runner} from "src/handlers/ConfigGenerator/Router"

function Oversigt() {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = (index) => {
    sessionStorage.oversigt_index = index;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [formFields, setformFields] = useState(
    JSON.parse(localStorage.router_data)
  );

  const removeFields = (index, type) => {
    let data = [...formFields];
    data.splice(index, 1);
    if (data.length != 0) {
      setformFields(data);
      localStorage.router_data = JSON.stringify(data);
      let data2 = JSON.parse(localStorage.router_final);
      data2.splice(index, 1);
      localStorage.router_final = JSON.stringify(data2);
    } else {
      localStorage.removeItem("router_data");
      localStorage.removeItem("router_final");
      window.location.reload()
    }
    syncup(JSON.parse(localStorage.getItem(type+"_data")), type);
  };

  function returner() {
    Runner(sessionStorage.oversigt_index)
    let data = "";
    for (var prop in JSON.parse(localStorage.router_final)[
      sessionStorage.oversigt_index
    ]) {
      data += JSON.parse(localStorage.router_final)[
        sessionStorage.oversigt_index
      ][prop];
    }
    return data;
  }

  const [open2, setOpen2] = React.useState(false);
  const handleClick = () => {
    setOpen2(true);
  };
  const handleClose2 = () => setOpen2(false);
  const vertical = "top";
  const horizontal = "center";

  return (
    <>
    <Snackbar
      open={open2}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose2}
      autoHideDuration={2000}
    >
      <Alert
        variant="filled"
        onClose={handleClose2}
        severity="success"
        sx={{ width: "100%" }}
      >
        Config kopieret til udklipsholder
      </Alert>
    </Snackbar>
      <Helmet>
        <title>Oversigt</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle   sx={{ mb:-1}}
          heading="Oversigt"
          subHeading="Oversigt over oprettede router, switch & VLAN configs"
        />
        <Button
          size="small"
          sx={{ float: 'right', mt:-4 }}
          variant="outlined"
          color="error"
          startIcon=<DangerousRoundedIcon/>
          onClick={() => {
            localStorage.clear(); window.location.reload()
          }}
        >
          Slet al data
        </Button>
      </PageTitleWrapper>
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
              <CardHeader title="VLAN" />
              <Divider />
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: 333 }}>
                  <Typography variant="h4">VLAN</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs="auto">
            <Card>
              <CardHeader title="Router" />
              <Divider sx={{ mb: -2 }} />
              <CardContent sx={{ width: 333, justifyContent: "center" }}>
                {formFields.map((form, index) => {
                  return (
                    <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                            }}>
                      <Container
                      sx={{ mt: 3 }}>
                        <span><b>{formFields[index]["initial"][0]["hostname"]}</b></span>
                        <IconButton
                          size="small" sx={{ float: 'right', ml: 1, mt: -0.8 }} onClick={() => removeFields(index, "router")}
                        >
                          <DeleteForeverRoundedIcon color="error" />
                        </IconButton>
                        <Button
                          size="small"
                          sx={{ float: 'right',  mt: -0.8  }}
                          variant="contained"
                          onClick={() => {
                            handleOpen(index);
                          }}
                        >
                          Vis config
                        </Button>
                        <Divider sx={{ mt: 3, }} />
                      </Container>
                    </div>
                  );
                })}
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
                      value={"conf terminal" + returner() + "\nend"}
                    ></TextField>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText("conf terminal" + returner() + "\nend");
                      handleClose(); handleClick()}}
                      variant="contained"
                      sx={{ right: "25%", left: "25%", mt: 2 }}
                      size="small"
                      color="secondary"
                    >
                      Kopier til udklipsholder
                    </Button>
                  </Box>
                </Modal>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs="auto">
            <Card>
              <CardHeader title="Switch" />
              <Divider />
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: 333 }}>
                  <Typography variant="h4">Switch</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Oversigt;
