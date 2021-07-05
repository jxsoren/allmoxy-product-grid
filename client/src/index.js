import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App.js";

import { ProductProvider } from "./provider/ProductProvider.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const root = document.getElementById("root");

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ProductProvider>
      <App />
    </ProductProvider>
  </ChakraProvider>,
  root
);
