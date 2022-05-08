import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Switch, Typography, TextField, Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Footer from 'src/components/Footer';



const handleFormChange = (event) => {
  sessionStorage.sessionstate = event.target.checked;
  if (event.target.checked){
  if (!sessionStorage.getItem('sessionid')){sessionStorage.sessionid = Math.floor(Math.random()*90000) + 10000}
}
};

const handleFormChange2 = (event) => {
  sessionStorage.sessionid = event.target.value
}

function Tooltips() {
  return (
    <>
      <Helmet>
        <title>Fælles session</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Fælles session"
          subHeading="Arbejd sammen med så mange du har lyst til, de skal bare insætte din sesssionskode ind på"
          docs="https://material-ui.com/components/tooltips/" />
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
              <CardHeader title="Positioning" />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 500 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                >
                  Sessionskode
                </Typography>
                <TextField
                  multiline
                  sx={{ mt: 2 }}
                  inputProps={{ style: { color: "#FFC13D" } }}
                  style={{ width: "15%" }}
                  id="modal-modal-description"
                  defaultValue={sessionStorage.sessionid}
                  onChange={(event) => handleFormChange2(event)}
                ></TextField>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      localStorage.router_initial_final
                    );
                  }}
                  variant="contained"
                  sx={{ right: "20%", left: "20%", margin: 2 }}
                  size="big"
                  onChange={(event) => handleFormChange(event)}
                  color="primary"
                >
                  Start ny session
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

export default Tooltips;
