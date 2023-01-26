import usePitchTypes from 'hooks/usePitchTypes';
import useSetMomentById from 'hooks/useSetMomentById';
import React, { useState, useLayoutEffect } from 'react';
import { getChartColor } from 'utils';
import cl from './PlaysSpeed.module.scss';

const Dots = ({ dotsCoords }) => {
  const setMomentById = useSetMomentById();

  const DOT_RADIUS = 3;

  const dotsArr = Object.entries(dotsCoords).reduce((sum, pair) => {
    pair[1].forEach(coords =>
      sum.push({ type: +pair[0], coords: [coords[0], coords[1]], momentId: coords[2] })
    );
    return sum;
  }, []);

  const handleDotClick = id => () => setMomentById(id);
  return dotsArr.map((dot, i) => (
    <circle
      key={i}
      cx={dot.coords[0]}
      cy={dot.coords[1]}
      r={DOT_RADIUS}
      fill={getChartColor(dot.type)}
      stroke='#000'
      strokeWidth='0.5'
      className={cl.dot}
      onClick={handleDotClick(dot.momentId)}
    />
  ));
};

const PlaysSpeedChart = ({ chartData, currentDot = {} }) => {
  const [currentDotRadius, setCurrentDotRadius] = useState(0);

  useLayoutEffect(() => {
    if (currentDot.index === undefined) return;

    setCurrentDotRadius(prev => (prev === 1 ? 0.99999 : 1));
  }, [currentDot]);

  useLayoutEffect(() => {
    if (currentDot.index === undefined) return;

    currentDotRadius < 5 &&
      setTimeout(() => {
        setCurrentDotRadius(prev => prev + 0.3);
      }, 10);

    // eslint-disable-next-line
  }, [currentDotRadius]);

  // const GRAPH_WIDTH = 1;
  // const DOT_COLOR = '#1A4C96';
  const LINE_DOWN_WIDTH = 1;
  const LINE_DOWN_COLOR = '#ACACAC';

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

  const averageValue = (maxYAxisValue - minYAxisValue) / 3;
  const yAxisValues = [
    maxYAxisValue,
    maxYAxisValue - averageValue,
    minYAxisValue + averageValue,
    minYAxisValue
  ];

  const minYCoord = 36;
  const maxYCoord = 115;

  const innerHeight = maxYCoord - minYCoord;

  const yValuePerHeight = (maxYAxisValue - minYAxisValue) / innerHeight;

  const minXCoord = 50;
  const maxXCoord = 420;

  const innerWidth = maxXCoord - minXCoord;

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

  // const linePaths = [];

  // Object.entries(dotsCoords).forEach(pair => {
  //   let linePath = '';
  //   pair[1].forEach((dot, i) => {
  //     if (i === 0) {
  //       linePath += `M${dot[0]} ${dot[1]}`;
  //       return;
  //     }

  //     linePath += `L${dot[0]} ${dot[1]}`;
  //   });

  //   linePaths.push({ [pair[0]]: linePath });
  // });

  // const renderedGraphs = (
  //   <>
  //     {linePaths.map((pair, index) => {
  //       const isPath = dotsCoords[Object.keys(pair)[0]].length > 1;

  //       return isPath ? (
  //         <path d={Object.values(pair)[0]} stroke={COLORS[index]} strokeWidth={GRAPH_WIDTH} fill='none' />
  //       ) : (
  //         <circle
  //           cx={dotsCoords[Object.keys(pair)[0]][0][0]}
  //           cy={dotsCoords[Object.keys(pair)[0]][0][1]}
  //           r={DOT_RADIUS}
  //           fill={DOT_COLOR}
  //         />
  //       );
  //     })}
  //   </>
  // );

  const isDots = chartValuesArr.length > 1;

  const lineBtwAvg = (maxYCoord - minYCoord) / 3;
  const tempDotTextCoord = minXCoord + xInterval * currentDot.index - 14;
  const curDotTextCoord = tempDotTextCoord < 90 ? 90 : tempDotTextCoord > 357 ? 357 : tempDotTextCoord;
  const curDotText = usePitchTypes(currentDot.type);
  return (
    <svg viewBox='0 0 440 160' className={cl.chart}>
      {/* Horizontal lines text */}
      {[1, 1, 1, 1].map((_, i) => (
        <text key={i} x='0' y={minYCoord + lineBtwAvg * i + 5} className={cl.plainText}>
          {yAxisValues[i]}
        </text>
      ))}

      {/* Horizontal lines */}
      {[1, 1, 1, 1].map((_, i) => (
        <line
          key={i}
          x1='30'
          y1={minYCoord + lineBtwAvg * i}
          x2='435'
          y2={minYCoord + lineBtwAvg * i}
          stroke='#E3E1E1'
          strokeWidth='1'
          strokeDasharray='4 2'
        />
      ))}

      {/* Dots */}
      {isDots && <Dots dotsCoords={dotsCoords} />}

      {/* Current dot line */}
      {currentDot.index !== undefined && (
        <line
          x1={minXCoord + xInterval * currentDot.index}
          y1={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
          x2={minXCoord + xInterval * currentDot.index}
          y2='130'
          stroke={LINE_DOWN_COLOR}
          strokeWidth={LINE_DOWN_WIDTH}
        />
      )}
      {/* Current dot */}
      {currentDot.index !== undefined && (
        <>
          <circle
            cx={minXCoord + xInterval * currentDot.index}
            cy={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
            r={currentDotRadius + 1.5}
            fill='white'
          />
          <circle
            cx={minXCoord + xInterval * currentDot.index}
            cy={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
            r={currentDotRadius}
            fill={getChartColor(currentDot.type)}
            stroke='#000'
            strokeWidth='0.5'
          />
        </>
      )}
      {/* Current dot text */}
      {currentDot.index !== undefined && (
        <>
          <text x={curDotTextCoord} y='146' className={cl.ballType} textAnchor='end'>
            {curDotText}
          </text>
          <text x={curDotTextCoord + 6} y='146' className={cl.mphValue} textAnchor='start'>
            {currentDot.speed.toFixed(1)} mph
          </text>
        </>
      )}
    </svg>
  );
};

export default PlaysSpeedChart;
