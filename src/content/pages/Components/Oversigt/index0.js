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
    setformFields(data);
    localStorage.router_data = JSON.stringify(data);
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
        <title>Test - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Test"
          subHeading="testtest"
          docs="https://material-ui.com/components/accordion/"
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
            <Card>
              <CardHeader title="Cisco" />
              <Divider />
              <CardContent>
                {formFields.map((form, index) => {
                  return (
                    <div key={index}>
                      <Box // sx={{ width: '100%' }}
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        autoComplete="off"
                      >
                        <Typography sx={{ mt: 2 }}>
                          {formFields[index]["initial"][0]["hostname"]}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleOpen(index);
                          }}
                        >
                          Vis config
                        </Button>
                        <Button onClick={() => removeFields(index)}>
                          Slet
                        </Button>
                        <Divider sx={{ m: 2 }} />
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
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Oversigt;
