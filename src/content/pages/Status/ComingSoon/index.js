import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Logo from "src/components/LogoSign";

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


function StatusComingSoon() {
  return (
    <>
      <Helmet>
        <title>Status - Coming Soon</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Logo />
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                Kommer snart
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                Denne funktion er ikke helt klar endnu
              </Typography>
            </Container>
            <img
              alt="Coming Soon"
              height={200}
              src="/static/images/status/coming-soon.svg"
            />
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;
