import { Fragment, useState } from 'react';
import OptionsToggler from 'components/UI/togglers/OptionsToggler/OptionsToggler';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import cl from './FieldGraph.module.scss';
import { getPitchColorByName } from 'utils';

const PARAMS = {
  GRAPH_WIDTH: 467,
  GRAPH_HEIGHT: 354.14,
  VERTICAL_COLUMNS_NUM: 8,
  HORIZONTAL_ROWS_NUM: 6
};

const Dots = ({ arrData, pitchTypes, coords }) => {
  // const [radius, setRadius] = useState(1);

  // useEffect(() => {
  //   setRadius(1);

  //   setTimeout(() => {
  //     setRadius(8);
  //   }, 300);
  // }, [coords]);

  return (
    <>
      {arrData.map((pitch, i) => {
        // const { break: breakCoords, pitch_info: pitchInfo } = pitch;
        const { coordinates, pitch_info: pitchInfo } = pitch;
        // const { break_x: x, break_y: y } = breakCoords;
        const { zone_x: x, zone_y: y } = coordinates;
        const { pitch_type: pitchType } = pitchInfo;

        const { xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef, zeroXCoord, zeroYCoord } = coords;

        const xCoord = zeroXCoord + x * xCoordRelCoef;
        const yCoord = y === 0 ? zeroYCoord : zeroYCoord - y * yCoordRelCoef + yCoordAbsCoef;
        return (
          <circle
            key={i}
            // key={`${i}-x-${x}-y-${y}`}
            cx={xCoord}
            cy={yCoord}
            // r={radius}
            stroke='black'
            strokeWidth='.5'
            fill={getPitchColorByName(pitchTypes[pitchType])}
            className={cl.animated}
          />
        );
      })}
    </>
  );
};
const EllipsedDots = ({ arrData, pitchTypes, coords }) => {
  const avgCoords = arrData.reduce((sum, { pitch_info: pitchInfo, coordinates }) => {
    if (sum[pitchInfo.pitch_type] === undefined) {
      sum[pitchInfo.pitch_type] = { sumX: 0, sumY: 0, count: 0 };
    }

    sum[pitchInfo.pitch_type].sumX += coordinates.zone_x;
    sum[pitchInfo.pitch_type].sumY += coordinates.zone_y;
    sum[pitchInfo.pitch_type].count++;
    sum[pitchInfo.pitch_type].avgX = sum[pitchInfo.pitch_type].sumX / sum[pitchInfo.pitch_type].count;
    sum[pitchInfo.pitch_type].avgY = sum[pitchInfo.pitch_type].sumY / sum[pitchInfo.pitch_type].count;

    return sum;
  }, {});

  console.log(avgCoords);

  return (
    <>
      {Object.entries(avgCoords).map(([pitchType, data], i) => {
        // const { break: breakCoords, pitch_info: pitchInfo } = pitch;
        // const { coordinates, pitch_info: pitchInfo } = pitch;
        // const { break_x: x, break_y: y } = breakCoords;
        // const { zone_x: x, zone_y: y } = coordinates;
        // const { pitch_type: pitchType } = pitchInfo;

        const { xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef, zeroXCoord, zeroYCoord } = coords;

        const xCoord = zeroXCoord + data.avgX * xCoordRelCoef;
        const yCoord = data.avgY === 0 ? zeroYCoord : zeroYCoord - data.avgY * yCoordRelCoef + yCoordAbsCoef;

        const circleColor = getPitchColorByName(pitchTypes[pitchType]);
        return (
          <>
            <circle
              key={i}
              // key={`${i}-x-${x}-y-${y}`}
              cx={xCoord}
              cy={yCoord}
              r='1'
              stroke={circleColor}
              strokeWidth='2'
              fill={circleColor}
              // className={cl.animated}
            />
            <circle
              key={i}
              // key={`${i}-x-${x}-y-${y}`}
              cx={xCoord}
              cy={yCoord}
              r='15'
              stroke={circleColor}
              strokeWidth='2'
              fill={circleColor}
              fillOpacity={0.5}
              // className={cl.animated}
            />
          </>
        );
      })}
    </>
  );
};

