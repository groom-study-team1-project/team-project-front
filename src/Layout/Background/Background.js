import { Outlet } from "react-router-dom";
import { Container } from "./Background.style";
import useCanvas from "../../hooks/useCanvas";
import usePoint from "../../hooks/usePoint";
import { useSelector } from "react-redux";

function Background() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const totalPoints = 6;
  const pointGap = width / (totalPoints - 1);
  const wavePoint = [
    [
      usePoint(0, 0, height * 0.5 - height * 0.15),
      usePoint(1, pointGap, height * 0.35 - height * 0.15),
      usePoint(2, pointGap * 2, height * 0.5 - height * 0.15),
      usePoint(3, pointGap * 3, height * 0.5 + height * 0.15),
      usePoint(4, pointGap * 4, height * 0.8 - height * 0.05),
      usePoint(5, width, height * 0.7),
    ],
    [
      usePoint(7, 0, height * 0.5),
      usePoint(10, pointGap, height * 0.35),
      usePoint(11, pointGap * 2, height * 0.5),
      usePoint(12, pointGap * 3, height * 0.5),
      usePoint(13, pointGap * 4, height * 0.8),
      usePoint(14, width, height * 0.7),
    ],
  ];

  const canvasRef = useCanvas((canvas) => {
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (isDarkMode) {
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.49, "rgba(37, 41, 59, 1)");
      gradient.addColorStop(1, "rgba(21, 27, 35, 1)");
    } else {
      gradient.addColorStop(0, "rgba(172, 182, 229, 1)");
      gradient.addColorStop(1, "rgba(199, 243, 243, 1)");
    }

    const waveGradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
    waveGradient1.addColorStop(0, "rgba(217, 217, 217, 0.3)");
    waveGradient1.addColorStop(1, "rgba(217, 217, 217, 0)");

    const waveGradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
    waveGradient2.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    waveGradient2.addColorStop(1, "rgba(217, 217, 217, 0)");

    const waveGradient = [waveGradient1, waveGradient2];

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const animate = () => {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);

      wavePoint.forEach((points, index) => {
        ctx.beginPath();
        ctx.fillStyle = waveGradient[index];

        let prevX = points[0][0].x;
        let prevY = points[0][0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < totalPoints; i++) {
          if (i < totalPoints - 1) {
            points[i][1]();
          }

          const cx = (prevX + points[i][0].x) / 2;
          const cy = (prevY + points[i][0].y) / 2;

          ctx.quadraticCurveTo(prevX, prevY, cx, cy);

          prevX = points[i][0].x;
          prevY = points[i][0].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(points[0][0].x, canvas.height);
        ctx.fill();
        ctx.closePath();
      });
    };

    requestAnimationFrame(animate);
  });

  return (
    <Container isDarkMode={isDarkMode}>
      <canvas ref={canvasRef} />
      <Outlet />
    </Container>
  );
}

export default Background;
