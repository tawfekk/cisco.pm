import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import {LogoAlone} from 'src/components/Logo';
import Hero from './Hero';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {

  return (
    <OverviewWrapper>
      <Helmet>
        <title>cisco.pm</title>
      </Helmet>
      <Container maxWidth="lg">
        <Card sx={{ p: 10, mb: 10, mt: '7%', borderRadius: 12 }}>
          <Box sx={{ mt: -5}}> <LogoAlone/> </Box>
          <Hero />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
