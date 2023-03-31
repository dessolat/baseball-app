import React, { useState, useRef } from 'react';
import Lines from './Chart/Lines';
import LinesText from './Chart/LinesText';
import Dots from './Chart/Dots';
import CurrentDotLines from './Chart/CurrentDotLines';
import CurrentDot from './Chart/CurrentDot';

const GRAPH_START_X = 15;
const GRAPH_START_Y = 10;

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
