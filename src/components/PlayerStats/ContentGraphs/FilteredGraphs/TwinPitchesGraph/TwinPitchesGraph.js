import { useRef, useLayoutEffect } from 'react';
import cl from './TwinPitchesGraph.module.scss';
import { getPitchColorByName } from 'utils';

const PARAMS = {
  GRAPH_WIDTH: 463,
  GRAPH_HEIGHT: 388,
  SIDE_PADDING: 30
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
        const { coordinates, pitch_info: pitchInfo } = pitch;
        const { zone_x: x, zone_y: y } = coordinates;
        const { pitch_type: pitchType } = pitchInfo;

        const { xCoordRelCoef, yCoordAbsCoef, yCoordRelCoef, zeroXCoord, zeroYCoord } = coords;

        const yCoord = y === 0 ? zeroYCoord : zeroYCoord - y * yCoordRelCoef + yCoordAbsCoef;
        return (
          <circle
            key={i}
            // key={`${i}-x-${x}-y-${y}`}
            cx={zeroXCoord + x * xCoordRelCoef}
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

const Frames = ({ top, title1, filteredData, selectedPitchType, preview }) => {
  const { zone, pitch_types: pitchTypes } = preview;

  const {
    y_strike_down: yStrikeDown,
    x_strike_up: yStrikeUp,
    x_strike_left: xStrikeLeft,
    x_strike_right: xStrikeRight,
    shadow_border: shadowBorder
  } = zone;

  const arrData = selectedPitchType
    ? filteredData.filter(pitch => pitchTypes[pitch.pitch_info.pitch_type] === selectedPitchType)
    : filteredData;

  let totalPitches = arrData.length;

  const zeroYCoord = PARAMS.GRAPH_HEIGHT * 0.85;
  const yCoordRelCoef = 340;
  const yCoordAbsCoef = 75;

  const zeroXCoord = PARAMS.GRAPH_WIDTH * 0.2645;
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
      <rect
        x='14'
        y='14'
        width='217'
        height={PARAMS.GRAPH_HEIGHT - 14 - 33}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='transparent'
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
      />

      {/* Inner frame */}
      <rect
        x={dashedFrameX + shadowBorder * xCoordRelCoef}
        y={dashedFrameY + shadowBorder * yCoordRelCoef}
        width={dashedFrameWidth - shadowBorder * xCoordRelCoef * 2}
        height={dashedFrameHeight - shadowBorder * yCoordRelCoef * 2}
        fill='#B6C6D6'
      />

      {/* Dots */}
      <Dots
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
        strokeDasharray='8 2'
        fill='transparent'
      />

      {/* Title */}
      <text x={zeroXCoord} y={top - 5} className={cl.title}>
        {`${title1} (${totalPitches})`}
      </text>
    </>
  );
};

const Column = ({ right, center, coef, data, columnHeight, reverse = false }) => {
  const { value, percents, footer } = data;

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
  }, [data]);

  const xCoord = right - 20;
  const yCoordFilled = reverse ? center : center - coef * percents;
  const yCoordEmpty = reverse ? coef * percents + center : center - columnHeight;

  const valueXCoord = xCoord + 10;
  const valueYCoord = reverse ? center + 12 : center - 5;

  const percentsYCoord = reverse
    ? yCoordFilled + coef * percents + 16
    : footer
    ? center + 15
    : yCoordFilled - 5;
  // const percentsYCoord = reverse ? center + columnHeight + 25 : yCoordFilled - 5;
  const legendCircleFill = footer === 'Heart' ? '#B6C6D6' : footer === 'Shadow' ? '#EAEAEA' : 'transparent';
  const isLegendText = footer === 'Heart';
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
        {Math.round(percents)}%
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
            className={cl.animated}
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
  const { topRight, topCenter, topLeft, bottomRight, bottomCenter, bottomLeft } = values;

  const columnHeight = 150 / 2;
  // const columnHeight = 239 / 2;
  const coef = columnHeight / 100;
  return (
    <>
      {/* Top columns */}
      {topRight && (
        <Column right={right} center={center} coef={coef} data={topRight} columnHeight={columnHeight} />
      )}
      {topCenter && (
        <Column right={right - 42} center={center} coef={coef} data={topCenter} columnHeight={columnHeight} />
      )}
      {topLeft && (
        <Column
          right={right - 42 * 2}
          center={center}
          coef={coef}
          data={topLeft}
          columnHeight={columnHeight}
        />
      )}
      {/* Bottom columns */}
      {bottomRight && (
        <Column
          right={right}
          center={center}
          coef={coef}
          data={bottomRight}
          columnHeight={columnHeight}
          reverse
        />
      )}
      {bottomCenter && (
        <Column
          right={right - 42}
          center={center}
          coef={coef}
          data={bottomCenter}
          columnHeight={columnHeight}
          reverse
        />
      )}
      {bottomLeft && (
        <Column
          right={right - 42 * 2}
          center={center}
          coef={coef}
          data={bottomLeft}
          columnHeight={columnHeight}
          reverse
        />
      )}
    </>
  );
};

