import {
  Box,
  Typography,
  Container,
  Button,
  Link,
  Divider,
  Tooltip,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { syncup } from "src/handlers/Sync";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { styled } from "@mui/material/styles";
const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export function StatusReportError() {
  return (
    <>
      <Helmet>
        <title>Fejlrapporting</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Button
            size="small"
            sx={{ float: "left" }}
            color="secondary"
            startIcon=<ArrowBackIcon />
            component={NavLink}
            to="/components/oversigt"
          >
            Gå tilbage
          </Button>
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                Oplever du en fejl?
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                1: Prøv først at nulstille al data på siden
              </Typography>
              <Tooltip arrow placement="right" title="Denne handling er permanent">
              <Button
                size="small"
                sx={{ m: 2 }}
                variant="contained"
                color="error"
                startIcon=<DangerousRoundedIcon />
                onClick={() => {
                  syncup(0, "router");
                  syncup(0, "switch");
                  syncup(0, "vlan");
                  localStorage.clear();
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
                component={NavLink}
                to="/components/oversigt"
              >
                Nulstil al data
              </Button>
              </Tooltip>
              <Divider />
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mt: 2 }}
              >
                2: Hvis det ikke virker, så opret et issue på GitHub eller send
                en mail til{" "}
                <Link
                  href="mailto:cisco.pm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  info@cisco.pm
                </Link>
              </Typography>
              <Button
                size="small"
                sx={{ mt: 2, mb: 4 }}
                variant="contained"
                color="primary"
                startIcon=<GitHubIcon />
                onClick={() => {
                  window.open(
                    "https://github.com/tawfekk/cisco.pm/issues",
                    "_blank"
                  );
                }}
              >
                Gå til GitHub
              </Button>
            </Container>
            <img alt="Bug" height={300} src="/static/images/status/bug.svg" />
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusReportError;
