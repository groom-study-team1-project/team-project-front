import { Outlet } from "react-router-dom";
import { Container } from "./Background.style";

function Background() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default Background;
