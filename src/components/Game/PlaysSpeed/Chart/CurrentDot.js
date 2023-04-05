import { useState, useEffect } from 'react';
import { getPitchColorByName } from 'utils';
import usePitchTypes from 'hooks/usePitchTypes';
import cl from '../PlaysSpeed.module.scss';
import classNames from 'classnames';

const CurrentDot = ({ currentDot, coords, pitchTypes }) => {
  const [classToggled, setClassToggled] = useState(false);

  useEffect(() => {
    setClassToggled(true);

    setTimeout(() => {
      setClassToggled(false);
    }, 0);
  }, [currentDot]);

  const LINE_DOWN_WIDTH = 1;
  const LINE_DOWN_COLOR = '#ACACAC';

  const { minXCoord, maxYCoord, xInterval, minYAxisValue, yValuePerHeight } = coords;

  const tempDotTextCoord = minXCoord + xInterval * currentDot.index - 14;
  const curDotTextCoord = tempDotTextCoord < 90 ? 90 : tempDotTextCoord > 357 ? 357 : tempDotTextCoord;
  const curDotText = usePitchTypes(currentDot.type);

  const whiteDotClasses = classNames({
    [cl.currentDotWhite]: !classToggled
  });
  const dotClasses = classNames({
    [cl.currentDot]: !classToggled
  });
  return (
    <>
      {/* Current dot line */}
      <line
        x1={minXCoord + xInterval * currentDot.index}
        y1={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
        x2={minXCoord + xInterval * currentDot.index}
        y2='130'
        stroke={LINE_DOWN_COLOR}
        strokeWidth={LINE_DOWN_WIDTH}
      />

      {/* Current dot */}
      <>
        <circle
          cx={minXCoord + xInterval * currentDot.index}
          cy={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
          className={whiteDotClasses}
          fill='white'
        />
        <circle
          cx={minXCoord + xInterval * currentDot.index}
          cy={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
          fill={getPitchColorByName(pitchTypes[currentDot.type][0])}
          stroke='#000'
          strokeWidth='0.5'
          className={dotClasses}
        />
      </>

      {/* Current dot text */}
      <>
        <text x={curDotTextCoord} y='146' className={cl.ballType} textAnchor='end'>
          {curDotText}
        </text>
        <text x={curDotTextCoord + 6} y='146' className={cl.mphValue} textAnchor='start'>
          {currentDot.speed.toFixed(1)} mph
        </text>
      </>
    </>
  );
};

export default CurrentDot;
