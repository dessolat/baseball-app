import React, { Fragment } from 'react';
import cl from './FrequencySpeedGraph.module.scss';

const FrequencySpeedGraph = () => {
  const PARAMS = {
    LEFT_VERTICAL_GRID_LINES_NUMBER: 5,
    RIGHT_VERTICAL_GRID_LINES_NUMBER: 7,
    VERTICAL_GRID_LINES_TOP: 0,
    VERTICAL_GRID_LINES_LEFT: 45,
    VERTICAL_GRID_LINES_HEIGHT: 300,
    // VERTICAL_GRID_LINES_HEIGHT: 325,
    // VERTICAL_GRID_LINES_HEIGHT: 443,
    GRAPH_ROWS_HEIGHT: 22,
    BETWEEN_ROWS_HEIGHT: 28
  };

  PARAMS.LEFT_VERTICAL_GRID_LINES_STEP = 166 / PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER;
  PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP = 231 / PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = { X: PARAMS.VERTICAL_GRID_LINES_LEFT + 166, Y: PARAMS.VERTICAL_GRID_LINES_TOP + 155 };
  // PARAMS.ZERO_COORDS = { X: PARAMS.VERTICAL_GRID_LINES_LEFT + 166, Y: PARAMS.VERTICAL_GRID_LINES_TOP + 209 };

  const dimensionsArr = [
    { title: 'Fastball', frequency: 54.5, color: '#1A4C96', speed: { min: 86, max: 90 } },
    { title: 'Slider', frequency: 29.4, color: '#FEAB01', speed: { min: 76, max: 79 } },
    { title: 'Curveball', frequency: 16.1, color: '#E2001C', speed: { min: 72, max: 76 } }
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

  const maxFrequency = Math.max(...frequenciesValues);
  const minSpeed = Math.min(...minSpeedValues);
  const maxSpeed = Math.max(...maxSpeedValues);

  const maxFrequencyLineValue = (Math.floor(maxFrequency / 10) + 1) * 10;
  const minSpeedLineValue = Math.floor(minSpeed / 10 - 1) * 10;
  const maxSpeedLineValue = Math.ceil(maxSpeed / 10) * 10;

  const bottomLeftNumbers = [];
  for (let i = 1; i <= PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER; i++) {
    bottomLeftNumbers.push(((maxFrequencyLineValue / PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER) * i).toFixed(0));
  }
  const bottomRightNumbers = [];
  for (let i = 0; i < PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER; i++) {
    bottomRightNumbers.push(
      Math.floor(
        minSpeedLineValue +
          ((maxSpeedLineValue - minSpeedLineValue) / (PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER - 1)) * i
      )
    );
  }

  const leftScaleMultiplier = 165 / maxFrequencyLineValue;
  const rightScaleMultiplier = 198 / (maxSpeedLineValue - minSpeedLineValue);
  return (
      <svg
        viewBox='0 0 480 364'
        // viewBox='0 0 480 535'
        xmlns='http://www.w3.org/2000/svg'
        className={cl.graph}
        // preserveAspectRatio='none'
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
              x={PARAMS.ZERO_COORDS.X - (PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * (i + 1) + 17 / 2)}
              y={PARAMS.ZERO_COORDS.Y + 163}
              // y={PARAMS.ZERO_COORDS.Y + 254}
              className={cl.bottomNumber}>
              {number}
            </text>
          </Fragment>
        ))}
        {/* Bottom-left unit measurement */}
        <text
          x={
            PARAMS.ZERO_COORDS.X -
            (PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * (PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER + 1) + 17 / 2) +
            10
          }
          y={PARAMS.ZERO_COORDS.Y + 163}
          // y={PARAMS.ZERO_COORDS.Y + 254}
          className={cl.bottomNumber}>
          %
        </text>
        {/* Left side title */}
        <text
          x={
            PARAMS.ZERO_COORDS.X -
            (PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER + 17 / 2) -
            7
          }
          y={PARAMS.ZERO_COORDS.Y + 189}
          // y={PARAMS.ZERO_COORDS.Y + 280}
          className={cl.sideTitle}>
          Pitch Type frequency
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
            {!(i % 2) && (
              <text
                x={PARAMS.ZERO_COORDS.X + (PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * (i + 1) - 17 / 2)}
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
          x={
            PARAMS.ZERO_COORDS.X +
            (PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER) / 2 -
            32
          }
          y={PARAMS.ZERO_COORDS.Y + 189}
          // y={PARAMS.ZERO_COORDS.Y + 280}
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

          return (
            <Fragment key={i}>
              {/* Left chart row */}
              {/* Row value */}
              <text
                x={PARAMS.ZERO_COORDS.X - leftScaleMultiplier * measure.frequency - 46}
                y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 + 5}
                className={cl.innerText}>
                {measure.frequency + '%'}
              </text>
              {/* Row title */}
              <text
                x={PARAMS.ZERO_COORDS.X - 10}
                y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 - 18}
                textAnchor='end'
                className={cl.innerText}>
                {measure.title}
              </text>
              {/* Row body */}
              <rect
                x={PARAMS.ZERO_COORDS.X - leftScaleMultiplier * measure.frequency}
                y={yCoord}
                width={leftScaleMultiplier * measure.frequency}
                height={PARAMS.GRAPH_ROWS_HEIGHT}
                fill={measure.color}
              />
              {/* Right chart row */}
              {/* Horizontal grid line */}
              <line
                x1={PARAMS.ZERO_COORDS.X}
                y1={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2}
                x2={PARAMS.ZERO_COORDS.X + 243}
                y2={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2}
                stroke='#ACACAC'
              />
              {/* Row title */}
              <text
                x={
                  PARAMS.ZERO_COORDS.X +
                  rightScaleMultiplier * (measure.speed.min - minSpeedLineValue) +
                  PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP +
                  (rightScaleMultiplier * (measure.speed.max - measure.speed.min)) / 2
                }
                y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 - 18}
                textAnchor='middle'
                className={cl.innerText}>
                {measure.speed.min}-{measure.speed.max}
              </text>
              {/* Row body */}
              <rect
                x={
                  PARAMS.ZERO_COORDS.X +
                  rightScaleMultiplier * (measure.speed.min - minSpeedLineValue) +
                  PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP
                }
                y={yCoord}
                width={rightScaleMultiplier * (measure.speed.max - measure.speed.min)}
                height={PARAMS.GRAPH_ROWS_HEIGHT}
                fill={measure.color}
              />
            </Fragment>
          );
        })}
      </svg>
  );
};

export default FrequencySpeedGraph;
