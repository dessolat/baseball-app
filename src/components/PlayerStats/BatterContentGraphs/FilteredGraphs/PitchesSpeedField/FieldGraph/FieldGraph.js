import { Fragment, useState, useRef, useEffect } from 'react';
import OptionsToggler from 'components/UI/togglers/OptionsToggler/OptionsToggler';
import SimpleToggler from 'components/UI/togglers/SimpleToggler/SimpleToggler';
import cl from './FieldGraph.module.scss';
import { getPitchColorByName } from 'utils';

const PARAMS = {
  GRAPH_WIDTH: 455,
  GRAPH_HEIGHT: 330,
  // GRAPH_HEIGHT: 326,
  // GRAPH_WIDTH: 467,
  // GRAPH_HEIGHT: 354.14,
  VERTICAL_COLUMNS_NUM: 12,
  HORIZONTAL_ROWS_NUM: 6
};

const Dots = ({ arrData, pitchTypes, coords, linesCoords }) => {
  // const [radius, setRadius] = useState(1);

  // useEffect(() => {
  //   setRadius(1);

  //   setTimeout(() => {
  //     setRadius(8);
  //   }, 300);
  // }, [coords]);
  const { xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef, zeroXCoord, zeroYCoord } = coords;
  const { yZeroBreakCoef, zeroYBreakLine } = linesCoords;

  const handleDotClick = (gameId, momentId) => () => {
    window.open(`/game/${gameId}?card=${momentId}&tab=pitching`, '_blank');
  };
  return (
    <>
      {arrData.map((pitch, i) => {
        const { break: breakCoords, pitch_info: pitchInfo } = pitch;
        const { break_x: x, break_y: y } = breakCoords;
        const { pitch_type: pitchType, game_id: gameId, mom_id: momentId } = pitchInfo;
        // const { coordinates, pitch_info: pitchInfo } = pitch;
        // const { zone_x: x, zone_y: y } = coordinates;

        const xCoord = zeroXCoord + x * xCoordRelCoef;
        const yCoord = y === 0 ? zeroYBreakLine : zeroYBreakLine + y * 100 * yZeroBreakCoef;
        // const xCoord = zeroXCoord + x * xCoordRelCoef;
        // const yCoord = y === 0 ? zeroYCoord : zeroYCoord - y * yCoordRelCoef + yCoordAbsCoef;
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
            className={cl.animatedDot}
            onClick={handleDotClick(gameId, momentId)}
          />
        );
      })}
    </>
  );
};
const EllipsedDots = ({
  avgCoords,
  pitchTypes,
  coords,
  relValuesData,
  totalPitches,
  linesCoords,
  arrData
}) => {
  const { xCoordRelCoef, zeroXCoord } = coords;
  const { yZeroBreakCoef, zeroYBreakLine } = linesCoords;

  return (
    <>
      {Object.entries(avgCoords).map(([pitchType, data], i) => {
        // const { break: breakCoords, pitch_info: pitchInfo } = pitch;
        // const { coordinates, pitch_info: pitchInfo } = pitch;
        // const { break_x: x, break_y: y } = breakCoords;
        // const { zone_x: x, zone_y: y } = coordinates;
        // const { pitch_type: pitchType } = pitchInfo;

        const xCoord = zeroXCoord + data.avgBreakX * xCoordRelCoef;
        const yCoord =
          data.avgBreakY === 0 ? zeroYBreakLine : zeroYBreakLine + data.avgBreakY * 100 * yZeroBreakCoef;

        const circleColor = getPitchColorByName(pitchTypes[pitchType]);
        const opacityValue =
          0.5 + ((relValuesData[pitchTypes[pitchType]].count * 100) / totalPitches / 100) * 0.5;

        const filteredArrData = arrData.filter(pitch => pitch.pitch_info.pitch_type === +pitchType);

        const sumDiffBreaks = filteredArrData.reduce(
          (sum, { break: breakValues }) => {
            const x = sum.x + (breakValues.break_x - data.avgBreakX) ** 2;
            const y = sum.y + (breakValues.break_y - data.avgBreakY) ** 2;

            return { x, y };
          },
          {
            x: 0,
            y: 0
          }
        );
        const sumDiffBreaksAvg = { x: sumDiffBreaks.x / data.count, y: sumDiffBreaks.y / data.count };
        const skoBreaks = { x: Math.sqrt(sumDiffBreaksAvg.x), y: Math.sqrt(sumDiffBreaksAvg.y) };

        // 		const sumDiffSpeeds = speeds.reduce((sum, curSpeed) => sum + (curSpeed - avgSpeed) ** 2, 0);
        // const sumDiffSpeedsAvg = sumDiffSpeeds / count;
        // const skoSpeed = Math.sqrt(sumDiffSpeedsAvg);
        return (
          <Fragment key={i}>
            <circle
              // key={`${i}-x-${x}-y-${y}`}
              cx={xCoord}
              cy={yCoord}
              r='1'
              stroke={circleColor}
              strokeWidth='2'
              fill={circleColor}
            />
            <ellipse
              cx={xCoord}
              cy={yCoord}
              rx={skoBreaks.x * xCoordRelCoef}
              ry={skoBreaks.y * yZeroBreakCoef * -100}
              stroke={circleColor}
              strokeWidth='2'
              fill={circleColor}
              fillOpacity={opacityValue}
            />
            {/* <circle
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

const Frames = ({ avgCoords, arrData, preview, isDots, relValuesData, coords, linesCoords }) => {
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
    <g className={cl.frames}>
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
        style={{ transition: 'all .3s' }}
        // fill='#B6C6D6'
      />

      {/* Dots */}
      {isDots && <Dots arrData={arrData} pitchTypes={pitchTypes} coords={coords} linesCoords={linesCoords} />}
      {/* Ellipsed Dots */}
      {!isDots && (
        <EllipsedDots
          avgCoords={avgCoords}
          pitchTypes={pitchTypes}
          coords={coords}
          relValuesData={relValuesData}
          totalPitches={totalPitches}
          linesCoords={linesCoords}
          arrData={arrData}
        />
      )}

      {/* Dashed frame */}
      {/* <line x1={dashedFrameX} y1={0} x2={dashedFrameX} y2={PARAMS.GRAPH_HEIGHT} stroke='red' strokeWidth='1' />
      <line x1={dashedFrameX + dashedFrameWidth} y1={0} x2={dashedFrameX + dashedFrameWidth} y2={PARAMS.GRAPH_HEIGHT} stroke='red' strokeWidth='1' /> */}
      <rect
        x={dashedFrameX}
        y={dashedFrameY}
        width={dashedFrameWidth}
        height={dashedFrameHeight}
        stroke='#1A4C96'
        strokeWidth='2'
        fill='transparent'
        style={{ transition: 'all .3s' }}
      />

      {/* Title */}
      {/* <text x={zeroXCoord} y={ 5} className={cl.title}>
        {`${title1} (${totalPitches})`}
      </text> */}
    </g>
  );
};

const VerticalGridLines = ({ linesCoords }) => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, VERTICAL_COLUMNS_NUM: columnsNumber } = PARAMS;
  const columnWidth = 30;
  // const columnWidth = graphWidth / columnsNumber;

  const { rightBorderValue } = linesCoords;

  const centerLineX = graphWidth / 2;
  const xCoordPerLine = (graphWidth / 2 / rightBorderValue) * columnWidth;
  return (
    <>
      {/* Center Line */}
      <line
        x1={centerLineX}
        y1={0}
        x2={centerLineX}
        y2={graphHeight}
        stroke='#ACACAC'
        // strokeDasharray={Math.floor(arr.length / 2) !== i ? '4 2' : null}
      />
      <text x={centerLineX - 5} y={graphHeight - 7} className={cl.bottomTextTitle}>
        0
      </text>

      {/* Left Lines */}
      {new Array(columnsNumber / 2).fill(null).map((_, i, arr) => {
        const colText = (i + 1) * -30;
        const colXCoord = centerLineX - (i + 1) * xCoordPerLine;
        const isBottomTextTitle = colXCoord > 0;

        return (
          <Fragment key={'vertical-left-' + i}>
            <line
              x1={colXCoord}
              y1={0}
              x2={colXCoord}
              y2={graphHeight}
              stroke='#ACACAC'
              strokeDasharray='4 2'
            />
            {isBottomTextTitle && (
              <text x={colXCoord - 5} y={graphHeight - 7} className={cl.bottomTextTitle}>
                {colText}
              </text>
            )}
          </Fragment>
        );
      })}

      {/* Right Lines */}
      {new Array(columnsNumber / 2).fill(null).map((_, i, arr) => {
        const colText = (i + 1) * 30;
        const colXCoord = centerLineX + (i + 1) * xCoordPerLine;
        const isBottomTextTitle = colXCoord < graphWidth;

        return (
          <Fragment key={'vertical-right-' + i}>
            <line
              x1={colXCoord}
              y1={0}
              x2={colXCoord}
              y2={graphHeight}
              stroke='#ACACAC'
              strokeDasharray='4 2'
            />
            {isBottomTextTitle && (
              <text x={colXCoord - 5} y={graphHeight - 7} className={cl.bottomTextTitle}>
                {colText}
              </text>
            )}
          </Fragment>
        );
      })}

      {/* Old lines */}
      {/* {new Array(columnsNumber + 1).fill(null).map((_, i, arr) => {
        const colText = +(i * valuePerColumn + leftBorderValue).toFixed(0);

        return (
          <Fragment key={'vert-right-' + i}>
            <line
              x1={columnWidth * i}
              y1={0}
              x2={columnWidth * i}
              y2={graphHeight}
              stroke='red'
              strokeDasharray={Math.floor(arr.length / 2) !== i ? '4 2' : null}
            />
            {i !== 0 && (
              <text x={columnWidth * i - 5} y={graphHeight - 7} stroke='red' strokeWidth='.5' className={cl.bottomTextTitle}>
                {colText}
              </text>
            )}
          </Fragment>
        );
      })} */}
    </>
  );
};

const HorizontalGridLines = ({ coords, linesCoords }) => {
  const { GRAPH_WIDTH: graphWidth, GRAPH_HEIGHT: graphHeight, HORIZONTAL_ROWS_NUM: rowsNumber } = PARAMS;
  const rowHeight = 30;
  // const rowHeight = graphHeight / rowsNumber;

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

  // const valuePerRow = (bottomBorderValue - topBorderValue) / rowsNumber;
  const centerLineY = graphHeight / 2;
  const centerLineValue = Math.round((bottomBorderValue + topBorderValue) / 2);
  const yCoordPerLine = (graphHeight / 2 / ((bottomBorderValue - topBorderValue) / 2)) * rowHeight;
  return (
    <>
      {/* Center Line */}
      <line x1={0} y1={centerLineY} x2={graphWidth} y2={centerLineY} stroke='#ACACAC' strokeDasharray='4 2' />
      <text x='4' y={centerLineY + 15} className={cl.leftTextTitle}>
        {-centerLineValue}
      </text>

      {/* Top Lines */}
      {new Array(rowsNumber / 2).fill(null).map((_, i, arr) => {
        const rowText = -(centerLineValue + (i + 1) * 30);
        const rowYCoord = centerLineY + yCoordPerLine * (i + 1);
        const isLeftTextTitle = rowYCoord >= 0;

        return (
          <Fragment key={'horizontal-top-' + i}>
            <line
              x1={0}
              y1={rowYCoord}
              x2={graphWidth}
              y2={rowYCoord}
              stroke='#ACACAC'
              strokeDasharray='4 2'
            />
            {isLeftTextTitle && (
              <text x='4' y={rowYCoord + 15} className={cl.leftTextTitle}>
                {rowText}
              </text>
            )}
          </Fragment>
        );
      })}

      {/* Bottom Lines */}
      {new Array(rowsNumber / 2).fill(null).map((_, i, arr) => {
        const rowText = -(centerLineValue - (i + 1) * 30);
        const rowYCoord = centerLineY - yCoordPerLine * (i + 1);
        const isLeftTextTitle = rowYCoord + 25 < graphHeight;

        return (
          <Fragment key={'horizontal-bottom-' + i}>
            <line
              x1={0}
              y1={rowYCoord}
              x2={graphWidth}
              y2={rowYCoord}
              stroke='#ACACAC'
              strokeDasharray='4 2'
            />
            {isLeftTextTitle && (
              <text x='4' y={rowYCoord + 15} className={cl.leftTextTitle}>
                {rowText}
              </text>
            )}
          </Fragment>
        );
      })}

      {/* Old lines */}
      {/* {new Array(rowsNumber + 1).fill(null).map((_, i, arr) => {
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
      })} */}

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
        Top {Math.floor(minMaxAvgBreak.maxY * 100)}
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
  const [coordsAltered, setCoordsAltered] = useState(true);
  const [isAbsCoef, setIsAbsCoef] = useState(false);
  const [isGraphVisible, setGraphVisibility] = useState(false);

  const graphRef = useRef();

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '300px 0px',
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

  const optionsTogglerStyles = {
    position: 'absolute',
    right: '.4375rem',
    top: '.4375rem'
  };

  const handleOptionClick = option => () => setCurrentOption(option);
  const handleTogglerChange = () => setChecked(prev => !prev);

  const isDots = currentOption === 'All Pitches';

  const { zone } = preview;

  const zeroYCoord = PARAMS.GRAPH_HEIGHT * 0.88;
  // const zeroYCoord = PARAMS.GRAPH_HEIGHT * 0.8345;
  const yCoordRelCoef = 160;
  // const yCoordRelCoef = 213;
  // const yCoordRelCoef = coordsAltered ? 213 : 340;
  // const yCoordRelCoef = 340;
  const yCoordAbsCoef = 0;
  // const yCoordAbsCoef = isAbsCoef ? 75 : 0;
  // const yCoordAbsCoef = 75;
  const zeroXCoord = PARAMS.GRAPH_WIDTH * 0.5;
  const xCoordRelCoef = 160;
  // const xCoordRelCoef = coordsAltered ? 160 : 248;
  // const xCoordRelCoef = 248;
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

  const halfGraphWidth = PARAMS.GRAPH_WIDTH / 2;
  const leftBorderValue = (-halfGraphWidth / xCoordRelCoef) * 100;
  const rightBorderValue = (halfGraphWidth / xCoordRelCoef) * 100;

  const yZeroBreakCoef = PARAMS.GRAPH_HEIGHT / (bottomBorderValue - topBorderValue);
  // console.log(yZeroCoef);
  const zeroYBreakLine = -topBorderValue * yZeroBreakCoef;

  const linesCoords = {
    topFieldLine,
    minMaxAvgBreak,
    avgDelta,
    centerYFieldLine,
    bottomYFieldLine,
    bottomYFieldValue,
    topBorderValue,
    bottomBorderValue,
    leftBorderValue,
    rightBorderValue,
    yZeroBreakCoef,
    zeroYBreakLine
  };
  return (
    <div className={cl.outerWrapper}>
      <div className={cl.svgWrapper}>
        <svg
          viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
          ref={graphRef}>
          {/* zero Y line */}
          {/* <line x1={0} y1={zeroYCoord} x2={PARAMS.GRAPH_WIDTH} y2={zeroYCoord} stroke='red' strokeWidth='1' /> */}
          {/* zero X line */}
          {/* <line
            x1={zeroXCoord}
            y1={0}
            x2={zeroXCoord}
            y2={PARAMS.GRAPH_HEIGHT}
            stroke='red'
            strokeWidth='2'
          /> */}
          {isGraphVisible && (
            <>
              <Frames
                avgCoords={avgCoords}
                arrData={filteredData}
                preview={preview}
                isDots={isDots}
                relValuesData={relValuesData}
                coords={coords}
                linesCoords={linesCoords}
              />
              <VerticalGridLines linesCoords={linesCoords} />
              <HorizontalGridLines coords={coords} linesCoords={linesCoords} />
            </>
          )}
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
        {/* <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '1px 1px 3px 0px grey',
            overflow: 'hidden',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px'
          }}>
          <button
            onClick={() => setCoordsAltered(prev => !prev)}
            style={{ padding: 5, backgroundColor: coordsAltered ? 'white' : 'lightgray' }}>
            Toggle rel coef
          </button>
          <button
            onClick={() => setIsAbsCoef(prev => !prev)}
            style={{
              borderTop: '1px solid gray',
              padding: 5,
              backgroundColor: isAbsCoef ? 'white' : 'lightgray'
            }}>
            Toggle abs coef
          </button>
        </div> */}
      </div>
      {/* Bottom wrapper title */}
      <p className={cl.bottomWrapperTitle}>Horizontal break, cm</p>
      {/* Left wrapper title */}
      <p className={cl.leftWrapperTitle}>Downward Vertical Break, cm</p>
    </div>
  );
};

export default FieldGraph;
