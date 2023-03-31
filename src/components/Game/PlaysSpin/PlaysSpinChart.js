import React, { useState, useLayoutEffect, useRef } from 'react';
import { getPitchColorByName } from 'utils';
import cl from './PlaysSpin.module.scss';
import { useSelector } from 'react-redux';
import Lines from './Chart/Lines';
import LinesText from './Chart/LinesText';
import Dots from './Chart/Dots';

const GRAPH_START_X = 15;
const GRAPH_START_Y = 10;

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
    coordX + 15 > GRAPH_START_X &&
    coordY + 10 > GRAPH_START_Y &&
    coordX + GRAPH_START_X < 115 &&
    coordY + GRAPH_START_Y < 110;

  const verticalLineY2Coord = Math.max((startY + 100) * (currentDotRadius / 5.05), startY + 100 - coordY);
  const horizontalLineX1Coord = Math.min(startX / (currentDotRadius / 5.05), coordX + startX);
  return (
    <>
      {isCurrentDot ? (
        <>
          {/* Axis lines projections */}
          {/* Vertical */}
          <line
            x1={coordX + startX}
            y1={startY + 100 - coordY}
            x2={coordX + startX}
            y2={verticalLineY2Coord}
            className={cl.currentDotLine}
          />
          {/* Horizontal */}
          <line
            x1={horizontalLineX1Coord}
            y1={startY + 100 - coordY}
            x2={coordX + startX}
            y2={startY + 100 - coordY}
            className={cl.currentDotLine}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

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
    coordX + 15 > GRAPH_START_X &&
    coordY + 10 > GRAPH_START_Y &&
    coordX + GRAPH_START_X < 115 &&
    coordY + GRAPH_START_Y < 110;
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

const PlaysSpinChart = ({ chartData, currentDot }) => {
  const [graphRatio] = useState(1);

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
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 115 135'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      ref={ref}>
      {/* Render horizontal and vertical grid lines */}
      <Lines startX={GRAPH_START_X} startY={GRAPH_START_Y} />

      {/* Lines text */}
      <LinesText
        startX={GRAPH_START_X}
        startY={GRAPH_START_Y}
        graphRatio={graphRatio}
        minMaxValues={minMaxValues}
      />

      {/* Current dot lines  */}
      <CurrentDotLines
        startX={GRAPH_START_X}
        startY={GRAPH_START_Y}
        currentDot={currentDot}
        minMaxValues={minMaxValues}
      />

      {/* Dots */}
      <Dots chartData={chartData} startX={GRAPH_START_X} startY={GRAPH_START_Y} minMaxValues={minMaxValues} />

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
