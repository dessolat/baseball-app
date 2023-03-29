import React, { Fragment } from 'react';
import { getPitchColorByName } from 'utils';
import cl from './FrequencySpeedGraph.module.scss';

const PARAMS = {
  GRAPH_WIDTH: 480,
  GRAPH_HEIGHT: 364,
  LEFT_VERTICAL_GRID_LINES_NUMBER: 5,
  RIGHT_VERTICAL_GRID_LINES_NUMBER: 5,
  VERTICAL_GRID_LINES_TOP: 0,
  VERTICAL_GRID_LINES_LEFT: 45,
  VERTICAL_GRID_LINES_HEIGHT: 300,
  GRAPH_ROWS_HEIGHT: 22,
  BETWEEN_ROWS_HEIGHT: 28
};

const Rows = ({ maxSpeedLineValue, minSpeedLineValue, relValuesData, totalPitches }) => (
  <>
    {/* Rows rendering */}
    {Object.entries(relValuesData)
      .sort((a, b) => (a[1].count > b[1].count ? -1 : 1))
      .map((measure, i, thisArr) => {
        const yCoord =
          PARAMS.ZERO_COORDS.Y -
          PARAMS.GRAPH_ROWS_HEIGHT / 2 -
          (thisArr.length - (i + 1)) * (PARAMS.BETWEEN_ROWS_HEIGHT + PARAMS.GRAPH_ROWS_HEIGHT) +
          (PARAMS.BETWEEN_ROWS_HEIGHT / 2 + PARAMS.GRAPH_ROWS_HEIGHT / 2) * (thisArr.length - 1);

        const leftSideWidth = PARAMS.LEFT_VERTICAL_GRID_LINES_STEP * PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER;
        const leftEdgeLine = PARAMS.ZERO_COORDS.X - leftSideWidth;
        const leftValueCoef = leftSideWidth / 100;

        const rightSideWidth =
          PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP * (PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER - 1);
        const rightEdgeLine = PARAMS.ZERO_COORDS.X + rightSideWidth + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP;
        const rightValueCoef = rightSideWidth / (maxSpeedLineValue - minSpeedLineValue);
        const rightFirstLine = PARAMS.ZERO_COORDS.X + PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP;

        const measureFrequency = (measure[1].count * 100) / totalPitches;
        const minSpeed = measure[1].avgSpeed - measure[1].skoSpeed;
        const maxSpeed = measure[1].avgSpeed + measure[1].skoSpeed;
        return (
          <Fragment key={i}>
            {/* Left chart row */}
            {/* Row background */}
            <rect
              x={leftEdgeLine}
              y={yCoord}
              width={leftSideWidth}
              height={PARAMS.GRAPH_ROWS_HEIGHT}
              fill='#EAEAEA'
              opacity='.5'
            />
            {/* Row body */}
            <rect
              x={leftEdgeLine + leftValueCoef * (100 - measureFrequency)}
              y={yCoord}
              width={leftValueCoef * measureFrequency}
              height={PARAMS.GRAPH_ROWS_HEIGHT}
              fill={getPitchColorByName(measure[0])}
              opacity='.7'
              style={{ transition: 'x .3s, width .3s' }}
            />
            {/* Row value */}
            <text
              x={PARAMS.ZERO_COORDS.X - 5}
              y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 + 5}
              className={cl.innerValue}>
              {+measureFrequency.toFixed(2) + '%'}
            </text>
            {/* Row title */}
            <text
              x={leftEdgeLine + 5}
              y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 + 5}
              textAnchor='end'
              className={cl.innerText}>
              {`${measure[0]} (${measure[1].count} / ${totalPitches} pitches)`}
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
                (minSpeed - minSpeedLineValue) * rightValueCoef +
                (rightValueCoef * (maxSpeed - minSpeed)) / 2
              }
              y={yCoord + PARAMS.GRAPH_ROWS_HEIGHT / 2 - 18}
              textAnchor='middle'
              className={cl.rightTextTitle}>
              {+((minSpeed + maxSpeed) / 2).toFixed(2)}
            </text>
            {/* Row body */}
            <rect
              x={rightFirstLine + (minSpeed - minSpeedLineValue) * rightValueCoef}
              y={yCoord}
              width={rightValueCoef * (maxSpeed - minSpeed)}
              height={PARAMS.GRAPH_ROWS_HEIGHT}
              fill={getPitchColorByName(measure[0])}
              opacity='.7'
              style={{ transition: 'x .3s, width .3s' }}
            />
            {/* Vertical slice line */}
            <line
              x1={
                rightFirstLine +
                (minSpeed - minSpeedLineValue) * rightValueCoef +
                (rightValueCoef * (maxSpeed - minSpeed)) / 2
              }
              y1={yCoord - 4}
              x2={
                rightFirstLine +
                (minSpeed - minSpeedLineValue) * rightValueCoef +
                (rightValueCoef * (maxSpeed - minSpeed)) / 2
              }
              y2={yCoord + PARAMS.GRAPH_ROWS_HEIGHT + 4}
              stroke='#000000'
              strokeWidth='1'
            />
          </Fragment>
        );
      })}
  </>
);

