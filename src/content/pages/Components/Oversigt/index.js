import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { useState } from "react";
import * as React from "react";

import { Topcustomconfig, RSA } from "src/handlers/ConfigGenerator/Router";

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
  Tooltip,
  Modal,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import { syncup } from "src/handlers/Sync";
import { Runner } from "src/handlers/ConfigGenerator/Router";
import { Runner2 } from "src/handlers/ConfigGenerator/Switch";
import { StatusError } from "src/content/pages/Status/Error";

function returner(type) {
  if (type == "router") {
    Runner(sessionStorage.oversigt_index);
  } else if (type == "switch") {
    Runner2(sessionStorage.oversigt_index);
  }
  let data = ""
  if(type === "router"){data += Topcustomconfig(sessionStorage.oversigt_index)}
  for (var elem in JSON.parse(localStorage.getItem(type + "_final"))[
    sessionStorage.oversigt_index
  ]) {
    if (elem != "topcustomconfig") {
    data += JSON.parse(localStorage.getItem(type + "_final"))[
      sessionStorage.oversigt_index
    ][elem];
    }
  }
  if(type === "router"){data += RSA(sessionStorage.oversigt_index)}
  return data;
}

function navn(data, type, index) {
  if (type != "vlan") {
    return data[index]["initial"][0]["hostname"];
  } else {
    return data[index]["navn"];
  }
}

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
    borderRadius: "20px",
  };

  const [open0, setOpen0] = React.useState(false);
  const handleOpen0 = (index) => {
    sessionStorage.oversigt_index = index;
    setOpen0(true);
  };
  const handleClose0 = () => setOpen0(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (index) => {
    sessionStorage.oversigt_index = index;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [formFields, setformFields] = useState(
    JSON.parse(localStorage.router_data)
  );

  const [formFields2, setformFields2] = useState(
    JSON.parse(localStorage.switch_data)
  );

  const [formFields3, setformFields3] = useState(
    JSON.parse(localStorage.vlan_data)
  );

  const removeFields = (index, type) => {
    if (type == "router") {
      var data = [...formFields];
    } else if (type == "switch") {
      var data = [...formFields2];
    } else {
      var data = [...formFields3];
    }
    data.splice(index, 1);
    if (data.length != 0) {
      if (type == "router") {
        setformFields(data);
      } else if (type == "switch") {
        setformFields2(data);
      } else {
        setformFields3(data);
      }
      localStorage.setItem(type + "_data", JSON.stringify(data));
      let data2 = JSON.parse(localStorage.getItem(type + "_final"));
      data2.splice(index, 1);
      localStorage.setItem(type + "_final", JSON.stringify(data2));
    } else {
      localStorage.removeItem(type + "_final");
      localStorage.removeItem(type + "_data");
      window.location.reload();
    }
    syncup(JSON.parse(localStorage.getItem(type + "_data")), type);
  };

  function Content(type) {
    if (type == "router") {
      var data = [...formFields];
    } else if (type == "switch") {
      var data = [...formFields2];
    } else {
      var data = [...formFields3];
    }

    return (
      <>
        <Divider sx={{ mb: -2 }} />
        <CardContent sx={{ width: 333, justifyContent: "center" }}>
          {data.map((form, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                <Container sx={{ mt: 3 }}>
                  <span>
                    <b>{navn(data, type, index)}</b>
                  </span>
                  <Tooltip arrow title="This action is permanent">
                    <IconButton
                      size="small"
                      sx={{ float: "right", ml: 1, mt: -0.8 }}
                      onClick={() => removeFields(index, type)}
                    >
                      <DeleteForeverRoundedIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  {configshow(type, index)}
                  <Divider sx={{ mt: 3 }} />
                </Container>
              </div>
            );
          })}
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
              Copied to clipboard
            </Alert>
          </Snackbar>
        </CardContent>
      </>
    );
  }

  function ModalContent(type) {
    return (
      <Box sx={style}>
        <Typography variant="h4" component="h2">
          Config generated
        </Typography>
        <TextField
          multiline
          sx={{ mt: 2 }}
          InputProps={{ style: { color: "#FFC13D" } }}
          maxRows={20}
          minRows={5}
          style={{ width: "100%" }}
          value={"conf terminal" + returner(type) + "\nend"}
        ></TextField>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              "conf terminal" + returner(type) + "\nend"
            );
            handleClose();
            handleClose0();
            handleClick();
          }}
          variant="contained"
          sx={{ right: "25%", left: "25%", mt: 2 }}
          size="small"
          color="secondary"
        >
          Copy to clipboard
        </Button>
      </Box>
    );
  }

  function configshow(type, index) {
    if (type == "router") {
      return (
        <Button
          size="small"
          sx={{ float: "right", mt: -0.8 }}
          variant="contained"
          onClick={() => {
            handleOpen0(index);
          }}
        >
          Show config
        </Button>
      );
    } else if (type == "switch") {
      return (
        <Button
          size="small"
          sx={{ float: "right", mt: -0.8 }}
          variant="contained"
          onClick={() => {
            handleOpen(index);
          }}
        >
          Show config
        </Button>
      );
    }
  }

  const [open2, setOpen2] = React.useState(false);
  const handleClick = () => {
    setOpen2(true);
  };
  const handleClose2 = () => setOpen2(false);
  const vertical = "top";
  const horizontal = "center";
  try {
    return (
      <>
        <Helmet>
          <title>Overview</title>
        </Helmet>
        <PageTitleWrapper>
          <PageTitle
            sx={{ mb: window.innerWidth > 600 ? -1 : 6, mt: -1}}
            heading="Overview"
            subHeading={window.innerWidth > 600 ? "Overview of created routers, switches & VLAN configs" : ""}
          />
          <Button
            sx={{ float: "right", mt: -4, display: localStorage.sessionid || sessionStorage.sessionid ? "": "none"}}
            onClick={() => window.location.reload()}
            startIcon={<SyncIcon />}
            variant="outlined"
            size="small"
          >
            Sync
          </Button>
          <Tooltip arrow title="This action is permanent">
            <Button
              size="small"
              sx={{ float: "right", mr: 13, mt: -4, mr: localStorage.sessionid || sessionStorage.sessionid ? 13 : ""}}
              variant="outlined"
              color="error"
              startIcon=<DangerousRoundedIcon />
              onClick={() => {
                syncup(0, "router");
                syncup(0, "switch");
                syncup(0, "vlan");
                localStorage.clear();
                setTimeout(() => {
                  window.location.reload();
                }, 600);
              }}
            >
              Delete all data
            </Button>
          </Tooltip>
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
                {Content("vlan")}
              </Card>
            </Grid>
            <Grid item xs="auto">
              <Card>
                <CardHeader title="Router" />
                {Content("router")}
                <Modal open={open0} onClose={handleClose0}>
                  {ModalContent("router")}
                </Modal>
              </Card>
            </Grid>
            <Grid item xs="auto">
              <Card>
                <CardHeader title="Switch" />
                {Content("switch")}
                <Modal open={open} onClose={handleClose}>
                  {ModalContent("switch")}
                </Modal>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  } catch (e) {
    console.log(e)
    return StatusError("");
  }
}

export default Oversigt;
