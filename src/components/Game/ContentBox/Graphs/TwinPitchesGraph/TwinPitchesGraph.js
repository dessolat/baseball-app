import { useRef, useLayoutEffect, useEffect, useState, Fragment } from 'react';
import cl from './TwinPitchesGraph.module.scss';
import { getPitchColorByName } from 'utils';
import Tooltip from './Tooltip';
import SubTitle from './SubTitle';
// import h337 from 'heatmap.js';

const PARAMS = {
  GRAPH_WIDTH: 294,
  GRAPH_HEIGHT: 388,
  SIDE_PADDING: 30
};

const Dots = ({ arrData, pitchTypes, coords, setHoveredDot }) => {
  const handleDotClick = (gameId, momentId) => () => {
    window.open(`/game/${gameId}?card=${momentId}&tab=pitching`, '_blank');
  };
  return (
    <>
      {arrData.map((pitch, i) => {
        const { coordinates, pitch_info: pitchInfo } = pitch;
        const { zone_x: x, zone_y: y } = coordinates;
        const { pitch_type: pitchType, game_id: gameId, mom_id: momentId, speed } = pitchInfo;

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
            onClick={handleDotClick(gameId, momentId)}
            onPointerOver={() =>
              setHoveredDot(prev => ({
                ...prev,
                speed: speed * 2.24,
                visible: true,
                coords: [xCoord, yCoord],
                pitchType: pitchTypes[pitchType]
              }))
            }
            onPointerOut={() => setHoveredDot(prev => ({ ...prev, visible: false }))}
          />
        );
      })}
    </>
  );
};

const HeatAreas = ({ arrData, coords }) => {
  const { zeroXCoord, zeroYCoord, xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef } = coords;
  const heatRowsCount = 35;
  const heatColsCount = 32;
  const rowHeight = PARAMS.GRAPH_HEIGHT / heatRowsCount;
  const colWidth = PARAMS.GRAPH_WIDTH / heatColsCount;

  // now generate some random data
  let maxValue = 0;

  const dotsCoords = arrData.reduce((sum, pitch) => {
    const { coordinates, pitch_info: pitchInfo } = pitch;
    const { zone_x: x, zone_y: y } = coordinates;

    const xCoord = zeroXCoord + x * xCoordRelCoef;
    const yCoord = y === 0 ? zeroYCoord : zeroYCoord - y * yCoordRelCoef + yCoordAbsCoef;

    const rowNumber = Math.floor(yCoord / rowHeight);
    const colNumber = Math.floor(xCoord / colWidth);

    if (!sum[rowNumber]) sum[rowNumber] = [];
    if (!sum[rowNumber][colNumber]) sum[rowNumber][colNumber] = 0;

    sum[rowNumber][colNumber]++;

    maxValue = Math.max(maxValue, sum[rowNumber][colNumber]);

    return sum;
  }, []);

  const points = dotsCoords.reduce((sum, coords, i) => {
    if (coords === undefined) return sum;

    coords.forEach((col, j) => {
      if (col === undefined) return;

      const newPoint = {
        x: +(j * colWidth + colWidth / 2).toFixed(2),
        y: +(i * rowHeight + rowHeight / 2).toFixed(2),
        value: col
        // value: col <= 5 ? +col : 5
      };

      sum.push(newPoint);
    });

    return sum;
  }, []);

  const maxRadius = 25;
  return (
    <>
      {points.map((point, i) => {
        const { x, y, value } = point;

        const firstLayerMaxValue = maxValue < 5 ? maxValue * 0.5 : maxValue * 0.33;
        const firstLayerRadius =
          maxValue === 1
            ? maxRadius / 3
            : maxValue < 3
            ? value * (maxRadius / 3)
            : value < firstLayerMaxValue
            ? (value / firstLayerMaxValue) * maxRadius
            : maxRadius;

        const opacity = firstLayerRadius / maxRadius;
        return (
          <Fragment key={i}>
            {/* <path d={path} fill='#8aa3cf' className={cl.blurredPath} filter='url(#goo)' /> */}
            <circle
              // key={`${i}-x-${x}-y-${y}`}
              cx={x}
              cy={y}
              r={firstLayerRadius}
              fill='#8aa3cf'
              filter='url(#goo)'
              className={cl.blur2}
              opacity={opacity * 1.5}
            />
          </Fragment>
        );
      })}
      {/* Second layer */}
      {points.map((point, i) => {
        const { x, y, value } = point;

        const secondLayerMaxValue = maxValue < 5 ? maxValue : maxValue * 0.66;
        const secondLayerRadius =
          value >= 3
            ? value < secondLayerMaxValue
              ? (value / secondLayerMaxValue) * (maxRadius - 4)
              : maxRadius - 4
            : 0;

        const opacity = secondLayerRadius / (maxRadius - 4);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={secondLayerRadius}
            fill='lightblue'
            filter='url(#goo)'
            opacity={opacity}
            className={cl.blur2}
          />
        );
      })}
      {/* Third layer */}
      {points.map((point, i) => {
        const { x, y, value } = point;

        const thirdLayerMaxValue = maxValue;

        const thirdLayerRadius =
          value >= 5
            ? value < thirdLayerMaxValue
              ? (value / thirdLayerMaxValue) * (maxRadius - 10)
              : maxRadius - 10
            : 0;

        const opacity = thirdLayerRadius / (maxRadius - 10);
        return (
          <Fragment key={i}>
            <circle
              cx={x}
              cy={y}
              r={thirdLayerRadius}
              fill='red'
              filter='url(#goo)'
              className={cl.blur2}
              opacity={opacity}
            />
          </Fragment>
        );
      })}
    </>
  );
};

