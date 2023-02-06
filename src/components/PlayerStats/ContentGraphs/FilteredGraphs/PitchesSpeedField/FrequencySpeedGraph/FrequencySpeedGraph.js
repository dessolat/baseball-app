import React, { Fragment } from 'react';
import cl from './FrequencySpeedGraph.module.scss';

const FrequencySpeedGraph = () => {
  const PARAMS = {
    GRAPH_WIDTH: 480,
    GRAPH_HEIGHT: 364,
    LEFT_VERTICAL_GRID_LINES_NUMBER: 5,
    RIGHT_VERTICAL_GRID_LINES_NUMBER: 5,
    VERTICAL_GRID_LINES_TOP: 0,
    VERTICAL_GRID_LINES_LEFT: 45,
    VERTICAL_GRID_LINES_HEIGHT: 300,
    // VERTICAL_GRID_LINES_HEIGHT: 325,
    // VERTICAL_GRID_LINES_HEIGHT: 443,
    GRAPH_ROWS_HEIGHT: 22,
    BETWEEN_ROWS_HEIGHT: 28
  };

  PARAMS.LEFT_VERTICAL_GRID_LINES_STEP = 255 / PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER;
  PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP = 185 / PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = { X: PARAMS.VERTICAL_GRID_LINES_LEFT + 230, Y: PARAMS.VERTICAL_GRID_LINES_TOP + 155 };
  // PARAMS.ZERO_COORDS = { X: PARAMS.VERTICAL_GRID_LINES_LEFT + 166, Y: PARAMS.VERTICAL_GRID_LINES_TOP + 209 };

  const dimensionsArr = [
    { title: 'Fastball (N Pitches)', frequency: 54.5, color: '#CE9587', speed: { min: 86, max: 91 } },
    { title: 'Slider (N Pitches)', frequency: 29.4, color: '#EBE8B0', speed: { min: 76, max: 82 } },
    { title: 'Curveball (N Pitches)', frequency: 16.1, color: '#CBC8E5', speed: { min: 51, max: 62 } }
  ];

  const frequenciesValues = dimensionsArr.reduce((sum, dimension) => {
    sum.push(dimension.frequency);
    return sum;
  }, []);

  const minSpeedValues = dimensionsArr.reduce((sum, dimension) => {
    sum.push(dimension.speed.min);
    return sum;
  }, []);
  const maxSpeedValues = dimensionsArr.reduce((sum, dimension) => {
    sum.push(dimension.speed.max);
    return sum;
  }, []);

  // const maxFrequency = Math.max(...frequenciesValues);
  const minSpeed = Math.min(...minSpeedValues);
  const maxSpeed = Math.max(...maxSpeedValues);

  const maxFrequencyLineValue = 100;
  // const maxFrequencyLineValue = (Math.floor(maxFrequency / 10) + 1) * 10;
  const minSpeedLineValue = Math.ceil(minSpeed / 10 - 1) * 10;
  const maxSpeedLineValue = Math.ceil(maxSpeed / 10) * 10;

  const bottomLeftNumbers = [];
  for (let i = 1; i <= PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER; i++) {
    bottomLeftNumbers.push(((maxFrequencyLineValue / PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER) * i).toFixed(0));
  }
  const bottomRightNumbers = [];
  for (let i = 0; i < PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER; i++) {
    bottomRightNumbers.push(
      Math.round(
        minSpeedLineValue +
          ((maxSpeedLineValue - minSpeedLineValue) / (PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER - 1)) * i
      )
    );
  }

  const leftScaleMultiplier = 165 / maxFrequencyLineValue;
  const rightScaleMultiplier = 198 / (maxSpeedLineValue - minSpeedLineValue);
  return (
    <svg
      viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
      // viewBox='0 0 480 535'
      xmlns='http://www.w3.org/2000/svg'
      className={cl.graph}
      preserveAspectRatio='none'
    >
      {/* Main layout rendering */}
      {/* Vertical center grid line */}
      <line
        x1={PARAMS.ZERO_COORDS.X}
        y1={PARAMS.VERTICAL_GRID_LINES_TOP}
        x2={PARAMS.ZERO_COORDS.X}
        y2={PARAMS.VERTICAL_GRID_LINES_TOP + PARAMS.VERTICAL_GRID_LINES_HEIGHT}
        stroke='#ACACAC'
      />
      {/* Left side */}
      {bottomLeftNumbers.map((number, i) => (
        <Fragment key={i}>
          {/* Left vertical line */}
          <line
            x1={PARAMS.ZERO_COORDS.X - PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * (i + 1)}
            y1={PARAMS.VERTICAL_GRID_LINES_TOP}
            x2={PARAMS.ZERO_COORDS.X - PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * (i + 1)}
            y2={PARAMS.VERTICAL_GRID_LINES_TOP + PARAMS.VERTICAL_GRID_LINES_HEIGHT}
            stroke='#E3E1E1'
            strokeDasharray='4 2'
          />
          {/* Bottom-left number */}
          <text
            x={PARAMS.ZERO_COORDS.X - PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * (i + 1)}
            y={PARAMS.ZERO_COORDS.Y + 163}
            // y={PARAMS.ZERO_COORDS.Y + 254}
            className={cl.bottomNumber}>
            {number}
          </text>
        </Fragment>
      ))}

      {/* Bottom-left unit measurement */}
      {/* <text
          x={
            PARAMS.ZERO_COORDS.X -
            (PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * (PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER + 1) + 17 / 2) +
            10
          }
          y={PARAMS.ZERO_COORDS.Y + 163}
          // y={PARAMS.ZERO_COORDS.Y + 254}
          className={cl.bottomNumber}>
          %
        </text> */}
      {/* Left side title */}
      <text
        x={PARAMS.ZERO_COORDS.X / 2}
        y={PARAMS.ZERO_COORDS.Y + 194}
        // y={PARAMS.ZERO_COORDS.Y + 280}
        className={cl.sideTitle}>
        Pitch Type, %
      </text>
      {/* Right side */}
      {bottomRightNumbers.map((number, i) => (
        <Fragment key={i}>
          {/* Right vertical line */}
          <line
            x1={PARAMS.ZERO_COORDS.X + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * (i + 1)}
            y1={PARAMS.VERTICAL_GRID_LINES_TOP}
            x2={PARAMS.ZERO_COORDS.X + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * (i + 1)}
            y2={PARAMS.VERTICAL_GRID_LINES_TOP + PARAMS.VERTICAL_GRID_LINES_HEIGHT}
            stroke='#E3E1E1'
            strokeDasharray='4 2'
          />
          {/* Bottom-right number (only odd numbers rendered) */}
          {i < 4 && (
            <text
              x={PARAMS.ZERO_COORDS.X + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * (i + 1)}
              y={PARAMS.ZERO_COORDS.Y + 163}
              // y={PARAMS.ZERO_COORDS.Y + 254}
              className={cl.bottomNumber}>
              {number}
            </text>
          )}
        </Fragment>
      ))}

      {/* Right side title */}
      <text
        x={PARAMS.ZERO_COORDS.X + (PARAMS.GRAPH_WIDTH - PARAMS.ZERO_COORDS.X) / 2}
        y={PARAMS.ZERO_COORDS.Y + 194}
        className={cl.sideTitle}>
        Speed, mph
      </text>

      {/* Rows rendering */}
      {dimensionsArr.map((measure, i) => {
        const yCoord =
          PARAMS.ZERO_COORDS.Y -
          PARAMS.GRAPH_ROWS_HEIGHT / 2 -
          (dimensionsArr.length - (i + 1)) * (PARAMS.BETWEEN_ROWS_HEIGHT + PARAMS.GRAPH_ROWS_HEIGHT) +
          (PARAMS.BETWEEN_ROWS_HEIGHT / 2 + PARAMS.GRAPH_ROWS_HEIGHT / 2) * (dimensionsArr.length - 1);

        const leftSideWidth = PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER;
        const leftEdgeLine = PARAMS.ZERO_COORDS.X - leftSideWidth;
        const leftValueCoef = leftSideWidth / 100;

        const rightSideWidth =
          PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * (PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER - 1);
        const rightEdgeLine = PARAMS.ZERO_COORDS.X + rightSideWidth + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP;
        const rightValueCoef = rightSideWidth / (maxSpeedLineValue - minSpeedLineValue);
        const rightFirstLine = PARAMS.ZERO_COORDS.X + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP;
        return (
          <Fragment key={i}>
            {/* Left chart row */}
            {/* Row background */}
            <rect
              x={leftEdgeLine}
              y={yCoord}
              width={leftSideWidth}
              // width={leftScaleMultiplier * measure.frequency}
              height={PARAMS.GRAPH_ROWS_HEIGHT}
              fill='#EAEAEA'
              opacity='.5'
            />
            {/* Row body */}
            <rect
              x={leftEdgeLine + leftValueCoef * (100 - measure.frequency)}
              // x={PARAMS.ZERO_COORDS.X - leftScaleMultiplier * measure.frequency}
              y={yCoord}
              width={leftValueCoef * measure.frequency}
              // width={leftScaleMultiplier * measure.frequency}
              height={PARAMS.GRAPH_ROWS_HEIGHT}
              fill={measure.color}
              opacity='.7'
            />
            {/* Row value */}
            <text
              x={PARAMS.ZERO_COORDS.X - 5}
              y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 + 5}
              className={cl.innerValue}>
              {Math.round(measure.frequency) + '%'}
            </text>
            {/* Row title */}
            <text
              x={leftEdgeLine + 5}
              y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 + 5}
              textAnchor='end'
              className={cl.innerText}>
              {measure.title}
            </text>
            {/* Right chart row */}
            {/* Horizontal grid line */}
            <line
              x1={PARAMS.ZERO_COORDS.X}
              y1={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2}
              x2={
                PARAMS.ZERO_COORDS.X +
                PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER * PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP +
                4
              }
              y2={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2}
              stroke='#ACACAC'
            />
            {/* Row title */}
            <text
              x={
                rightFirstLine +
                (measure.speed.min - minSpeedLineValue) * rightValueCoef +
                (rightValueCoef * (measure.speed.max - measure.speed.min)) / 2
              }
              y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 - 18}
              textAnchor='middle'
              className={cl.rightTextTitle}>
              {(measure.speed.min + measure.speed.max) / 2}
            </text>
            {/* Row body */}
            <rect
              x={rightFirstLine + (measure.speed.min - minSpeedLineValue) * rightValueCoef}
              y={yCoord}
              width={rightValueCoef * (measure.speed.max - measure.speed.min)}
              height={PARAMS.GRAPH_ROWS_HEIGHT}
              fill={measure.color}
							opacity='.7'
            />
            {/* Vertical slice line */}
						<line
              x1={rightFirstLine +
                (measure.speed.min - minSpeedLineValue) * rightValueCoef +
                (rightValueCoef * (measure.speed.max - measure.speed.min)) / 2}
              y1={yCoord - 4}
              x2={
                rightFirstLine +
                (measure.speed.min - minSpeedLineValue) * rightValueCoef +
                (rightValueCoef * (measure.speed.max - measure.speed.min)) / 2
              }
              y2={yCoord + PARAMS.GRAPH_ROWS_HEIGHT + 4}
              stroke='#000000'
							strokeWidth='1'
            />
          </Fragment>
        );
      })}
    </svg>
  );
};

export default FrequencySpeedGraph;
