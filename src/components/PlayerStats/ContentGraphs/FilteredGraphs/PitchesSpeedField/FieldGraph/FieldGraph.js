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
const EllipsedDots = ({ avgCoords, pitchTypes, coords, relValuesData, zone }) => {
  return (
    <>
      {Object.entries(avgCoords).map(([pitchType, data], i) => {
        // const { break: breakCoords, pitch_info: pitchInfo } = pitch;
        // const { coordinates, pitch_info: pitchInfo } = pitch;
        // const { break_x: x, break_y: y } = breakCoords;
        // const { zone_x: x, zone_y: y } = coordinates;
        // const { pitch_type: pitchType } = pitchInfo;

        // const xCoord = zeroXCoord + data.avgX * xCoordRelCoef;
        // const yCoord = data.avgY === 0 ? zeroYCoord : zeroYCoord - data.avgY * yCoordRelCoef + yCoordAbsCoef;

        // const circleColor = getPitchColorByName(pitchTypes[pitchType]);

        // const opacityValue = (relValuesData[pitchTypes[pitchType]].count * 100) / totalPitches / 100;
        return (
          <Fragment key={i}>
            {/* <circle
              // key={`${i}-x-${x}-y-${y}`}
              cx={xCoord}
              cy={yCoord}
              r='1'
              stroke={circleColor}
              strokeWidth='2'
              fill={circleColor}
            />
            <circle
              // key={`${i}-x-${x}-y-${y}`}
              cx={xCoord}
              cy={yCoord}
              // r='15'
              stroke={circleColor}
              strokeWidth='2'
              fill={circleColor}
              fillOpacity={opacityValue}
              className={cl.animatedEllipse}
            /> */}
          </Fragment>
        );
      })}
    </>
  );
};

const Frames = ({ avgCoords, arrData, preview, isDots, relValuesData, coords }) => {
  const { zone, pitch_types: pitchTypes } = preview;
  const {
    y_strike_down: yStrikeDown,
    x_strike_up: yStrikeUp,
    x_strike_left: xStrikeLeft,
    x_strike_right: xStrikeRight,
    shadow_border: shadowBorder
  } = zone;

  let totalPitches = arrData.length;
  const { xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef, zeroXCoord, zeroYCoord } = coords;

  // xCoordRelCoef, yCoordRelCoef, yCoordAbsCoef, zeroXCoord, zeroYCoord

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
      {isDots && (
        <Dots
          arrData={arrData}
          pitchTypes={pitchTypes}
          coords={{ xCoordRelCoef, yCoordRelCoef, yCoordAbsCoef, zeroXCoord, zeroYCoord }}
        />
      )}
      {/* Ellipsed Dots */}
      {!isDots && (
        <EllipsedDots
          avgCoords={avgCoords}
          pitchTypes={pitchTypes}
          coords={coords}
          relValuesData={relValuesData}
          zone={zone}
        />
      )}

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

const HorizontalGridLines = ({ coords, linesCoords }) => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, HORIZONTAL_ROWS_NUM: rowsNumber } = PARAMS;
  const rowHeight = graphHeight / rowsNumber;

  const { zeroXCoord } = coords;

  const {
    topFieldLine,
    minMaxAvgBreak,
    avgDelta,
    centerYFieldLine,
    bottomYFieldLine,
    bottomYFieldValue,
    topBorderValue,
    bottomBorderValue
  } = linesCoords;

  const valuePerRow = (bottomBorderValue - topBorderValue) / rowsNumber;
  return (
    <>
      {new Array(rowsNumber + 1).fill(null).map((_, i, arr) => {
        const rowText = Math.floor(topBorderValue + i * valuePerRow);

        return (
          <Fragment key={'hor-' + i}>
            <line
              x1={0}
              y1={rowHeight * i}
              x2={graphWidth}
              y2={rowHeight * i}
              stroke='#ACACAC'
              strokeDasharray='4 2'
            />
            <text x='4' y={rowHeight * i + 15} className={cl.leftTextTitle}>
              {rowText}
            </text>
          </Fragment>
        );
      })}

      {/* top Y field line */}
      <line
        x1={zeroXCoord - 57}
        y1={topFieldLine}
        x2={zeroXCoord + 57}
        y2={topFieldLine}
        strokeWidth='3'
        stroke='orange'
        strokeDasharray='4 4'
      />
      <text x='140' y={topFieldLine + 4} className={cl.leftTextTitle}>
        Top {Math.floor((minMaxAvgBreak.minY + avgDelta.y / 2) * 100)}
      </text>

      {/* center Y field line */}
      <line
        x1={zeroXCoord - 57}
        y1={centerYFieldLine}
        x2={zeroXCoord + 57}
        y2={centerYFieldLine}
        strokeWidth='3'
        stroke='orange'
        strokeDasharray='4 4'
      />
      <text x='90' y={centerYFieldLine + 4} className={cl.leftTextTitle}>
        Center {Math.floor((minMaxAvgBreak.minY + avgDelta.y / 2) * 100)}
      </text>

      {/* bottom Y field line */}
      <line
        x1={zeroXCoord - 57}
        y1={bottomYFieldLine}
        x2={zeroXCoord + 57}
        y2={bottomYFieldLine}
        strokeWidth='3'
        stroke='orange'
        strokeDasharray='4 4'
      />
      <text x='90' y={bottomYFieldLine + 4} className={cl.leftTextTitle}>
        Bottom {bottomYFieldValue}
      </text>
    </>
  );
};

