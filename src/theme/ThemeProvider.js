import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { MainTheme } from "./schemes/MainTheme";

export const ThemeContext = React.createContext((themeName) => {});

const ThemeProviderWrapper = function (props) {
  return (
    <ThemeContext.Provider value={''}>
      <ThemeProvider theme={MainTheme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
