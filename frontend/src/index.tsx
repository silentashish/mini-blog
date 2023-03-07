import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./router";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { chakraTheme } from "./styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme}>
        <ColorModeScript
          initialColorMode={chakraTheme.config.initialColorMode}
        />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
