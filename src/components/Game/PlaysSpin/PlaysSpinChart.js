import React, { useState, useLayoutEffect } from 'react';
import cl from './PlaysSpin.module.scss'

const DOT_RADIUS = 3;
const GRAPH_START_X = 15;
const GRAPH_START_Y = 10;
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
    <svg width='100%' height='100%' viewBox='0 0 115 135' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* Render axis lines */}
      <line x1={GRAPH_START_X + 49.5} y1={GRAPH_START_Y + 0} x2={GRAPH_START_X + 49.5} y2={GRAPH_START_Y + 100} stroke='#ACACAC' />
      <line x1={GRAPH_START_X} y1={GRAPH_START_Y + 49.5} x2={GRAPH_START_X + 100} y2={GRAPH_START_Y + 49.5} stroke='#ACACAC' />

      {/* Render horizontal grid lines */}
      <line x1={GRAPH_START_X} y1={GRAPH_START_Y+0} x2={GRAPH_START_X + 100} y2={GRAPH_START_Y+0} stroke='#E3E1E1' stroke-dasharray='4 2' />
      <line x1={GRAPH_START_X} y1={GRAPH_START_Y+25} x2={GRAPH_START_X + 100} y2={GRAPH_START_Y+25} stroke='#E3E1E1' stroke-dasharray='4 2' />
      <line x1={GRAPH_START_X} y1={GRAPH_START_Y+75} x2={GRAPH_START_X + 100} y2={GRAPH_START_Y+75} stroke='#E3E1E1' stroke-dasharray='4 2' />
      <line x1={GRAPH_START_X} y1={GRAPH_START_Y+100} x2={GRAPH_START_X + 100} y2={GRAPH_START_Y+100} stroke='#E3E1E1' stroke-dasharray='4 2' />

      {/* Render horizontal lines text */}
      <text x={GRAPH_START_X - 15} y='15' stroke='black' textAnchor='middle' className={cl.graphTitle}>
       10
      </text>
      <text x={GRAPH_START_X - 15} y='40' stroke='black' textAnchor='middle' className={cl.graphTitle}>
       5
      </text>
      <text x={GRAPH_START_X - 15} y='65' stroke='black' textAnchor='middle' className={cl.graphTitle}>
       0
      </text>
      <text x={GRAPH_START_X - 15} y='90' stroke='black' textAnchor='middle' className={cl.graphTitle}>
       -5
      </text>
      <text x={GRAPH_START_X - 15} y='115' stroke='black' textAnchor='middle' className={cl.graphTitle}>
       -10
      </text>

      {/* Render vertical grid lines */}
      <line x1={GRAPH_START_X + 0} y1={GRAPH_START_Y} x2={GRAPH_START_X + 0} y2={GRAPH_START_Y+100} stroke='#E3E1E1' stroke-dasharray='4 2' />
      <line x1={GRAPH_START_X + 25} y1={GRAPH_START_Y} x2={GRAPH_START_X + 25} y2={GRAPH_START_Y+100} stroke='#E3E1E1' stroke-dasharray='4 2' />
      <line x1={GRAPH_START_X + 75} y1={GRAPH_START_Y} x2={GRAPH_START_X + 75} y2={GRAPH_START_Y+100} stroke='#E3E1E1' stroke-dasharray='4 2' />
      <line x1={GRAPH_START_X + 100} y1={GRAPH_START_Y} x2={GRAPH_START_X + 100} y2={GRAPH_START_Y+100} stroke='#E3E1E1' stroke-dasharray='4 2' />

			{/* Render vertical lines text */}
      <text x={GRAPH_START_X + 0} y={GRAPH_START_Y+117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
       10
      </text>
      <text x={GRAPH_START_X + 25} y={GRAPH_START_Y+117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
       5
      </text>
      <text x={GRAPH_START_X + 50} y={GRAPH_START_Y+117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
       0
      </text>
      <text x={GRAPH_START_X + 75} y={GRAPH_START_Y+117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
       -5
      </text>
      <text x={GRAPH_START_X + 100} y={GRAPH_START_Y+117} stroke='black' textAnchor='middle' className={cl.graphTitle}>
       -10
      </text>

      {/* Render dots */}
      {chartData.map((dot, i) => {
        const coordX = 50 + 50 * dot.offsetX;
        const coordY = 50 - 50 * dot.offsetY;

        return (
          <circle
            key={i}
            cx={coordX + GRAPH_START_X}
            cy={coordY + GRAPH_START_Y}
            r={DOT_RADIUS}
            fill={COLORS[dot.pitchType - 1]}
            stroke='black'
            strokeWidth='0.5'
          />
        );
      })}

      {/* Render current dot  */}
      {isCurrentDot && (
        <circle
          cx={currentCoordX + GRAPH_START_X}
          cy={currentCoordY + GRAPH_START_Y}
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
