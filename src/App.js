import React from "react";
import Router from "./routes/Router";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ScreenSizeListener from "./hooks/useScreenResize";
function App() {
  return (
    <>
      <ScreenSizeListener />
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
