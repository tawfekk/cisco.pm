import React, { Component } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "nprogress/nprogress.css";
import { SidebarProvider } from "./contexts/SidebarContext";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
);