const PercentsGraph = ({ left, center, filteredData, selectedPitchType, preview }) => {
  const { pitch_types: pitchTypes } = preview;

  const filteredPitches = selectedPitchType
    ? filteredData.filter(pitch => pitchTypes[pitch.pitch_info.pitch_type] === selectedPitchType)
    : filteredData;

  const filteredPitchesCount = filteredPitches.length;
  const defaultCountByResult = {
    swingHeart: 0,
    swingShadow: 0,
    swingChase: 0,
    takeHeart: 0,
    takeShadow: 0,
    takeChase: 0,
    totalHeart: 0,
    totalShadow: 0,
    totalChase: 0
  };

  const pitchesCountByResult = filteredPitches.reduce((sum, pitch) => {
    const { result, zone } = pitch;

    if (result.swing) {
      zone.heart && sum.swingHeart++;
      zone.edge && sum.swingShadow++;
      zone.waste && sum.swingChase++;
    }

    if (result.take) {
      zone.heart && sum.takeHeart++;
      zone.edge && sum.takeShadow++;
      zone.waste && sum.takeChase++;
    }

    zone.heart && sum.totalHeart++;
    zone.edge && sum.totalShadow++;
    zone.waste && sum.totalChase++;

    return sum;
  }, defaultCountByResult);

  const topValues = {
    topRight: {
      value: 999,
      percents: (pitchesCountByResult.swingChase * 100) / filteredPitchesCount,
      footer: null
    },
    bottomRight: {
      value: 999,
      percents: (pitchesCountByResult.takeChase * 100) / filteredPitchesCount,
      footer: null
    },
    topCenter: {
      value: 999,
      percents: (pitchesCountByResult.swingShadow * 100) / filteredPitchesCount,
      footer: null
    },
    bottomCenter: {
      value: 999,
      percents: (pitchesCountByResult.takeShadow * 100) / filteredPitchesCount,
      footer: null
    },
    topLeft: {
      value: 999,
      percents: (pitchesCountByResult.swingHeart * 100) / filteredPitchesCount,
      footer: null
    },
    bottomLeft: {
      value: 999,
      percents: (pitchesCountByResult.takeHeart * 100) / filteredPitchesCount,
      footer: null
    }
  };

  const bottomValues = {
    topRight: {
      value: 999,
      percents: (pitchesCountByResult.totalChase * 100) / filteredPitchesCount,
      footer: 'Chase'
    },
    topCenter: {
      value: 999,
      percents: (pitchesCountByResult.totalShadow * 100) / filteredPitchesCount,
      footer: 'Shadow'
    },
    topLeft: {
      value: 999,
      percents: (pitchesCountByResult.totalHeart * 100) / filteredPitchesCount,
      footer: 'Heart'
    }
  };

  return (
    <>
      {/* Top line titles */}
      <text x={left} y={center - 5} className={cl.percentTitle}>
        Swing
      </text>
      <text x={left} y={center + 15} className={cl.percentTitle}>
        Take
      </text>
      {/* Bottom line titles */}
      <text x={left} y={center + 170} className={cl.percentTitle}>
        Pitches
      </text>
      <text x={left} y={center + 185} className={cl.percentTitle}>
        by zone
      </text>
      <Columns right={left + 167} center={center} values={topValues} />
      {/* Bottom columns */}
      <Columns right={left + 167} center={center + 190} values={bottomValues} />

      {/* Top line */}
      <line x1={left} y1={center} x2={left + 167} y2={center} stroke='#ACACAC' />
      {/* Bottom line */}
      <line x1={left} y1={center + 190} x2={left + 167} y2={center + 190} stroke='#ACACAC' />
    </>
  );
};

const LeftChart = ({ data, filteredData, selectedPitchType, preview }) => {
  const mainTitle = selectedPitchType ?? 'All pitches';

  return (
    <>
      <Frames
        top={40}
        title1={mainTitle}
        filteredData={filteredData}
        selectedPitchType={selectedPitchType}
        preview={preview}
      />
      <PercentsGraph
        left={PARAMS.SIDE_PADDING + 179 + 45}
        center={106}
        filteredData={filteredData}
        selectedPitchType={selectedPitchType}
        preview={preview}
      />
    </>
  );
};

const TwinPitchesGraph = ({ data, filteredData, selectedPitchType = null, preview }) => {
  console.log(filteredData);
  return (
    <svg
      viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
      xmlns='http://www.w3.org/2000/svg'
      className={cl.wrapper}
      preserveAspectRatio='none'>
      <LeftChart
        data={data}
        filteredData={filteredData}
        selectedPitchType={selectedPitchType}
        preview={preview}
      />
    </svg>
  );
};

export default TwinPitchesGraph;
