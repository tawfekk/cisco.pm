import { Box, Container, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`
);

function Footer() {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box
          py={3}
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              © cisco.pm {new Date().getFullYear()} —{' '}
              <Link
                href="mailto:cisco.pm"
                target="_blank"
                rel="noopener noreferrer"
              >
                info@cisco.pm
              </Link>
            </Typography>
          </Box>
          <Typography sx={{ pt: { xs: 2, md: 0 } }} variant="subtitle1">
            cisco.pm is not affiliated with Cisco Systems, Inc.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
