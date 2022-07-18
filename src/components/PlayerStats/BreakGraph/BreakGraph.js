import React, { Fragment } from 'react';
import cl from './BreakGraph.module.scss';

const BreakGraph = () => {
  const PARAMS = {
    VERTICAL_GRID_LINES_NUMBER: 8,
    VERTICAL_GRID_LINES_TOP: 10,
    VERTICAL_GRID_LINES_LEFT: 75,
    VERTICAL_GRID_LINES_HEIGHT: 463,
    HORIZONTAL_GRID_LINES_NUMBER: 14,
    HORIZONTAL_GRID_LINES_WIDTH: 265
  };

  PARAMS.VERTICAL_GRID_LINES_STEP = PARAMS.HORIZONTAL_GRID_LINES_WIDTH / PARAMS.VERTICAL_GRID_LINES_NUMBER;
  PARAMS.HORIZONTAL_GRID_LINES_STEP = PARAMS.VERTICAL_GRID_LINES_HEIGHT / PARAMS.HORIZONTAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = {
    X: PARAMS.VERTICAL_GRID_LINES_LEFT + PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2,
    Y: PARAMS.VERTICAL_GRID_LINES_TOP + PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2
  };

  const dimensionsArr = [
    { title: 'Fastball', cm: { x: -21, y: 37 }, r: 16, color: '#1A4C96' },
    { title: 'Slider', cm: { x: 17, y: 11 }, r: 15, color: '#FEAB01' },
    { title: 'Curveball', cm: { x: 21, y: -12 }, r: 18, color: '#E2001C' }
  ];
	
  const minHorizontalBreakValue = 0;
  const maxHorizontalBreakValue = 40;
  const minVerticalBreakValue = 0;
  const maxVerticalBreakValue = 70;

  const bottomNumbers = [];
  for (let i = 1; i <= PARAMS.VERTICAL_GRID_LINES_NUMBER / 2; i++) {
    bottomNumbers.push(
      ((maxHorizontalBreakValue - minHorizontalBreakValue) / (PARAMS.VERTICAL_GRID_LINES_NUMBER / 2)) * i
    );
  }
  const leftNumbers = [];
  for (let i = 1; i <= PARAMS.HORIZONTAL_GRID_LINES_NUMBER / 2; i++) {
    leftNumbers.push(
      ((maxVerticalBreakValue - minVerticalBreakValue) / (PARAMS.HORIZONTAL_GRID_LINES_NUMBER / 2)) * i
    );
  }

  const xScaleMultiplier =
    PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2 / (maxHorizontalBreakValue - minHorizontalBreakValue);
  const yScaleMultiplier =
    PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2 / (maxVerticalBreakValue - minVerticalBreakValue);
  return (
      <svg
        viewBox='0 0 350 548'
        xmlns='http://www.w3.org/2000/svg'
        className={cl.graph}
        // preserveAspectRatio='none'
				>
        {/* Main layout rendering */}
        {/* Vertical center grid line */}
        <line
          x1={PARAMS.ZERO_COORDS.X}
          y1={PARAMS.ZERO_COORDS.Y - PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2}
          x2={PARAMS.ZERO_COORDS.X}
          y2={PARAMS.ZERO_COORDS.Y + PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2}
          stroke='#ACACAC'
        />
        {/* Bottom title */}
        <text
          x={PARAMS.ZERO_COORDS.X}
          y={PARAMS.ZERO_COORDS.Y + PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2 + 55}
          textAnchor='middle'
          className={cl.sideTitle}>
          Horizontal break, cm
        </text>
        {/* Bottom center number */}
        <text x={PARAMS.ZERO_COORDS.X - 4} y={PARAMS.ZERO_COORDS.Y + 259} className={cl.bottomNumber}>
          0
        </text>
        {/* Horizontal center grid line */}
        <line
          x1={PARAMS.ZERO_COORDS.X - PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2}
          y1={PARAMS.ZERO_COORDS.Y}
          x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2}
          y2={PARAMS.ZERO_COORDS.Y}
          stroke='#ACACAC'
        />
        {/* Left side title */}
        <text
          x='0'
          y={PARAMS.ZERO_COORDS.Y + 5}
          transform='translate(-220, 315) rotate(-90)'
          className={cl.sideTitle}>
          Vertical break, cm
        </text>
        {/* Left center number */}
        <text
          x={PARAMS.ZERO_COORDS.X - PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2 - 26}
          y={PARAMS.ZERO_COORDS.Y + 5}
          className={cl.bottomNumber}>
          0
        </text>
        {/* Vartical lines + bottom numbers rendering */}
        {bottomNumbers.map((number, i) => (
          <Fragment key={i}>
            {/* Vertical lines */}
            <line
              x1={PARAMS.ZERO_COORDS.X - PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1)}
              y1={PARAMS.ZERO_COORDS.Y - PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2}
              x2={PARAMS.ZERO_COORDS.X - PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1)}
              y2={PARAMS.ZERO_COORDS.Y + PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2}
              stroke='#E3E1E1'
              strokeDasharray='4 2'
            />
            <line
              x1={PARAMS.ZERO_COORDS.X + PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1)}
              y1={PARAMS.ZERO_COORDS.Y - PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2}
              x2={PARAMS.ZERO_COORDS.X + PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1)}
              y2={PARAMS.ZERO_COORDS.Y + PARAMS.VERTICAL_GRID_LINES_HEIGHT / 2}
              stroke='#E3E1E1'
              strokeDasharray='4 2'
            />
            {/* Bottom numbers */}
            <text
              x={PARAMS.ZERO_COORDS.X - (PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1) + 17 / 2)}
              y={PARAMS.ZERO_COORDS.Y + 259}
              className={cl.bottomNumber}>
              {number}
            </text>
            <text
              x={PARAMS.ZERO_COORDS.X + (PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1) - 17 / 2)}
              y={PARAMS.ZERO_COORDS.Y + 259}
              className={cl.bottomNumber}>
              {number}
            </text>
          </Fragment>
        ))}
        {/* Horizontal lines + left numbers rendering */}
        {leftNumbers.map((number, i) => (
          <Fragment key={i}>
            {/* Horizontal lines */}
            <line
              x1={PARAMS.ZERO_COORDS.X - PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2}
              y1={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
              x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2}
              y2={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
              stroke='#E3E1E1'
              strokeDasharray='4 2'
            />
            <line
              x1={PARAMS.ZERO_COORDS.X - PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2}
              y1={PARAMS.ZERO_COORDS.Y + PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
              x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2}
              y2={PARAMS.ZERO_COORDS.Y + PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
              stroke='#E3E1E1'
              strokeDasharray='4 2'
            />
            {/* Left numbers */}
            <text
              x={PARAMS.ZERO_COORDS.X - PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2 - 31}
              y={PARAMS.ZERO_COORDS.Y - PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1) + 5}
              className={cl.bottomNumber}>
              {number}
            </text>
            <text
              x={PARAMS.ZERO_COORDS.X - PARAMS.HORIZONTAL_GRID_LINES_WIDTH / 2 - 31}
              y={PARAMS.ZERO_COORDS.Y + PARAMS.VERTICAL_GRID_LINES_STEP * (i + 1) + 5}
              className={cl.bottomNumber}>
              {number}
            </text>
          </Fragment>
        ))}

        {/* Balls rendering */}
        {dimensionsArr.map((dimension, i) => (
          <Fragment key={i}>
						{/* Ball body */}
            <circle
              cx={PARAMS.ZERO_COORDS.X + xScaleMultiplier * dimension.cm.x}
              cy={PARAMS.ZERO_COORDS.Y - yScaleMultiplier * dimension.cm.y}
              r={dimension.r}
              fill={dimension.color}
            />
            {/* Ball title */}
            <text
              x={PARAMS.ZERO_COORDS.X + xScaleMultiplier * dimension.cm.x}
              y={PARAMS.ZERO_COORDS.Y - yScaleMultiplier * dimension.cm.y - dimension.r - 4}
              textAnchor='middle'
              className={cl.innerText}>
              {dimension.title}
            </text>{' '}
          </Fragment>
        ))}
      </svg>
  );
};

export default BreakGraph;
