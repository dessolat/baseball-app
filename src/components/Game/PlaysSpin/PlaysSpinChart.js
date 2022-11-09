import React, { useState, useLayoutEffect } from 'react';

const DOT_RADIUS = 3;
const COLORS = {
  0: '#1A4C96',
  1: 'red',
  2: 'green',
  3: 'olive'
};

const PlaysSpinChart = ({ chartData, currentDot }) => {
  // const { offset_x, offset_y } = pitch || 0;

  const [currentDotRadius, setCurrentDotRadius] = useState(0);

  useLayoutEffect(() => {
    // if (pitch === null) return;

    setCurrentDotRadius(prev => (prev === 1 ? 0.99999 : 1));
    // eslint-disable-next-line
  }, [currentDot]);

  useLayoutEffect(() => {
    // if (pitch === null) return;

    currentDotRadius < 5 &&
      setTimeout(() => {
        setCurrentDotRadius(prev => (prev + 0.45 > 7.5 ? 7.5 : prev + 0.45));
      }, 10);

    // eslint-disable-next-line
  }, [currentDotRadius]);

  const isCurrentDot = currentDot.offsetX !== undefined;
  const currentCoordX = 50 + 50 * currentDot.offsetX;
  const currentCoordY = 50 - 50 * currentDot.offsetY;

  return (
    <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <line x1='49.5' y1='100' x2='49.5' stroke='#ACACAC' />
      <line y1='49.5' x2='100' y2='49.5' stroke='#ACACAC' />
      {chartData.map((dot, i) => {
        const coordX = 50 + 50 * dot.offsetX;
        const coordY = 50 - 50 * dot.offsetY;

        return (
          <circle
            key={i}
            cx={coordX}
            cy={coordY}
            r={DOT_RADIUS}
            fill={COLORS[dot.pitchType - 1]}
            stroke='black'
            strokeWidth='0.5'
          />
        );
      })}

      {isCurrentDot && (
        <circle
          cx={currentCoordX}
          cy={currentCoordY}
          r={currentDotRadius}
          fill={COLORS[currentDot.type - 1]}
          stroke='black'
          strokeWidth='0.5'
        />
      )}
    </svg>
  );
};

export default PlaysSpinChart;
