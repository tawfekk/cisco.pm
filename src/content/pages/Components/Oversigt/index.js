import { Helmet } from "react-helmet-async";

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
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "src/components/Footer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import * as React from "react";

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

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    //if (data[0][event.target.id][index] == undefined) {data[0][event.target.id] = {}}
    setformFields(data);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    if (data.length != 0 ){
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
    let data2 = JSON.parse(localStorage.router_final);
    data2.splice(index, 1);
    localStorage.router_final = JSON.stringify(data2)
  }else{
    localStorage.removeItem("router_data")
    localStorage.removeItem("router_final")
  }
    //syncupdate();
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
          docs="https://material-ui.com/components/DeltSession/" />
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
            <CardHeader title="Router" />
            <Divider />
            <CardContent sx={{ width: 500, justifyContent: 'center'}}>
              {formFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Box
                      autoComplete="off"
                      display="block"
                      justifyContent="flex-center"
                    >
                      <text
                      >
                      {formFields[index]["initial"][0]["hostname"]}
                      </text>
                      <Button
                        sx={{ float: 'right', ml: 2 }}
                        variant="contained"
                        onClick={() => {
                          handleOpen(index);
                        }}
                      >
                        Vis config
                      </Button>
                      <Button  style={{color: '#DD4B34'}} sx={{float: 'right', ml: 2 }} onClick={() => removeFields(index)}>
                        Slet
                      </Button>
                      <Divider sx={{ m: 3 }} />
                    </Box>
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
          </Grid>
          <Grid item xs="auto">
            <Card>
              <CardHeader title="Switch" />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 500 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                >
                  Switch
                </Typography>
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
