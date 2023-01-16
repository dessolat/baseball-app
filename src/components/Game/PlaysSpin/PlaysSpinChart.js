import React, { useState, useLayoutEffect, useRef, useEffect, Fragment, useMemo } from 'react';
import cl from './PlaysSpin.module.scss';

const DOT_RADIUS = 3;
const GRAPH_START_X = 15;
const GRAPH_START_Y = 10;
const COLORS = {
  '-1': 'lightgray',
  0: '#1A4C96',
  1: 'red',
  2: 'green',
  3: 'olive',
  4: 'yellow',
  5: 'purple',
  6: 'lightgreen'
};

const AxisLines = ({ startX, startY }) => (
  <>
    <line x1={startX + 49.5} y1={startY + 0} x2={startX + 49.5} y2={startY + 100} stroke='#ACACAC' />
    <line x1={startX} y1={startY + 49.5} x2={startX + 100} y2={startY + 49.5} stroke='#ACACAC' />
  </>
);

const HorizontalLines = ({ startX, startY }) => (
  <>
    <line
      x1={startX}
      y1={startY + 0}
      x2={startX + 100}
      y2={startY + 0}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX}
      y1={startY + 25}
      x2={startX + 100}
      y2={startY + 25}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX}
      y1={startY + 50}
      x2={startX + 100}
      y2={startY + 50}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX}
      y1={startY + 75}
      x2={startX + 100}
      y2={startY + 75}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX}
      y1={startY + 100}
      x2={startX + 100}
      y2={startY + 100}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
  </>
);

const HorizontalLinesText = ({ startX, graphRatio, minMaxValues }) => {
  const maxY = Math.ceil(minMaxValues.maxY * 100);
  const minY = Math.floor(minMaxValues.minY * 100);
  const average = (maxY - minY) / 4;

  return (
    <>
      <text x={startX - 15} y='15' stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {(maxY / graphRatio) * -1}
      </text>
      <text x={startX - 15} y='40' stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {Math.round(((maxY - average) / graphRatio) * -1)}
      </text>
      <text x={startX - 15} y='65' stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {Math.round(((maxY + minY) / 2 / graphRatio) * -1)}
      </text>
      <text x={startX - 15} y='90' stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {Math.round(((minY + average) / graphRatio) * -1)}
      </text>
      <text x={startX - 15} y='115' stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {(minY / graphRatio) * -1}
      </text>
    </>
  );
};

const VerticalLines = ({ startX, startY }) => (
  <>
    <line
      x1={startX + 0}
      y1={startY}
      x2={startX + 0}
      y2={startY + 100}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX + 25}
      y1={startY}
      x2={startX + 25}
      y2={startY + 100}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX + 50}
      y1={startY}
      x2={startX + 50}
      y2={startY + 100}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX + 75}
      y1={startY}
      x2={startX + 75}
      y2={startY + 100}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
    <line
      x1={startX + 100}
      y1={startY}
      x2={startX + 100}
      y2={startY + 100}
      stroke='#E3E1E1'
      strokeDasharray='4 2'
    />
  </>
);