const Frames = ({ top, title1, filteredData, selectedPitchType, preview, currentOption, setHoveredDot }) => {
  const { zone, pitch_types: pitchTypes } = preview;

  const {
    y_strike_down: yStrikeDown,
    x_strike_up: yStrikeUp,
    x_strike_left: xStrikeLeft,
    x_strike_right: xStrikeRight,
    shadow_border: shadowBorder
  } = zone || {};

  const arrData = selectedPitchType
    ? filteredData.filter(pitch => pitchTypes[pitch.pitch_info.pitch_type] === selectedPitchType)
    : filteredData;

  let totalPitches = arrData.length;

  const zeroYCoord = PARAMS.GRAPH_HEIGHT * 0.8615;
  const yCoordRelCoef = 179;
  // const yCoordRelCoef = 340;
  const yCoordAbsCoef = 0;
  // const yCoordAbsCoef = 75;

  const zeroXCoord = PARAMS.GRAPH_WIDTH * 0.5;
  // const zeroXCoord = PARAMS.GRAPH_WIDTH * 0.2645;
  const xCoordRelCoef = 179;
  // const xCoordRelCoef = 248;

  // Dashed frame params
  const dashedFrameX = zeroXCoord + xCoordRelCoef * xStrikeLeft;
  const dashedFrameWidth = zeroXCoord + xCoordRelCoef * xStrikeRight - dashedFrameX;
  const dashedFrameY = zeroYCoord - yStrikeUp * yCoordRelCoef + yCoordAbsCoef;
  const dashedFrameHeight = zeroYCoord - yStrikeDown * yCoordRelCoef + yCoordAbsCoef - dashedFrameY;

  const isDots = currentOption === 'All Pitches';
  return (
    <>
      {/* Center X line */}
      {/* <line x1={0} y1={zeroYCoord} x2={PARAMS.GRAPH_WIDTH} y2={zeroYCoord} stroke='red' /> */}
      {/* Center Y line */}
      {/* <line x1={zeroXCoord} y1={0} x2={zeroXCoord} y2={PARAMS.GRAPH_HEIGHT} stroke='red' /> */}
      {/* Left Dashed Line */}
      {/* <line x1={dashedFrameX} y1={0} x2={dashedFrameX} y2={PARAMS.GRAPH_HEIGHT} stroke='red' /> */}
      {/* Right Dashed Line */}
      {/* <line x1={dashedFrameX + dashedFrameWidth} y1={0} x2={dashedFrameX + dashedFrameWidth} y2={PARAMS.GRAPH_HEIGHT} stroke='red' /> */}

      {/* Frames */}
      {/* Wrapper frame */}
      <rect
        x={(PARAMS.GRAPH_WIDTH - 217) / 2}
        // x='14'
        y='14'
        width='217'
        height={PARAMS.GRAPH_HEIGHT - 14 - 33}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='transparent'
        className={cl.eventsNone}
      />

      {/* Outer frame */}
      <rect
        x={dashedFrameX - shadowBorder * xCoordRelCoef}
        y={dashedFrameY - shadowBorder * yCoordRelCoef}
        width={dashedFrameWidth + shadowBorder * xCoordRelCoef * 2}
        height={dashedFrameHeight + shadowBorder * yCoordRelCoef * 2}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='#EAEAEA'
        className={cl.eventsNone}
      />

      {/* Inner frame */}
      <rect
        x={dashedFrameX + shadowBorder * xCoordRelCoef}
        y={dashedFrameY + shadowBorder * yCoordRelCoef}
        width={dashedFrameWidth - shadowBorder * xCoordRelCoef * 2}
        height={dashedFrameHeight - shadowBorder * yCoordRelCoef * 2}
        fill='#B6C6D6'
        className={cl.eventsNone}
      />

      {/* Dots */}
      {isDots && (
        <Dots
          arrData={arrData}
          pitchTypes={pitchTypes}
          coords={{ xCoordRelCoef, yCoordRelCoef, yCoordAbsCoef, zeroXCoord, zeroYCoord }}
          setHoveredDot={setHoveredDot}
        />
      )}

      {/* Heat areas */}
      {!isDots && (
        <>
          <filter id='goo'>
            <feGaussianBlur stdDeviation='2' />
          </filter>
          <HeatAreas
            arrData={arrData}
            pitchTypes={pitchTypes}
            coords={{ xCoordRelCoef, yCoordRelCoef, yCoordAbsCoef, zeroXCoord, zeroYCoord }}
          />
        </>
      )}

      {/* Dashed frame */}
      <rect
        x={dashedFrameX}
        y={dashedFrameY}
        width={dashedFrameWidth}
        height={dashedFrameHeight}
        stroke='#1A4C96'
        strokeWidth='2'
        strokeDasharray='8 2'
        fill='transparent'
        className={cl.eventsNone}
      />

      {/* Title */}
      <text x={zeroXCoord} y={top - 5} className={cl.title}>
        {`${title1} (${totalPitches})`}
      </text>

      {/* Subtitle */}
      {/* <SubTitle zeroXCoord={zeroXCoord} top={top} arrData={arrData} /> */}
    </>
  );
};

