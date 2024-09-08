import React, { useEffect } from "react";
import Router from "./routes/Router";
import GlobalStyle from "./assets/styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