const VerticalLinesText = ({ startX, startY, graphRatio, minMaxValues }) => {
  const maxX = Math.ceil(minMaxValues.maxX * 100);
  const minX = Math.floor(minMaxValues.minX * 100);
  const average = (maxX - minX) / 4;

  return (
    <>
      <text x={startX + 0} y={startY + 117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {minX / graphRatio}
      </text>
      <text x={startX + 25} y={startY + 117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {Math.round((minX + average) / graphRatio)}
      </text>
      <text x={startX + 50} y={startY + 117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {Math.round((maxX + minX) / 2 / graphRatio)}
      </text>
      <text x={startX + 75} y={startY + 117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {Math.round((maxX - average) / graphRatio)}
      </text>
      <text x={startX + 100} y={startY + 117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
        {maxX / graphRatio}
      </text>
    </>
  );
};

const Dots = ({ chartData, startX, startY, graphRatio, minMaxValues }) => {
  const maxX = Math.ceil(minMaxValues.maxX * 100);
  const minX = Math.floor(minMaxValues.minX * 100);
  const maxY = Math.ceil(minMaxValues.maxY * 100);
  const minY = Math.floor(minMaxValues.minY * 100);

  const xCoef = 100 / (maxX - minX);
  const yCoef = 100 / (maxY - minY);

  return (
    <>
      {chartData.map((dot, i) => {
        const coordX = (dot.offsetX * 100 - minX) * xCoef;
        const coordY = (dot.offsetY * 100 - minY) * yCoef;
        // const coordX = 50 + 50 * dot.offsetX * graphRatio;
        // const coordY = 50 - 50 * dot.offsetY * graphRatio;

        // const isCircle =
        //   coordX + 12 > startX && coordY + 8 > startY && coordX + startX < 112 && coordY + startY < 108;
        return (
          <circle
            key={i}
            cx={coordX + startX}
            cy={startY + 100 - coordY}
            // cy={coordY + startY}
            r={DOT_RADIUS}
            fill={COLORS[dot.pitchType]}
            stroke='black'
            strokeWidth='0.5'
          />
        );
      })}
    </>
  );
};

const CurrentDot = ({ startX, startY, currentDot, minMaxValues }) => {
  const [currentDotRadius, setCurrentDotRadius] = useState(0);

  useLayoutEffect(() => {
    setCurrentDotRadius(prev => (prev === 1 ? 0.99999 : 1));
    // eslint-disable-next-line
  }, [currentDot]);

  useLayoutEffect(() => {
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
  // const currentCoordX = 50 + 50 * currentDot.offsetX * graphRatio;
  // const currentCoordY = 50 - 50 * currentDot.offsetY * graphRatio;

  const isCurrentDot =
    currentDot.offsetX !== undefined &&
    coordX + 12 > GRAPH_START_X &&
    coordY + 8 > GRAPH_START_Y &&
    coordX + GRAPH_START_X < 112 &&
    coordY + GRAPH_START_Y < 108;
  return (
    <>
      {isCurrentDot ? (
        <circle
          cx={coordX + startX}
          cy={startY + 100 - coordY}
          // cx={currentCoordX + startX}
          // cy={currentCoordY + startY}
          r={currentDotRadius}
          fill={COLORS[currentDot.type]}
          stroke='black'
          strokeWidth='0.5'
        />
      ) : (
        <></>
      )}
    </>
  );
};

const PlaysSpinChart = ({ chartData, currentDot }) => {
  const [graphRatio, setGraphRatio] = useState(1);

  const ref = useRef();

  // useLayoutEffect(() => {
  //   //Calculating MAX absolute value
  //   const maxValue = chartData.reduce(
  //     (max, cur) => Math.max(Math.abs(cur.offsetX), Math.abs(cur.offsetY), max),
  //     0
  //   );

  //   const newGraphRatio = 100 / (maxValue * 100);

  //   setGraphRatio(newGraphRatio - 0.3);
  // }, [chartData]);

  // useEffect(() => {
  //   const wheelHandler = e => {
  //     e = window.event || e;
  //     var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

  //     const newGraphRatio = delta > 0 ? 0.1 : -0.1;
  //     setGraphRatio(prev => {
  //       if (newGraphRatio < 0 && prev < 0.2) return 0.1;
  //       return prev + newGraphRatio;
  //     });
  //   };

  //   const elem = ref.current;

  //   if (elem.addEventListener) {
  //     elem.addEventListener('mousewheel', wheelHandler, false);
  //     elem.addEventListener('scroll', wheelHandler, false);
  //     elem.addEventListener('DOMMouseScroll', wheelHandler, false);
  //   } else {
  //     elem.attachEvent('onmousewheel', wheelHandler);
  //   }

  //   return () => {
  //     if (elem.removeEventListener) {
  //       elem.removeEventListener('mousewheel', wheelHandler, false);
  //       elem.removeEventListener('scroll', wheelHandler, false);
  //       elem.removeEventListener('DOMMouseScroll', wheelHandler, false);
  //     } else {
  //       elem.detachEvent('onmousewheel', wheelHandler);
  //     }
  //   };
  // }, []);

  console.log(chartData);
  console.log(currentDot);
  const minMaxValues = chartData.reduce((sum, cur) => {
    if (
      sum.maxX === undefined ||
      sum.minX === undefined ||
      sum.maxY === undefined ||
      sum.minY === undefined
    ) {
      sum.maxX = cur.offsetX;
      sum.minX = cur.offsetX;
      sum.maxY = cur.offsetY;
      sum.minY = cur.offsetY;

      return sum;
    }

    if (cur.offsetX < sum.minX) sum.minX = cur.offsetX;
    if (cur.offsetX > sum.maxX) sum.maxX = cur.offsetX;
    if (cur.offsetY < sum.minY) sum.minY = cur.offsetY;
    if (cur.offsetY > sum.maxY) sum.maxY = cur.offsetY;

    return sum;
  }, {});

  console.log(minMaxValues);
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 115 135'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      ref={ref}>
      {/* Render axis lines */}
      {/* <AxisLines startX={GRAPH_START_X} startY={GRAPH_START_Y} /> */}

      {/* Render horizontal grid lines */}
      <HorizontalLines startX={GRAPH_START_X} startY={GRAPH_START_Y} />

      {/* Render horizontal lines text */}
      <HorizontalLinesText startX={GRAPH_START_X} graphRatio={graphRatio} minMaxValues={minMaxValues} />

      {/* Render vertical grid lines */}
      <VerticalLines startX={GRAPH_START_X} startY={GRAPH_START_Y} />

      {/* Render vertical lines text */}
      <VerticalLinesText
        startX={GRAPH_START_X}
        startY={GRAPH_START_Y}
        graphRatio={graphRatio}
        minMaxValues={minMaxValues}
      />

      {/* Render dots */}
      <Dots
        chartData={chartData}
        startX={GRAPH_START_X}
        startY={GRAPH_START_Y}
        graphRatio={graphRatio}
        minMaxValues={minMaxValues}
      />

      {/* Render current dot  */}
      <CurrentDot
        startX={GRAPH_START_X}
        startY={GRAPH_START_Y}
        currentDot={currentDot}
        minMaxValues={minMaxValues}
      />
    </svg>
  );
};

export default PlaysSpinChart;
