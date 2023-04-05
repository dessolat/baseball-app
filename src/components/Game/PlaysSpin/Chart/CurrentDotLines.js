import { useLayoutEffect, useState } from 'react';
import { currentDotLine as lineClass } from '../PlaysSpin.module.scss';

const CurrentDotLines = ({ startX, startY, currentDot, minMaxValues }) => {
  const [currentDotRadius, setCurrentDotRadius] = useState(0);

  useLayoutEffect(() => {
    setCurrentDotRadius(0);

    setTimeout(() => {
      setCurrentDotRadius(1);
    }, 10);

    // eslint-disable-next-line
  }, [currentDot]);

  useLayoutEffect(() => {
    if (currentDotRadius === 0) return;

    currentDotRadius < 5 &&
      setTimeout(() => {
        setCurrentDotRadius(prev => (prev + 0.45 > 7.5 ? 7.5 : prev + 0.45));
      }, 10);

    // eslint-disable-next-line
  }, [currentDotRadius]);

  const maxX = Math.ceil(minMaxValues.maxX * 100);
  const minX = Math.floor(minMaxValues.minX * 100);
  const maxY = Math.ceil(minMaxValues.maxY * 100);
  const minY = Math.floor(minMaxValues.minY * 100);

  const xCoef = 100 / (maxX - minX);
  const yCoef = 100 / (maxY - minY);

  const coordX = (currentDot.offsetX * 100 - minX) * xCoef;
  const coordY = (currentDot.offsetY * 100 - minY) * yCoef;

  const isCurrentDot =
    currentDot.offsetX !== undefined &&
    coordX + 15 > startX &&
    coordY + 10 > startY &&
    coordX + startX < 115 &&
    coordY + startY < 110;

  const verticalLineY2Coord = Math.max((startY + 100) * (currentDotRadius / 5.05), startY + 100 - coordY);
  const horizontalLineX1Coord = Math.min(startX / (currentDotRadius / 5.05), coordX + startX);

  if (!isCurrentDot) return <></>;

  return (
    <>
      {/* Axis lines projections */}
      {/* Vertical */}
      <line
        x1={coordX + startX}
        y1={startY + 100 - coordY}
        x2={coordX + startX}
        y2={verticalLineY2Coord}
        className={lineClass}
      />
      {/* Horizontal */}
      <line
        x1={horizontalLineX1Coord}
        y1={startY + 100 - coordY}
        x2={coordX + startX}
        y2={startY + 100 - coordY}
        className={lineClass}
      />
    </>
  );
};

export default CurrentDotLines;
