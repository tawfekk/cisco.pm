import { Box, Typography, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";

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

export function StatusComingSoon() {
  return (
    <>
      <Helmet>
        <title>Coming soon</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                Coming soon!
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                This function is almost ready
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
