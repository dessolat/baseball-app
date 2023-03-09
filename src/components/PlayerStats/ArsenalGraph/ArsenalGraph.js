import { Fragment } from 'react';
import classNames from 'classnames';
import { getPitchColorByName } from 'utils';
import cl from './ArsenalGraph.module.scss';
import BottomMarks from './BottomMarks';
import Dots from './Dots';
import HorizontalLinesAndNumbers from './HorizontalLinesAndNumbers';

const PARAMS = {
  HORIZONTAL_GRID_LINES_NUMBER: 5,
  HORIZONTAL_GRID_LINES_WIDTH: 1120,
  HORIZONTAL_GRID_LINES_LEFT: 45,
  HORIZONTAL_GRID_LINES_TOP: 65,
  GRAPH_LINES_HEIGHT: 322,
  LEFT_PADDING: 12,
  TOP_PADDING: 30
};

const HoveringLines = ({ PARAMS, leftMarks, pitchTypes, yScaleMultiplier }) => {
  const { leftValues, summary, availablePitchTypes } = leftMarks;
  const minValue = +leftValues[0];
  const totalColumns = Object.keys(summary).length;
  const columnStepX = PARAMS.HORIZONTAL_GRID_LINES_WIDTH / (totalColumns + 1);
  const columnStartX = PARAMS.HORIZONTAL_GRID_LINES_LEFT + columnStepX;
  const rowsStartY = PARAMS.HORIZONTAL_GRID_LINES_TOP + PARAMS.GRAPH_LINES_HEIGHT;
  const defaultTotalValues = availablePitchTypes.reduce((sum, type) => {
    sum[type] = [];
    return sum;
  }, {});

  const totalValues = availablePitchTypes.reduce((sum, type) => {
    const values = Object.values(summary).map(obj => obj[type]);
    sum[type] = values;
    return sum;
  }, defaultTotalValues);
  return (
    <>
      {Object.entries(totalValues).map(([type, values], i) => {
        const startPointX = columnStartX;
        const startPointY = rowsStartY - (values[0] - minValue) * yScaleMultiplier;
        let pathDest = `M${startPointX},${startPointY}`;
        values
          .slice(1)
          .forEach(
            (value, j, arr) =>
              (pathDest +=
                value === 0
                  ? ''
                  : `${arr[j - 1] === 0 ? 'M' : 'L'}${columnStartX + columnStepX * (j + 1)},${
                      rowsStartY - (value - minValue) * yScaleMultiplier
                    }`)
          );
        const pathClasses = classNames(cl.hoveringLine, {
          [cl.hoveringLine1]: i === 0,
          [cl.hoveringLine2]: i === 1,
          [cl.hoveringLine3]: i === 2,
          [cl.hoveringLine4]: i === 3,
          [cl.hoveringLine5]: i === 4,
          [cl.hoveringLine6]: i === 5
        });
        return (
          <path
            key={i}
            d={pathDest}
            fill='none'
            stroke='transparent'
            strokeWidth='12'
            className={pathClasses}
          />
        );
      })}
    </>
  );
};
const Lines = ({ PARAMS, leftMarks, pitchTypes, yScaleMultiplier, currentTimeInterval = null }) => {
  const { leftValues, summary, availablePitchTypes } = leftMarks;
  const minValue = +leftValues[0];
  const totalColumns = Object.keys(summary).length;
  const columnStepX = PARAMS.HORIZONTAL_GRID_LINES_WIDTH / (totalColumns + 1);
  const columnStartX = PARAMS.HORIZONTAL_GRID_LINES_LEFT + columnStepX;
  const rowsStartY = PARAMS.HORIZONTAL_GRID_LINES_TOP + PARAMS.GRAPH_LINES_HEIGHT;
  const defaultTotalValues = availablePitchTypes.reduce((sum, type) => {
    sum[type] = [];
    return sum;
  }, {});

  const totalValues = availablePitchTypes.reduce((sum, type) => {
    const values = Object.values(summary).map(obj => obj[type]);
    sum[type] = values;
    return sum;
  }, defaultTotalValues);
  return (
    <>
      {Object.entries(totalValues).map(([type, values], i) => {
        const startPointX = columnStartX;
        const startPointY = rowsStartY - (values[0] - minValue) * yScaleMultiplier;
        let pathDest = `M${startPointX},${startPointY}`;
        values
          .slice(1)
          .forEach(
            (value, j, arr) =>
              (pathDest +=
                value === 0
                  ? ''
                  : `${arr[j - 1] === 0 ? 'M' : 'L'}${columnStartX + columnStepX * (j + 1)},${
                      rowsStartY - (value - minValue) * yScaleMultiplier
                    }`)
          );
        const pathClasses = classNames(cl.graphPath, {
          [cl.graphPath1]: i === 0,
          [cl.graphPath2]: i === 1,
          [cl.graphPath3]: i === 2,
          [cl.graphPath4]: i === 3,
          [cl.graphPath5]: i === 4,
          [cl.graphPath6]: i === 5
        });

        const isPath = values.some(value => value !== 0);
        return (
          <Fragment key={type + '-' + currentTimeInterval}>
            {isPath && (
              <>
                <path
                  d={pathDest}
                  fill='none'
                  stroke={getPitchColorByName(type !== '-1' ? pitchTypes[type] : 'All Pitches')}
                  strokeWidth='2'
                  className={pathClasses}
                />
                <circle
                  cx={startPointX}
                  cy={startPointY}
                  r='3'
                  fill={getPitchColorByName(type !== '-1' ? pitchTypes[type] : 'All Pitches')}
                  className={pathClasses}
                />
              </>
            )}
            {values.slice(1).map(
              (value, j) =>
                value !== 0 ? (
                  <circle
                    key={type + '-' + j}
                    cx={columnStartX + columnStepX * (j + 1)}
                    cy={rowsStartY - (value - minValue) * yScaleMultiplier}
                    r='3'
                    fill={getPitchColorByName(type !== '-1' ? pitchTypes[type] : 'All Pitches')}
                    className={pathClasses}
                  />
                ) : (
                  <Fragment key={i + '-' + j}></Fragment>
                )

              // value !== 0 ? 'L' : 'M'}${columnStartX + columnStepX * (j + 1)},${
              //   rowsStartY - (value - minValue) * yScaleMultiplier
              // }`)
            )}
          </Fragment>
        );
      })}
    </>
  );
};

