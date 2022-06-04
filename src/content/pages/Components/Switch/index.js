import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import Footer from "src/components/Footer";
import { useState } from "react";
import * as React from "react";
import {
  Container,
} from "@mui/material";
import { StatusComingSoon } from "src/content/pages/Status/ComingSoon";
function Switch() {

  return (
    <>
      <Helmet>
        <title>Switch</title>
      </Helmet>
      <PageTitleWrapper/>
      <Container maxWidth="lg">
        {StatusComingSoon()}
      </Container>
      <Footer />
    </>
  );
}

export default Switch;
