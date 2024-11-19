import React, { useEffect } from "react";
import Router from "./routes/Router";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ScreenSizeListener from "./hooks/useScreenResize";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "./services/axiosConfig";
import store from "./store/index"; // Redux Toolkit의 store 가져오기

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(store, navigate);
  }, [navigate]);

  return (
    <>
      <ScreenSizeListener />
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
