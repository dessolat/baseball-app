import { Fragment, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { getPitchColorByName, getPitchСlassColorByName } from 'utils';
import cl from './ArsenalGraph.module.scss';
import BottomMarks from './BottomMarks';
// import Dots from './Dots';
import HorizontalLinesAndNumbers from './HorizontalLinesAndNumbers';

const PARAMS = {
  HORIZONTAL_GRID_LINES_NUMBER: 5,
  HORIZONTAL_GRID_LINES_WIDTH: 1120,
  HORIZONTAL_GRID_LINES_LEFT: 55,
  HORIZONTAL_GRID_LINES_TOP: 65,
  GRAPH_LINES_HEIGHT: 322,
  LEFT_PADDING: 12,
  TOP_PADDING: 30
};

const HoveringLines = ({ PARAMS, leftMarks, yScaleMultiplier }) => {
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
      {Object.entries(totalValues).map(([_, values], i) => {
        const startPointX = columnStartX;
        const startPointY = rowsStartY - (values[0] - minValue) * yScaleMultiplier;

        const pathDest = values.reduce((pathSum, value, j, arr) => {
          if (j === 0) return pathSum;

          pathSum += !value
            ? ''
            : `${!arr[j - 1] ? 'M' : 'L'}${columnStartX + columnStepX * j},${
                rowsStartY - (value - minValue) * yScaleMultiplier
              }`;
          return pathSum;
        }, `M${startPointX},${startPointY}`);

        const pathClasses = classNames(cl.hoveringLine, cl[`hoveringLine${i + 1}`]);
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
const Lines = ({ PARAMS, leftMarks, pitchTypes, pitchClasses, yScaleMultiplier, currentTimeInterval = null, classColor }) => {
  const { leftValues, summary, availablePitchTypes } = leftMarks;
  const leftValuesDelta = leftValues[leftValues.length - 1] - leftValues[0];
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

        const pathDest = values.reduce((pathSum, value, j, arr) => {
          if (j === 0) return pathSum;

          pathSum += !value
            ? ''
            : `${!arr[j - 1] ? 'M' : 'L'}${columnStartX + columnStepX * j},${
                rowsStartY - (value - minValue) * yScaleMultiplier
              }`;
          return pathSum;
        }, `M${startPointX},${startPointY}`);

        const pathClasses = classNames(cl.graphPath, cl[`graphPath${i + 1}`]);
        const graphNumberClasses = classNames(cl.graphNumber, cl[`graphNumber${i + 1}`]);

        const isPath = values.some(value => value !== 0);
        return (
          <Fragment key={type + '-' + currentTimeInterval}>
            {isPath && (
              <path
                d={pathDest}
                fill='none'
                stroke={
                  !classColor
                    ? getPitchColorByName(type !== '-1' ? pitchTypes[type] : 'All Pitches')
                    : getPitchСlassColorByName(type !== '-1' ? pitchClasses[type] : 'All Pitches')
                }
                strokeWidth='2'
                className={pathClasses}
              />
            )}
            {values.map((value, j) => {
              if (value) {
                const valueText =
                  currentTimeInterval !== 'Game' ? +(value * 100).toFixed(0) / 100 : Math.round(value);
                return (
                  <Fragment key={type + '-' + j}>
                    <circle
                      cx={columnStartX + columnStepX * j}
                      cy={
                        leftValuesDelta !== 0
                          ? rowsStartY - (value - minValue) * yScaleMultiplier
                          : PARAMS.HORIZONTAL_GRID_LINES_TOP + (PARAMS.GRAPH_LINES_HEIGHT / 5) * 2
                      }
                      r='3'
                      fill={
                        !classColor
                          ? getPitchColorByName(type !== '-1' ? pitchTypes[type] : 'All Pitches')
                          : getPitchСlassColorByName(type !== '-1' ? pitchClasses[type] : 'All Pitches')
                      }
                      className={pathClasses}
                    />
                    <text
                      x={columnStartX + columnStepX * j}
                      y={rowsStartY - (value - minValue) * yScaleMultiplier - 15}
                      className={graphNumberClasses}>
                      {valueText}
                    </text>
                  </Fragment>
                );
              }

              return <Fragment key={i + '-' + j}></Fragment>;
            })}
          </Fragment>
        );
      })}
    </>
  );
};

const ArsenalGraph = ({
  filteredData,
  currentTimeInterval,
  currentPitchTypes,
  pitchTypes = [],
  pitchClasses = [],
  title,
  graphType = 'Pitches',
  classColor = false
}) => {
  const [isGraphVisible, setGraphVisibility] = useState(false);

  const graphRef = useRef();

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '200px 0px',
      threshold: 0
    };

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          setGraphVisibility(true);
        } else {
          setGraphVisibility(false);
        }
      });
    }, options);
    observer.observe(graphRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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
    const graphsWithAllPitches = ['Pitches', 'InZone', 'OutZone', 'Inside', 'Outside', 'Low', 'High'];

    const availablePitchTypes = currentPitchTypes
      .filter(
        pitchType =>
          pitchType.checked && (pitchType.type === -1 ? graphsWithAllPitches.includes(graphType) : 1)
      )
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
    function getPitchesByTime(cur, sliceTo) {
      return filteredData.filter(({ pitch_info }) => pitch_info.date.slice(0, sliceTo) === cur);
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
    function getSumByTypeAndBaseHardHits(pitches) {
      console.log(pitches);

      return pitches
        .filter(({ result }) => result['base hit & hard hit'])
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getSumInZoneByType(pitches) {
      return pitches
        .filter(({ zone }) => zone['in zone'])
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getSumOutZoneByType(pitches) {
      return pitches
        .filter(({ zone }) => zone['out zone'])
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getSumInsideByType(pitches) {
      return pitches
        .filter(({ zone }) => zone.inside)
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getSumOutsideByType(pitches) {
      return pitches
        .filter(({ zone }) => zone.outside)
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getSumLowByType(pitches) {
      return pitches
        .filter(({ zone }) => zone.low)
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getSumHighByType(pitches) {
      return pitches
        .filter(({ zone }) => zone.high)
        .reduce((sum, { pitch_info }) => {
          const { pitch_type: pitchType } = pitch_info;

          sum[pitchType]++;
          availablePitchTypes.includes(-1) && sum['-1']++;

          return sum;
        }, getDefaultSumByType());
    }
    function getRelSumByType(allPitchesByTime, sumByType) {
      const relByType = {};

      for (let key in sumByType) {
        relByType[key] = (sumByType[key] * 100) / allPitchesByTime.length;
      }

      return relByType;
    }
    function getSpeedByType(pitches, sumByType) {
      const speedsSumByType = pitches.reduce((sum, { pitch_info }) => {
        const { pitch_type: pitchType, speed } = pitch_info;

        if (sum[pitchType] === undefined) sum[pitchType] = 0;

        sum[pitchType] += speed * 2.24;

        return sum;
      }, {});

      const result = {};

      for (let pitchType in speedsSumByType) {
        result[pitchType] = speedsSumByType[pitchType] / sumByType[pitchType];
      }

      return result;
    }
    function getSpinByType(pitches, sumByType) {
      const spinSumByType = pitches.reduce((sum, { pitch_info, break: breakValue }) => {
        const { pitch_type: pitchType } = pitch_info;
        const { spin } = breakValue;

        if (sum[pitchType] === undefined) sum[pitchType] = 0;

        sum[pitchType] += spin;

        return sum;
      }, {});

      const result = {};

      for (let pitchType in spinSumByType) {
        result[pitchType] = spinSumByType[pitchType] / sumByType[pitchType];
      }

      return result;
    }
    function getVerticalBreakByType(pitches, sumByType) {
      const verticalBreakSumByType = pitches.reduce((sum, { pitch_info, break: breakValue }) => {
        const { pitch_type: pitchType } = pitch_info;
        const { break_y } = breakValue;

        if (sum[pitchType] === undefined) sum[pitchType] = 0;

        sum[pitchType] += break_y * 100;

        return sum;
      }, {});
      const result = {};

      for (let pitchType in verticalBreakSumByType) {
        result[pitchType] = verticalBreakSumByType[pitchType] / sumByType[pitchType];
      }

      return result;
    }
    function getHorizontalBreakByType(pitches, sumByType) {
      const horizontalBreakSumByType = pitches.reduce((sum, { pitch_info, break: breakValue }) => {
        const { pitch_type: pitchType } = pitch_info;
        const { break_x } = breakValue;

        if (sum[pitchType] === undefined) sum[pitchType] = 0;

        sum[pitchType] += break_x * 100;

        return sum;
      }, {});

      const result = {};

      for (let pitchType in horizontalBreakSumByType) {
        result[pitchType] = horizontalBreakSumByType[pitchType] / sumByType[pitchType];
      }

      return result;
    }

    function getSumByTimeInterval(sliceTo) {
      const defaultSumByInterval = getDefaultSumBy();

      return bottomMarks.reduce((totalSum, interval) => {
        const pitches = getFilteredPitches(interval, sliceTo);
        const allPitchesByTime = getPitchesByTime(interval, sliceTo);
        const defaultSumByType = getDefaultSumByType();
        const sumByType = getSumByType(pitches, defaultSumByType);

        const GRAPH_FUNCS = {
          Pitches: getSumByTypeAndBaseHardHits(pitches),
          PitchesRel: getRelSumByType(allPitchesByTime, sumByType),
          Speed: getSpeedByType(pitches, sumByType),
          Spin: getSpinByType(pitches, sumByType),
          VerticalBreak: getVerticalBreakByType(pitches, sumByType),
          HorizontalBreak: getHorizontalBreakByType(pitches, sumByType),
          InZone: getSumInZoneByType(pitches),
          OutZone: getSumOutZoneByType(pitches),
          Inside: getSumInsideByType(pitches),
          Outside: getSumOutsideByType(pitches),
          Low: getSumLowByType(pitches),
          High: getSumHighByType(pitches)
        };

        const total = GRAPH_FUNCS[graphType];
        // const sumByType = getSumByType(pitches, defaultSumByType);

        totalSum[interval] = total;
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
      const GRAPH_FIXES = {
        Pitches: 0,
        PitchesRel: 2,
        Speed: 2,
        Spin: 0,
        VerticalBreak: 1,
        HorizontalBreak: 1,
        InZone: 0,
        OutZone: 0,
        Inside: 0,
        Outside: 0,
        Low: 0,
        High: 0
      };

      const result = [];
      for (let i = 0; i <= PARAMS.HORIZONTAL_GRID_LINES_NUMBER; i++) {
        const value = correctedMinMaxValues.min + valueDelta * i;
        result.push(value.toFixed(GRAPH_FIXES[graphType]));
        // result.push(Math.floor(value));
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
    <svg viewBox='0 0 1192 500' xmlns='http://www.w3.org/2000/svg' className={cl.graph} ref={graphRef}>
      {isGraphVisible && (
        <>
          {' '}
          {/* Main layout rendering */}
          {/* Top-left title */}
          <text x={PARAMS.LEFT_PADDING} y={PARAMS.TOP_PADDING} className={cl.sideTitle}>
            {title}
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
          <HorizontalLinesAndNumbers PARAMS={PARAMS} marks={leftMarks.leftValues} graphType={graphType} />
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
            pitchClasses={pitchClasses}
            yScaleMultiplier={yScaleMultiplier}
            currentTimeInterval={currentTimeInterval}
            classColor={classColor}
          />
        </>
      )}
    </svg>
  );
};

export default ArsenalGraph;