const FieldGraph = ({
  filteredData,
  relValuesData,
  preview,
  optionsArr,
  currentOption,
  setCurrentOption
}) => {
  const [isChecked, setChecked] = useState(false);

  const optionsTogglerStyles = {
    position: 'absolute',
    right: '.4375rem',
    top: '.4375rem'
  };

  const handleOptionClick = option => () => setCurrentOption(option);
  const handleTogglerChange = () => setChecked(prev => !prev);

  const isDots = currentOption === 'All Pitches';

  const { zone } = preview;

  const zeroYCoord = PARAMS.GRAPH_HEIGHT * 0.8345;
  const yCoordRelCoef = 340;
  const yCoordAbsCoef = 75;
  const zeroXCoord = PARAMS.GRAPH_WIDTH * 0.5;
  const xCoordRelCoef = 248;
  const coords = { xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef, zeroXCoord, zeroYCoord };

  const avgCoords = filteredData.reduce((sum, { pitch_info: pitchInfo, coordinates, break: breakValues }) => {
    if (sum[pitchInfo.pitch_type] === undefined) {
      sum[pitchInfo.pitch_type] = { sumX: 0, sumY: 0, count: 0, sumBreakX: 0, sumBreakY: 0 };
    }

    sum[pitchInfo.pitch_type].sumX += coordinates.zone_x;
    sum[pitchInfo.pitch_type].sumY += coordinates.zone_y;
    sum[pitchInfo.pitch_type].count++;
    sum[pitchInfo.pitch_type].avgX = sum[pitchInfo.pitch_type].sumX / sum[pitchInfo.pitch_type].count;
    sum[pitchInfo.pitch_type].avgY = sum[pitchInfo.pitch_type].sumY / sum[pitchInfo.pitch_type].count;
    sum[pitchInfo.pitch_type].sumBreakX += breakValues.break_x;
    sum[pitchInfo.pitch_type].sumBreakY += breakValues.break_y;
    sum[pitchInfo.pitch_type].avgBreakX =
      sum[pitchInfo.pitch_type].sumBreakX / sum[pitchInfo.pitch_type].count;
    sum[pitchInfo.pitch_type].avgBreakY =
      sum[pitchInfo.pitch_type].sumBreakY / sum[pitchInfo.pitch_type].count;

    return sum;
  }, {});

  const minMaxAvgBreak = Object.values(avgCoords).reduce((sum, value) => {
    if (sum.minX === undefined) {
      sum.minX = value.avgBreakX;
      sum.maxX = value.avgBreakX;
      sum.minY = value.avgBreakY;
      sum.maxY = value.avgBreakY;

      return sum;
    }

    if (value.avgBreakX < sum.minX) sum.minX = value.avgBreakX;
    if (value.avgBreakX > sum.maxX) sum.maxX = value.avgBreakX;
    if (value.avgBreakY < sum.minY) sum.minY = value.avgBreakY;
    if (value.avgBreakY > sum.maxY) sum.maxY = value.avgBreakY;

    return sum;
  }, {});

  const avgDelta = {
    x: minMaxAvgBreak.maxX - minMaxAvgBreak.minX,
    y: minMaxAvgBreak.maxY - minMaxAvgBreak.minY
  };

  const totalPitches = filteredData.length;

  const centerYFieldLine =
    zeroYCoord - ((zone.x_strike_up + zone.y_strike_down) / 2) * yCoordRelCoef + yCoordAbsCoef;

  const topFieldLine = centerYFieldLine - (avgDelta.y / 2) * yCoordRelCoef;
  const bottomYFieldLine = centerYFieldLine + (avgDelta.y / 2) * yCoordRelCoef;

  const centerFieldValue = Math.floor((minMaxAvgBreak.minY + avgDelta.y / 2) * 100);
  const bottomYFieldValue = Math.floor(minMaxAvgBreak.minY * 100);

  const valuesCoef = ((avgDelta.y / 2) * yCoordRelCoef) / ((avgDelta.y / 2) * 100);

  const topBorderValue = centerFieldValue + centerYFieldLine / valuesCoef;
  const bottomBorderValue = centerFieldValue - (PARAMS.GRAPH_HEIGHT - centerYFieldLine) / valuesCoef;

  const linesCoords = {
    topFieldLine,
    minMaxAvgBreak,
    avgDelta,
    centerYFieldLine,
    bottomYFieldLine,
    bottomYFieldValue,
    topBorderValue,
    bottomBorderValue
  };
  return (
    <div className={cl.wrapper}>
      <svg
        viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'>
        <VerticalGridLines />
        <HorizontalGridLines coords={coords} linesCoords={linesCoords} />
        <Frames
          avgCoords={avgCoords}
          arrData={filteredData}
          preview={preview}
          isDots={isDots}
          relValuesData={relValuesData}
          coords={coords}
        />
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