const ArsenalGraph = ({ filteredData, currentTimeInterval, currentPitchTypes, pitchTypes }) => {
  function getBottomMarks() {
    if (currentTimeInterval === 'Season') {
      const datesSet = filteredData.reduce((sum, { pitch_info: pitchInfo }) => {
        sum.add(pitchInfo.date.slice(0, 4));

        return sum;
      }, new Set());

      return Array.from(datesSet).sort((a, b) => (a > b ? 1 : -1));
    }
    if (currentTimeInterval === 'Month') {
      const datesSet = filteredData.reduce((sum, { pitch_info: pitchInfo }) => {
        sum.add(pitchInfo.date.slice(0, 7));

        return sum;
      }, new Set());

      return Array.from(datesSet).sort((a, b) => (a > b ? 1 : -1));
    }
    if (currentTimeInterval === 'Game') {
      const datesSet = filteredData.reduce((sum, { pitch_info: pitchInfo }) => {
        sum.add(pitchInfo.date);

        return sum;
      }, new Set());

      return Array.from(datesSet).sort((a, b) => (a > b ? 1 : -1));
    }

    return [];
  }
  function getLeftMarks(bottomMarks) {
    const availablePitchTypes = currentPitchTypes
      .filter(pitchType => pitchType.checked)
      .map(pitchType => pitchType.type);
    const filteredByAvailablePitchTypes = filteredData.filter(({ pitch_info: pitchInfo }) =>
      availablePitchTypes.includes(pitchInfo.pitch_type)
    );
    const minValueCorrection = 0,
      maxValueCorrection = 0;

    function getDefaultSumBy() {
      return bottomMarks.reduce((sum, timeInterval) => {
        sum[timeInterval] = {};
        return sum;
      }, {});
    }
    function getFilteredPitches(cur, sliceTo) {
      return filteredByAvailablePitchTypes.filter(
        ({ pitch_info }) => pitch_info.date.slice(0, sliceTo) === cur
      );
    }
    function getDefaultSumByType() {
      return availablePitchTypes.reduce((sum, type) => {
        sum[type] = 0;
        return sum;
      }, {});
    }
    function getSumByType(pitches, defaultSumByType) {
      return pitches.reduce((sum, { pitch_info }) => {
        const { pitch_type: pitchType } = pitch_info;

        sum[pitchType]++;
        availablePitchTypes.includes(-1) && sum['-1']++;

        return sum;
      }, defaultSumByType);
    }
    function getSumByTimeInterval(sliceTo) {
      const defaultSumByInterval = getDefaultSumBy();

      return bottomMarks.reduce((totalSum, interval) => {
        const pitches = getFilteredPitches(interval, sliceTo);
        const defaultSumByType = getDefaultSumByType();
        const sumByType = getSumByType(pitches, defaultSumByType);

        totalSum[interval] = sumByType;
        return totalSum;
      }, defaultSumByInterval);
    }
    function getMinMaxValues(sumByTimeInterval) {
      return Object.values(sumByTimeInterval).reduce((sum, interval) => {
        const intervalValues = Object.values(interval);
        const intervalValuesWOZero = intervalValues.filter(value => value !== 0);
        const maxValue = Math.max(...intervalValuesWOZero);
        const minValue = Math.min(...intervalValuesWOZero);

        if (sum.max < maxValue || sum.max === undefined) sum.max = maxValue;
        if (sum.min > minValue || sum.min === undefined) sum.min = minValue;

        return sum;
      }, {});
    }
    function getCorrectedMinMaxValues(minMaxValues) {
      return { min: minMaxValues.min + minValueCorrection, max: minMaxValues.max + maxValueCorrection };
    }
    function getValueDelta(correctedMinMaxValues) {
      return (correctedMinMaxValues.max - correctedMinMaxValues.min) / PARAMS.HORIZONTAL_GRID_LINES_NUMBER;
    }
    function getLeftValues(correctedMinMaxValues, valueDelta) {
      const result = [];
      for (let i = 0; i <= PARAMS.HORIZONTAL_GRID_LINES_NUMBER; i++) {
        const value = correctedMinMaxValues.min + valueDelta * i;
        result.push(Math.floor(value));
      }

      return result;
    }
    function getGraphSummaryData(sliceTo) {
      const summary = getSumByTimeInterval(sliceTo);
      const minMaxValues = getMinMaxValues(summary);
      const correctedMinMaxValues = getCorrectedMinMaxValues(minMaxValues);
      const valueDelta = getValueDelta(correctedMinMaxValues);
      const leftValues = getLeftValues(correctedMinMaxValues, valueDelta);

      return { leftValues, summary, availablePitchTypes };
    }

    // Season
    if (currentTimeInterval === 'Season') {
      return getGraphSummaryData(4);
    }
    // Month
    if (currentTimeInterval === 'Month') {
      return getGraphSummaryData(7);
    }
    // Games
    return getGraphSummaryData(10);
  }

  const bottomMarks = getBottomMarks();
  const leftMarks = getLeftMarks(bottomMarks);

  const { leftValues } = leftMarks;
  const yScaleMultiplier = PARAMS.GRAPH_LINES_HEIGHT / (leftValues[leftValues.length - 1] - leftValues[0]);

  PARAMS.HORIZONTAL_GRID_LINES_STEP = PARAMS.GRAPH_LINES_HEIGHT / PARAMS.HORIZONTAL_GRID_LINES_NUMBER;
  PARAMS.ZERO_COORDS = {
    X: PARAMS.HORIZONTAL_GRID_LINES_LEFT,
    Y: PARAMS.HORIZONTAL_GRID_LINES_TOP + PARAMS.GRAPH_LINES_HEIGHT
  };

  return (
    <svg viewBox='0 0 1192 500' xmlns='http://www.w3.org/2000/svg' className={cl.graph}>
      {/* Main layout rendering */}
      {/* Top-left title */}
      <text x={PARAMS.LEFT_PADDING} y={PARAMS.TOP_PADDING} className={cl.sideTitle}>
        Pitches
      </text>

      {/* Horizontal center grid line */}
      <line
        x1={PARAMS.ZERO_COORDS.X}
        y1={PARAMS.ZERO_COORDS.Y}
        x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH}
        y2={PARAMS.ZERO_COORDS.Y}
        stroke='#ACACAC'
      />

      {/* Horizontal lines + left numbers rendering */}
      <HorizontalLinesAndNumbers PARAMS={PARAMS} marks={leftMarks.leftValues} />

      {/* Horizontal marks + numbers*/}
      {/* Marks */}
      <BottomMarks PARAMS={PARAMS} bottomMarks={bottomMarks} currentTimeInterval={currentTimeInterval} />

      {/* Graph lines */}
      <HoveringLines
        PARAMS={PARAMS}
        leftMarks={leftMarks}
        pitchTypes={pitchTypes}
        yScaleMultiplier={yScaleMultiplier}
      />
      <Lines
        PARAMS={PARAMS}
        leftMarks={leftMarks}
        pitchTypes={pitchTypes}
        yScaleMultiplier={yScaleMultiplier}
        currentTimeInterval={currentTimeInterval}
      />

      {/* Dots */}
      {/* <Dots
        PARAMS={PARAMS}
        leftMarks={leftMarks}
        pitchTypes={pitchTypes}
        yScaleMultiplier={yScaleMultiplier}
      /> */}

      {/* Graph lines rendering */}
      {/* {dimensionsArr.map((dimension, i) => {
        const { coords, color } = dimension;
        let linePath = `M${PARAMS.ZERO_COORDS.X + coords[0][0] * xScaleMultiplier} ${
          PARAMS.ZERO_COORDS.Y - coords[0][1] * yScaleMultiplier
        }`;
        coords
          .slice(1)
          .forEach(
            coord =>
              (linePath += `L${PARAMS.ZERO_COORDS.X + coord[0] * xScaleMultiplier} ${
                PARAMS.ZERO_COORDS.Y - coord[1] * yScaleMultiplier
              }`)
          );
        return <path key={i} d={linePath} stroke={color} fill='none' style={{ transition: 'all .3s' }} />;
      })} */}
    </svg>
  );
};

export default ArsenalGraph;
