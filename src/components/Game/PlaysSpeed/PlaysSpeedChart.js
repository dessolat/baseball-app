import React from 'react';
import cl from './PlaysSpeed.module.scss';

const PlaysSpeedChart = ({ chartData, currentDot = 0 }) => {
  const GRAPH_WIDTH = 1;
  const GRAPH_COLOR = '#1A4C96';
  const DOT_RADIUS = 1;
  const DOT_COLOR = '#1A4C96';
  const CURRENT_DOT_RADIUS = 6;
  const CURRENT_DOT_COLOR = '#2B9D6A';
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

  let maxYValue = Math.max(...dataArr) + 2;
  let minYValue = Math.min(...dataArr) - 2;

  const [maxYAxisValue, minYAxisValue] = getMaxMinYAxisValue(maxYValue, minYValue);

  const averageValue = (maxYAxisValue - minYAxisValue) / 3;
  const yAxisValues = [
    maxYAxisValue,
    maxYAxisValue - averageValue,
    minYAxisValue + averageValue,
    minYAxisValue
  ];

  const minYCoord = 20;
  const maxYCoord = 83;

  const innerHeight = maxYCoord - minYCoord;

  const yValuePerHeight = (maxYAxisValue - minYAxisValue) / innerHeight;

  const minXCoord = 50;
  const maxXCoord = 420;

  const innerWidth = maxXCoord - minXCoord;

  const xInterval = dataArr.length > 1 ? innerWidth / (dataArr.length - 1) : 0;

  const dotsCoords = [];

  dataArr.length > 1
    ? dataArr.forEach((dot, i) =>
        dotsCoords.push([minXCoord + xInterval * i, maxYCoord - (dot - minYAxisValue) / yValuePerHeight])
      )
    : dotsCoords.push([innerWidth / 2 + minXCoord, innerHeight / 2 + minYCoord]);

  let linePath = '';
  dotsCoords.forEach((dot, i) => {
    if (i === 0) {
      linePath += `M${dot[0]} ${dot[1]}`;
      return;
    }

    linePath += `L${dot[0]} ${dot[1]}`;
  });

  const isPath = dataArr.length > 1;
  const renderedGraph = isPath ? (
    <path d={linePath} stroke={GRAPH_COLOR} strokeWidth={GRAPH_WIDTH} fill='none' />
  ) : (
    <circle cx={dotsCoords[0][0]} cy={dotsCoords[0][1]} r={DOT_RADIUS} fill={DOT_COLOR} />
  );

  const isDots = dataArr.length > 1;
  const dots = isDots
    ? dotsCoords.map((dot, i) => <circle key={i} cx={dot[0]} cy={dot[1]} r={DOT_RADIUS} fill={DOT_COLOR} />)
    : null;

  return (
    <svg viewBox='0 0 440 110' className={cl.chart}>
    {/* <svg width='95%' height='85%' viewBox='0 0 440 110' className={cl.chart}> */}
      <text x='10' y='20' className={cl.plainText}>
        {yAxisValues[0]}
      </text>
      <text x='10' y='41' className={cl.plainText}>
        {yAxisValues[1]}
      </text>
      <text x='10' y='62' className={cl.plainText}>
        {yAxisValues[2]}
      </text>
      <text x='10' y='83' className={cl.plainText}>
        {yAxisValues[3]}
      </text>
      <line x1='38' y1='20' x2='435' y2='20' stroke='#E3E1E1' strokeWidth='1' strokeDasharray='4 2' />
      <line x1='38' y1='41' x2='435' y2='41' stroke='#E3E1E1' strokeWidth='1' strokeDasharray='4 2' />
      <line x1='38' y1='62' x2='435' y2='62' stroke='#E3E1E1' strokeWidth='1' strokeDasharray='4 2' />
      <line x1='38' y1='83' x2='435' y2='83' stroke='#E3E1E1' strokeWidth='1' strokeDasharray='4 2' />
      {renderedGraph}
      {dots}
      <line
        x1={dotsCoords[currentDot][0]}
        y1={dotsCoords[currentDot][1]}
        x2={dotsCoords[currentDot][0]}
        y2='92'
        stroke={LINE_DOWN_COLOR}
        strokeWidth={LINE_DOWN_WIDTH}
      />
      <circle
        cx={dotsCoords[currentDot][0]}
        cy={dotsCoords[currentDot][1]}
        r={CURRENT_DOT_RADIUS}
        fill={CURRENT_DOT_COLOR}
      />
      <text x={dotsCoords[currentDot][0] - 31} y='108' className={cl.boldText} style={{ width: 75 }}>
        {dataArr[currentDot].toFixed(1)} mph
      </text>
    </svg>
  );
};

export default PlaysSpeedChart;
