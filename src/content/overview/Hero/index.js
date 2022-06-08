import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { styled } from "@mui/material/styles";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #0c1024;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center" }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <TypographyH1 sx={{ mb: 4 }} variant="h1">
            Siden er stadig under opbygning
          </TypographyH1>
          <Button
            onClick={() => window.open("https:/legacy.cisco.pm")}
            size="small"
            sx={{ color: "#9EA4C1", mr: 3 }}
          >
            Gå til legacy version
          </Button>
          <Button
            component={RouterLink}
            to="/components/router"
            size="large"
            variant="contained"
          >
            Gå til live preview
          </Button>
          <Grid container spacing={3} mt={5}>
            <Grid item md={6}>
              <MuiAvatar>
                <img
                  src="/static/images/logo/material-ui.svg"
                  alt="Material-UI"
                />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Material-UI</b>
                </Box>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <JsAvatar>
                <img
                  src="/static/images/logo/javascript.svg"
                  alt="javascript"
                />
              </JsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 1 }}>
                  <b>React.js</b>
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
