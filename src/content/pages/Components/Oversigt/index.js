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
} from "@mui/material";



import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD3npySkxT-_E2ZESGzzftE6JZagBf-UHQ",
  authDomain: "cisco-pm.firebaseapp.com",
  projectId: "cisco-pm",
  storageBucket: "cisco-pm.appspot.com",
  messagingSenderId: "727036040743",
  appId: "1:727036040743:web:a7c5f4382c0f5ab1ada002",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncupdate() {
  if (sessionStorage.sessionid) {
    try {
      await setDoc(doc(db, sessionStorage.sessionid, "router"), {
        data: JSON.parse(localStorage.router_data),
      });
    } catch (e) {
      console.log(e);
    }
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

  const removeFields = (index) => {
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
    syncupdate();
  };

  function returner() {
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
  return (
    <>
      <Helmet>
        <title>Oversigt</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Oversigt"
          subHeading="Oversigt over oprettede router & switch configs"
        />
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
              <Divider sx={{ mb: 1 }} />
              <CardContent sx={{ width: 333, justifyContent: "center" }}>
                {formFields.map((form, index) => {
                  return (
                    <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                            }}>
                      <Container>
                        <span><b>{formFields[index]["initial"][0]["hostname"]}</b></span>
                        <Button
                          size="small"
                          style={{color: "#DD4B34" }}
                          sx={{float: 'right', ml: 1, mt: -0.8 }}
                          onClick={() => removeFields(index)}
                        >
                          Slet
                        </Button>
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
                        <Divider sx={{ mt: 3, mb: 3 }} />
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
                        navigator.clipboard.writeText(returner());
                      }}
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