const Column = ({ right, center, coef, data, reverse = false }) => {
  const { percents: srcPercents, footer } = data;
  const percents = isNaN(srcPercents) ? 0 : srcPercents;

  const percentValueRef = useRef(null);

  useLayoutEffect(() => {
    if (percentValueRef.current === null) return;

    percentValueRef.current.style.transition = 'unset';
    percentValueRef.current.style.opacity = 0;

    setTimeout(() => {
      if (percentValueRef.current) {
        percentValueRef.current.style.transition = 'opacity .3s';
        percentValueRef.current.style.opacity = 1;
      }
    }, 300);
  }, [percents]);

  const xCoord = right - 20;
  const yCoordFilled = reverse ? center : center - coef * percents;

  const valueXCoord = xCoord + 10;

  const percentsYCoord = reverse
    ? yCoordFilled + coef * percents + 16
    : footer
    ? center + 15
    : yCoordFilled - 5;
  // const percentsYCoord = reverse ? center + columnHeight + 25 : yCoordFilled - 5;
  const legendCircleFill = footer === 'Heart' ? '#B6C6D6' : footer === 'Shadow' ? '#EAEAEA' : 'transparent';
  const isLegendText = footer === 'Heart';
  const percentsValue = Math.round(percents);
  return (
    <>
      {/* Filled */}
      <rect
        x={xCoord}
        y={yCoordFilled}
        width='20'
        className={cl.animated}
        height={coef * percents}
        fill={`hsla(${169 + 0.41 * percents}, 30%, ${88 - 0.15 * percents}%, 1)`}
      />
      {/* Empty */}
      {/* <rect
        x={xCoord}
        y={yCoordEmpty}
        width='20'
        height={coef * (100 - percents)}
        fill='#EAEAEA'
        className={cl.animated}
      /> */}
      {/* Value */}
      {/* <text x={valueXCoord} y={valueYCoord} className={cl.valueText}>
        {value}
      </text> */}
      {/* Percents */}
      <text x={valueXCoord} y={percentsYCoord} className={cl.percentValue} ref={percentValueRef}>
        {percentsValue}%
      </text>
      {/* Footer */}
      {footer && (
        <>
          <circle
            cx={valueXCoord}
            cy={percentsYCoord + 22}
            r='10'
            stroke='#B6DBD4'
            strokeWidth='2'
            fill={legendCircleFill}
          />
          {isLegendText && (
            <text x={valueXCoord - 56} y={percentsYCoord + 42} className={cl.valueText} textAnchor='start'>
              Legend:
            </text>
          )}
          <text x={valueXCoord} y={percentsYCoord + 42} className={cl.valueText}>
            {footer}
          </text>
        </>
      )}
    </>
  );
};

