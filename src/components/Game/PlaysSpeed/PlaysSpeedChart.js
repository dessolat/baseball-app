import React from 'react';
import cl from './PlaysSpeed.module.scss';
import { useSelector } from 'react-redux';
import Dots from './Chart/Dots';
import CurrentDot from './Chart/CurrentDot';
import Lines from './Chart/Lines';

const PlaysSpeedChart = ({ chartData, currentDot = {} }) => {
  const { pitch_types: pitchTypes } = useSelector(state => state.game.preview);

  function getMaxMinYAxisValue(max, min) {
    max = Math.ceil(max);
    min = Math.floor(min);

    if ((max - min) % 3) {
      const average = (3 - ((max - min) % 3)) / 2;
      max += Math.ceil(average);
      min -= Math.floor(average);
    }
    return [max, min];
  }

  const chartValuesArr = chartData.reduce((sum, pair) => {
    sum.push(pair[1]);
    return sum;
  }, []);

  let maxYValue = Math.max(...chartValuesArr) + -2;
  let minYValue = Math.min(...chartValuesArr) - -2;

  const [maxYAxisValue, minYAxisValue] = getMaxMinYAxisValue(maxYValue, minYValue);

  const minYCoord = 36;
  const maxYCoord = 115;
  const minXCoord = 50;
  const maxXCoord = 420;

  const innerHeight = maxYCoord - minYCoord;
  const innerWidth = maxXCoord - minXCoord;

  const yValuePerHeight = (maxYAxisValue - minYAxisValue) / innerHeight;

  const xInterval = chartValuesArr.length > 1 ? innerWidth / (chartValuesArr.length - 1) : 0;

  let dotsCoords;

  if (chartValuesArr.length > 1) {
    dotsCoords = chartData.reduce((sum, pair, index) => {
      const newValue = [
        minXCoord + xInterval * index,
        maxYCoord - (pair[1] - minYAxisValue) / yValuePerHeight,
        pair[2]
      ];

      sum[pair[0]] = !sum[pair[0]] ? [newValue] : [...sum[pair[0]], newValue];
      return sum;
    }, {});
  }

  const isDots = chartValuesArr.length > 1;
  const isCurrentDot = currentDot.index !== undefined;
  return (
    <svg viewBox='0 0 440 160' className={cl.chart}>
      {/* Horizontal and vertical lines */}
      <Lines coords={{ maxYAxisValue, minYAxisValue, maxYCoord, minYCoord }} />

      {/* Dots */}
      {isDots && <Dots dotsCoords={dotsCoords} pitchTypes={pitchTypes} />}

      {/* Current dot */}
      {isCurrentDot && (
        <CurrentDot
          currentDot={currentDot}
          coords={{ minXCoord, maxYCoord, xInterval, minYAxisValue, yValuePerHeight }}
          pitchTypes={pitchTypes}
        />
      )}
    </svg>
  );
};

export default PlaysSpeedChart;
