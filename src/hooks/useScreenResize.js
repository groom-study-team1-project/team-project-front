import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../store/screenResize/screenSlice";
const ScreenSizeListener = () => {
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({ minWidth: 1063 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1062 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    dispatch(setScreenSize({ isMobile, isTablet, isDesktop }));
  }, [isMobile, isTablet, isDesktop, dispatch]);

  return null;
};

export default ScreenSizeListener;