const Columns = ({ right, center, values }) => {
  const columnHeight = 150 / 2;
  const coef = columnHeight / 100;

  return (
    <>
      {Object.entries(values).map((entry, i) => (
        <Column
          key={entry[0]}
          right={right - 42 * (3 - entry[1].column)}
          center={center}
          coef={coef}
          data={entry[1]}
          columnHeight={columnHeight}
          reverse={entry[1].reverse}
        />
      ))}
    </>
  );
};

// const PercentsGraph = ({ left, center, filteredData, selectedPitchType, preview }) => {
//   const { pitch_types: pitchTypes } = preview;

//   const filteredPitches = selectedPitchType
//     ? filteredData.filter(pitch => pitchTypes[pitch.pitch_info.pitch_type] === selectedPitchType)
//     : filteredData;

//   const filteredPitchesCount = filteredPitches.length;
//   const defaultCountByResult = {
//     swingHeart: 0,
//     swingShadow: 0,
//     swingChase: 0,
//     takeHeart: 0,
//     takeShadow: 0,
//     takeChase: 0,
//     totalHeart: 0,
//     totalShadow: 0,
//     totalChase: 0
//   };

//   const pitchesCountByResult = filteredPitches.reduce((sum, pitch) => {
//     const { result, zone } = pitch;

//     if (result.swing) {
//       zone.heart && sum.swingHeart++;
//       zone.edge && sum.swingShadow++;
//       zone.waste && sum.swingChase++;
//     }

//     if (result.take) {
//       zone.heart && sum.takeHeart++;
//       zone.edge && sum.takeShadow++;
//       zone.waste && sum.takeChase++;
//     }

//     zone.heart && sum.totalHeart++;
//     zone.edge && sum.totalShadow++;
//     zone.waste && sum.totalChase++;

//     return sum;
//   }, defaultCountByResult);

//   const {
//     swingChase,
//     takeChase,
//     swingShadow,
//     takeShadow,
//     swingHeart,
//     takeHeart,
//     totalChase,
//     totalShadow,
//     totalHeart
//   } = pitchesCountByResult;

//   const topRightPercents = Math.round((swingChase * 100) / (swingChase + takeChase));
//   const topCenterPercents = Math.round((swingShadow * 100) / (swingShadow + takeShadow));
//   const topLeftPercents = Math.round((swingHeart * 100) / (swingHeart + takeHeart));

