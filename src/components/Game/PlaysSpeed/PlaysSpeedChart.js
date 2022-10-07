import React from 'react';
import cl from './PlaysSpeed.module.scss';

const PlaysSpeedChart = ({ chartData, currentDot = {} }) => {
  const GRAPH_WIDTH = 1;
  const GRAPH_COLOR = '#1A4C96';
  const DOT_RADIUS = 1;
  const DOT_COLOR = '#1A4C96';
  const CURRENT_DOT_RADIUS = 6;
  const CURRENT_DOT_COLOR = '#2B9D6A';
  const LINE_DOWN_WIDTH = 1;
  const LINE_DOWN_COLOR = '#ACACAC';

  const COLORS = {
    0: '#1A4C96',
    1: 'red',
    2: 'green',
    3: 'olive'
  };

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

  let maxYValue = Math.max(...chartValuesArr) + 0;
  let minYValue = Math.min(...chartValuesArr) - 0;

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

  const xInterval = chartValuesArr.length > 1 ? innerWidth / (chartValuesArr.length - 1) : 0;

  let dotsCoords;
  // const dotsCoords = {};

  // chartValuesArr.length > 1
  //   ? chartValuesArr.forEach((dot, i) =>
  //       dotsCoords.push([minXCoord + xInterval * i, maxYCoord - (dot - minYAxisValue) / yValuePerHeight])
  //     )
  //   : dotsCoords.push([innerWidth / 2 + minXCoord, innerHeight / 2 + minYCoord]);

  // let xIntervalIndex = 0;

  if (chartValuesArr.length > 1) {
    dotsCoords = chartData.reduce((sum, pair, index) => {
      const newValue = [
        minXCoord + xInterval * index,
        maxYCoord - (pair[1] - minYAxisValue) / yValuePerHeight
      ];

      sum[pair[0]] = !sum[pair[0]] ? [newValue] : [...sum[pair[0]], newValue];
      return sum;
    }, {});
  }

  // if (chartValuesArr.length > 1) {
  //   chartData.forEach((pair, i) => {
  //     pair[1].forEach((value, j) => {
  //       const newValue = [
  //         minXCoord + xInterval * xIntervalIndex,
  //         maxYCoord - (value - minYAxisValue) / yValuePerHeight
  //       ];
  //       dotsCoords[pair[0]] = !dotsCoords[pair[0]] ? [newValue] : [...dotsCoords[pair[0]], [newValue]];
  //       xIntervalIndex++;
  //     });
  //   });
  // }

  const linePaths = [];

  Object.entries(dotsCoords).forEach(pair => {
    let linePath = '';
    pair[1].forEach((dot, i) => {
      if (i === 0) {
        linePath += `M${dot[0]} ${dot[1]}`;
        return;
      }

      linePath += `L${dot[0]} ${dot[1]}`;
    });

    linePaths.push({ [pair[0]]: linePath });
  });

  // let linePath = '';
  // dotsCoords.forEach((dot, i) => {
  //   if (i === 0) {
  //     linePath += `M${dot[0]} ${dot[1]}`;
  //     return;
  //   }

  //   linePath += `L${dot[0]} ${dot[1]}`;
  // });

  // const linePath = '';

  const renderedGraphs = (
    <>
      {linePaths.map((pair, index) => {
        const isPath = dotsCoords[Object.keys(pair)[0]].length > 1;

        return isPath ? (
          <path d={Object.values(pair)[0]} stroke={COLORS[index]} strokeWidth={GRAPH_WIDTH} fill='none' />
        ) : (
          <circle
            cx={dotsCoords[Object.keys(pair)[0]][0][0]}
            cy={dotsCoords[Object.keys(pair)[0]][0][1]}
            r={DOT_RADIUS}
            fill={DOT_COLOR}
          />
        );
      })}
    </>
  );

  // const isPath = chartValuesArr.length > 1;
  // const renderedGraph = isPath ? (
  //   <path d={linePath} stroke={GRAPH_COLOR} strokeWidth={GRAPH_WIDTH} fill='none' />
  // ) : (
  //   <circle cx={dotsCoords[0][0]} cy={dotsCoords[0][1]} r={DOT_RADIUS} fill={DOT_COLOR} />
  // );

  const isDots = chartValuesArr.length > 1;
	const dotsArr = Object.entries(dotsCoords).reduce((sum, pair) => {
		pair[1].forEach(coords => sum.push({type: +pair[0], coords: [coords[0], coords[1]]}))
		return sum
	},[])

	const dots = !isDots ? null : dotsArr.map((dot, i) => <circle key={i} cx={dot.coords[0]} cy={dot.coords[1]} r={DOT_RADIUS} fill={COLORS[dot.type - 1]} />)
  //! const dots = isDots
  //!   ? dotsCoords.map((dot, i) => <circle key={i} cx={dot[0]} cy={dot[1]} r={DOT_RADIUS} fill={DOT_COLOR} />)
  //!   : null;

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
      {renderedGraphs}
      {dots}
      {currentDot.index !== undefined && (
        <line
          x1={minXCoord + xInterval * currentDot.index}
          y1={maxYCoord - (currentDot.speed - minYAxisValue) / yValuePerHeight}
          x2={minXCoord + xInterval * currentDot.index}
          y2='92'
          stroke={LINE_DOWN_COLOR}
          strokeWidth={LINE_DOWN_WIDTH}
        />
      )}
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
