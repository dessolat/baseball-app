import { getPitchColorByName } from 'utils';
import { useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';

const CurrentDot = ({ startX, startY, currentDot, minMaxValues }) => {
  const [currentDotRadius, setCurrentDotRadius] = useState(0);

  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

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
  return (
    <>
      {isCurrentDot ? (
        <>
          {/* Dot */}
          <circle cx={coordX + startX} cy={startY + 100 - coordY} r={currentDotRadius + 1.5} fill='white' />
          <circle
            cx={coordX + startX}
            cy={startY + 100 - coordY}
            r={currentDotRadius}
            fill={getPitchColorByName(pitchTypes[currentDot.type][0])}
            stroke='black'
            strokeWidth='0.5'
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CurrentDot;