const FrequencySpeedGraph = ({ data, relValuesData }) => {
  PARAMS.LEFT_VERTICAL_GRID_LINES_STEP = 255 / PARAMS.LEFT_VERTICAL_GRID_LINES_NUMBER;
  PARAMS.RIGHT_VERTICAL_GRID_LINES_STEP = 185 / PARAMS.RIGHT_VERTICAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = { X: PARAMS.VERTICAL_GRID_LINES_LEFT + 230, Y: PARAMS.VERTICAL_GRID_LINES_TOP + 155 };

  for (let pitchName in relValuesData) {
    const { speeds, count } = relValuesData[pitchName];

    // Avg speed
    const avgSpeed = speeds.reduce((sum, curSpeed) => sum + curSpeed, 0) / speeds.length;
    relValuesData[pitchName].avgSpeed = avgSpeed;

    // Sko speed
    const sumDiffSpeeds = speeds.reduce((sum, curSpeed) => sum + (curSpeed - avgSpeed) ** 2, 0);
    const sumDiffSpeedsAvg = sumDiffSpeeds / count;
    const skoSpeed = Math.sqrt(sumDiffSpeedsAvg);
    relValuesData[pitchName].skoSpeed = skoSpeed;
  }

  const minMaxSpeeds = data.reduce(
    (sum, pitch, index) => {
      const { speed } = pitch.pitch_info;
      const mphSpeed = speed * 2.24;

      if (index === 0) {
        sum.minSpeed = mphSpeed;
        sum.maxSpeed = mphSpeed;

        return sum;
      }

      if (mphSpeed < sum.minSpeed) sum.minSpeed = mphSpeed;
      if (mphSpeed > sum.maxSpeed) sum.maxSpeed = mphSpeed;

      return sum;
    },
    { minSpeed: 0, maxSpeed: 0 }
  );

  const { minSpeed, maxSpeed } = minMaxSpeeds;

  const maxFrequencyLineValue = 100;

  const minSpeedLineValue = Math.ceil(minSpeed / 10 - 1) * 10;
  const maxSpeedLineValue = Math.ceil(maxSpeed / 10 + 0) * 10;

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

  return (
    <svg
      viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
      xmlns='http://www.w3.org/2000/svg'
      className={cl.graph}
      preserveAspectRatio='none'>
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
            className={cl.bottomNumber}>
            {number}
          </text>
        </Fragment>
      ))}

      {/* Left side title */}
      <text
        x={PARAMS.ZERO_COORDS.X / 2}
        y={PARAMS.ZERO_COORDS.Y + 194}
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

      <Rows
        relValuesData={relValuesData}
        totalPitches={data.length}
        maxSpeedLineValue={maxSpeedLineValue}
        minSpeedLineValue={minSpeedLineValue}
      />
    </svg>
  );
};

export default FrequencySpeedGraph;