const Frames = ({ arrData, preview }) => {
  const { zone, pitch_types: pitchTypes } = preview;
  console.log(arrData);
  const {
    y_strike_down: yStrikeDown,
    x_strike_up: yStrikeUp,
    x_strike_left: xStrikeLeft,
    x_strike_right: xStrikeRight,
    shadow_border: shadowBorder
  } = zone;

  let totalPitches = arrData.length;

  const zeroYCoord = PARAMS.GRAPH_HEIGHT * 0.8345;
  const yCoordRelCoef = 340;
  const yCoordAbsCoef = 75;

  const zeroXCoord = PARAMS.GRAPH_WIDTH * 0.5;
  const xCoordRelCoef = 248;

  // Dashed frame params
  const dashedFrameX = zeroXCoord + xCoordRelCoef * xStrikeLeft;
  const dashedFrameWidth = zeroXCoord + xCoordRelCoef * xStrikeRight - dashedFrameX;
  const dashedFrameY = zeroYCoord - yStrikeUp * yCoordRelCoef + yCoordAbsCoef;
  const dashedFrameHeight = zeroYCoord - yStrikeDown * yCoordRelCoef + yCoordAbsCoef - dashedFrameY;
  return (
    <>
      {/* Frames */}
      {/* Wrapper frame */}
      {/* <rect
        x='14'
        y='14'
        width='217'
        height={PARAMS.GRAPH_HEIGHT - 14 - 33}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='transparent'
      /> */}

      {/* Outer frame */}
      {/* <rect
        x={dashedFrameX - shadowBorder * xCoordRelCoef}
        y={dashedFrameY - shadowBorder * yCoordRelCoef}
        width={dashedFrameWidth + shadowBorder * xCoordRelCoef * 2}
        height={dashedFrameHeight + shadowBorder * yCoordRelCoef * 2}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='#EAEAEA'
      /> */}

      {/* Inner frame */}
      <rect
        x={dashedFrameX + shadowBorder * xCoordRelCoef}
        y={dashedFrameY + shadowBorder * yCoordRelCoef}
        width={dashedFrameWidth - shadowBorder * xCoordRelCoef * 2}
        height={dashedFrameHeight - shadowBorder * yCoordRelCoef * 2}
        stroke='#B6C6D6'
        strokeWidth='2'
        fill='none'
        // fill='#B6C6D6'
      />

      {/* Dots */}
      <Dots
        arrData={arrData}
        pitchTypes={pitchTypes}
        coords={{ xCoordRelCoef, yCoordRelCoef, yCoordAbsCoef, zeroXCoord, zeroYCoord }}
      />
      <EllipsedDots
        arrData={arrData}
        pitchTypes={pitchTypes}
        coords={{ xCoordRelCoef, yCoordRelCoef, yCoordAbsCoef, zeroXCoord, zeroYCoord }}
      />

      {/* Dashed frame */}
      <rect
        x={dashedFrameX}
        y={dashedFrameY}
        width={dashedFrameWidth}
        height={dashedFrameHeight}
        stroke='#1A4C96'
        strokeWidth='2'
        fill='transparent'
      />

      {/* Title */}
      {/* <text x={zeroXCoord} y={ 5} className={cl.title}>
        {`${title1} (${totalPitches})`}
      </text> */}
    </>
  );
};

const VerticalGridLines = () => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, VERTICAL_COLUMNS_NUM: columnsNumber } = PARAMS;
  const columnWidth = graphWidth / columnsNumber;

  return (
    <>
      {new Array(columnsNumber + 1).fill(null).map((_, i, arr) => (
        <Fragment key={'vert-' + i}>
          <line
            x1={columnWidth * i}
            y1={0}
            x2={columnWidth * i}
            y2={graphHeight}
            stroke='#ACACAC'
            strokeDasharray={Math.floor(arr.length / 2) !== i ? '4 2' : null}
            // shapeRendering='crispEdges'
          />
          {i !== 0 && (
            <text x={columnWidth * i - 5} y={graphHeight - 7} className={cl.bottomTextTitle}>
              {i * 30 - 120}
            </text>
          )}
        </Fragment>
      ))}
    </>
  );
};

const HorizontalGridLines = () => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, HORIZONTAL_ROWS_NUM: rowsNumber } = PARAMS;
  const rowHeight = graphHeight / rowsNumber;

  return (
    <>
      {new Array(rowsNumber + 1).fill(null).map((_, i, arr) => (
        <Fragment key={'hor-' + i}>
          <line
            x1={0}
            y1={rowHeight * i}
            x2={graphWidth}
            y2={rowHeight * i}
            stroke='#ACACAC'
            strokeDasharray='4 2'
            // shapeRendering='crispEdges'
          />
          <text x='4' y={rowHeight * i + 15} className={cl.leftTextTitle}>
            {i * 30}
          </text>
        </Fragment>
      ))}
    </>
  );
};

const FieldGraph = ({ filteredData, preview, optionsArr, currentOption, setCurrentOption }) => {
  const [isChecked, setChecked] = useState(false);

  const optionsTogglerStyles = {
    position: 'absolute',
    right: '.4375rem',
    top: '.4375rem'
  };

  const handleOptionClick = option => () => setCurrentOption(option);
  const handleTogglerChange = () => setChecked(prev => !prev);
  return (
    <div className={cl.wrapper}>
      <svg
        viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'>
        <VerticalGridLines />
        <HorizontalGridLines />
        <Frames arrData={filteredData} preview={preview} />
      </svg>
      <OptionsToggler
        style={optionsTogglerStyles}
        optionsArr={optionsArr}
        currentOption={currentOption}
        handleOptionClick={handleOptionClick}
        vertical>
        Gravity
        <SimpleToggler checked={isChecked} onChange={handleTogglerChange} />
      </OptionsToggler>
    </div>
  );
};

export default FieldGraph;
