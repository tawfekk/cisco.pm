import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/material/styles";

export const ThemeContext = React.createContext((themeName) => {});

const ThemeProviderWrapper = function (props) {
  const curThemeName = localStorage.getItem("appTheme") || "MainTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  //<StylesProvider injectFirst>
  //<ThemeProvider . . .. ..
  //</StylesProvider>

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
