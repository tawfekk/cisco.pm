import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import {LogoAlone} from 'src/components/Logo';
import Hero from './Hero';

function Overview() {

  return (
    <Box>
      <Helmet>
        <title>cisco.pm</title>
      </Helmet>
      <Container sx={{ mt: '7%'}} maxWidth="lg">
          <Box sx={{ mt: 5}}> <LogoAlone/> </Box>
          <Hero />
      </Container>
    </Box>
  );
}

export default Overview;
