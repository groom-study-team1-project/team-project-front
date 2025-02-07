import React, { useEffect } from "react";
import Router from "./routes/Router";
import ScreenSizeListener from "./hooks/useScreenResize";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "./services/axiosConfig";
import store from "./store/index";
import { useDispatch } from "react-redux";
import { userAuth } from "./store/user/userSlice";
import { FontDefault } from "./assets/styles/Font.style";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setupAxiosInterceptors(store, navigate); // 인터셉터 등록
    dispatch(userAuth());
  }, [navigate, dispatch]);

  return (
    <>
      <FontDefault />
      <ScreenSizeListener />
      <Router />
    </>
  );
}

export default App;
