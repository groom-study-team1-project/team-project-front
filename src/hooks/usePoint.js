import { useState } from "react";

function usePoint(index, initialX, initialY, max = 30) {
  const [point, setPoint] = useState({
    x: initialX,
    y: initialY,
    fixedY: initialY,
    cur: index,
    speed: 0.003,
    max: max,
  });

  const updatePoint = () => {
    setPoint((prev) => ({
      ...prev,
      cur: prev.cur + prev.speed,
      y: prev.fixedY + Math.sin(prev.cur) * prev.max,
    }));
  };

  return [point, updatePoint];
}

export default usePoint;
