import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Switch, Typography, TextField, Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Footer from 'src/components/Footer';



function handleFormChange(event) {
  if (!sessionStorage.getItem('sessionid')){
  sessionStorage.sessionid = Math.floor(Math.random()*90000) + 10000}
  window.location.reload()
}


function handleFormChange3() {
sessionStorage.removeItem('sessionid'); window.location.reload()
}

function handleFormChange4() {
if (sessionStorage.t_sessionid != "") {sessionStorage.sessionid = sessionStorage.t_sessionid; window.location.reload()}
}

function DeltSession() {
  return (
    <>
      <Helmet>
        <title>Fælles session</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Fælles session"
          subHeading="Arbejd sammen med andre, ved at dele din sesssionskode"
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
              <CardHeader title="Min session" />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 500 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                >
                  Min sessionskode
                </Typography>
                <TextField
                  multiline
                  sx={{ mt: 2 }}
                  inputProps={{ style: { color: "#FFC13D" } }}
                  style={{ width: "20%" }}
                  id="modal-modal-description"
                  value={sessionStorage.sessionid}
                ></TextField>
                <Button
                  onClick={(event) => handleFormChange(event)}
                  variant="contained"
                  sx={{ right: "20%", left: "20%", margin: 2 }}
                  size="big"
                  color="primary"
                >
                  Opret en session
                </Button>
                <Button
                  onClick={() => handleFormChange3()}
                  variant="outlined"
                  sx={{ right: "20%", left: "20%", margin: 2 }}
                  size="big"
                  color="error"
                >
                  Stop min session
                </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs="auto">
            <Card>
              <CardHeader title="Deltag i session" />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 500 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                >
                  Indtast en sessionskode her for at deltage
                </Typography>
                <TextField
                  multiline
                  onChange={(event) => {sessionStorage.t_sessionid = event.target.value}}
                  sx={{ mt: 2 }}
                  inputProps={{ style: { color: "#FFC13D" } }}
                  style={{ width: "20%" }}
                  id="modal-modal-description"
                ></TextField>
                <Button
                  variant="contained"
                  sx={{ right: "20%", left: "20%", margin: 2 }}
                  size="big"
                  color="primary"
                  onClick={() => handleFormChange4()}
                >
                  Deltag i session
                </Button>
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

export default DeltSession;
