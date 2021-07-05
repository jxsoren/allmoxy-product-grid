import React, { useContext, useEffect } from "react";
import { Home } from "./components/Home/Home.js";

const initOptions = {
  value: "",
};

export const App = () => {

  return (
    <div className="app">
      <main>
       <Home />
      </main>
    </div>
  );
};