//   const topValues = {
//     topRight: {
//       percents: topRightPercents,
//       footer: null,
//       column: 3
//     },
//     bottomRight: {
//       percents: 100 - topRightPercents,
//       footer: null,
//       reverse: true,
//       column: 3
//     },
//     topCenter: {
//       percents: topCenterPercents,
//       footer: null,
//       column: 2
//     },
//     bottomCenter: {
//       percents: 100 - topCenterPercents,
//       footer: null,
//       reverse: true,
//       column: 2
//     },
//     topLeft: {
//       percents: topLeftPercents,
//       footer: null,
//       column: 1
//     },
//     bottomLeft: {
//       percents: 100 - topLeftPercents,
//       footer: null,
//       reverse: true,
//       column: 1
//     }
//   };

//   const bottomValues = {
//     topRight: {
//       percents: (totalChase * 100) / filteredPitchesCount,
//       footer: 'Chase',
//       column: 3
//     },
//     topCenter: {
//       percents: (totalShadow * 100) / filteredPitchesCount,
//       footer: 'Shadow',
//       column: 2
//     },
//     topLeft: {
//       percents: (totalHeart * 100) / filteredPitchesCount,
//       footer: 'Heart',
//       column: 1
//     }
//   };

//   return (
//     <>
//       {/* Top line titles */}
//       <text x={left} y={center - 5} className={cl.percentTitle}>
//         Swing
//       </text>
//       <text x={left} y={center + 15} className={cl.percentTitle}>
//         Take
//       </text>
//       {/* Bottom line titles */}
//       <text x={left} y={center + 170} className={cl.percentTitle}>
//         Pitches
//       </text>
//       <text x={left} y={center + 185} className={cl.percentTitle}>
//         by zone
//       </text>
//       <Columns right={left + 167} center={center} values={topValues} />
//       {/* Bottom columns */}
//       <Columns right={left + 167} center={center + 190} values={bottomValues} />

//       {/* Top line */}
//       <line x1={left} y1={center} x2={left + 167} y2={center} stroke='#ACACAC' />
//       {/* Bottom line */}
//       <line x1={left} y1={center + 190} x2={left + 167} y2={center + 190} stroke='#ACACAC' />
//     </>
//   );
// };

const LeftChart = ({ filteredData, selectedPitchType, preview, currentOption }) => {
  const [hoveredDot, setHoveredDot] = useState({ visible: false, speed: 0, coords: [0, 0] });

  const mainTitle = selectedPitchType ?? 'All pitches';

  return (
    <>
      <Frames
        top={40}
        title1={mainTitle}
        filteredData={filteredData}
        selectedPitchType={selectedPitchType}
        preview={preview}
        currentOption={currentOption}
        setHoveredDot={setHoveredDot}
      />
      {/* <PercentsGraph
        left={PARAMS.SIDE_PADDING + 179 + 45}
        center={106}
        filteredData={filteredData}
        selectedPitchType={selectedPitchType}
        preview={preview}
      /> */}
      {hoveredDot.visible && <Tooltip hoveredDot={hoveredDot} isType={!selectedPitchType} />}
    </>
  );
};

const TwinPitchesGraph = ({
  filteredData = [],
  selectedPitchType = null,
  preview = {},
  currentOption = 'All Pitches',
  ...props
}) => {
  const [isGraphVisible, setGraphVisibility] = useState(false);

  const wrapperRef = useRef();
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

  return (
    <div ref={wrapperRef} {...props}>
      <svg
        viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
        xmlns='http://www.w3.org/2000/svg'
        className={cl.wrapper}
        preserveAspectRatio='none'
        ref={graphRef}>
        {isGraphVisible && (
          <LeftChart
            filteredData={filteredData}
            selectedPitchType={selectedPitchType}
            preview={preview}
            currentOption={currentOption}
          />
        )}
      </svg>
    </div>
  );
};

export default TwinPitchesGraph;
