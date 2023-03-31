import { getPitchColorByName } from 'utils';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { currentDot as dotClass, currentDotWhite as whiteDotClass } from '../PlaysSpin.module.scss';
import classNames from 'classnames';

const CurrentDot = ({ startX, startY, currentDot, minMaxValues }) => {
  const [classToggled, setClassToggled] = useState(false);

  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

  useEffect(() => {
    setClassToggled(true);

    setTimeout(() => {
      setClassToggled(false);
    }, 0);
  }, [currentDot]);

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

  const whiteDotClasses = classNames({
    [whiteDotClass]: !classToggled
  });
  const dotClasses = classNames({
    [dotClass]: !classToggled
  });

  if (!isCurrentDot) return <></>;

  return (
    <>
      {/* Dot */}
      <circle cx={coordX + startX} cy={startY + 100 - coordY} fill='white' className={whiteDotClasses} />
      <circle
        cx={coordX + startX}
        cy={startY + 100 - coordY}
        fill={getPitchColorByName(pitchTypes[currentDot.type][0])}
        stroke='black'
        strokeWidth='0.5'
        className={dotClasses}
      />
    </>
  );
};

export default CurrentDot;
