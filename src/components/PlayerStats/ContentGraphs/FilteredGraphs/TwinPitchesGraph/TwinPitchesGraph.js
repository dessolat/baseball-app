import cl from './TwinPitchesGraph.module.scss';

const PARAMS = {
  GRAPH_WIDTH: 463,
  GRAPH_HEIGHT: 388,
  SIDE_PADDING: 30
};

const Dots = ({ coords }) => {
  // const [radius, setRadius] = useState(1);

  // useEffect(() => {
  //   setRadius(1);

  //   setTimeout(() => {
  //     setRadius(8);
  //   }, 300);
  // }, [coords]);

  return (
    <>
      {coords.map((coord, i) => {
        const { x, y, color } = coord;

        return (
          <circle
            key={i}
            // key={`${i}-x-${x}-y-${y}`}
            cx={x}
            cy={y}
            // r={radius}
            stroke='black'
            strokeWidth='.5'
            fill={color}
            className={cl.animated}
          />
        );
      })}
    </>
  );
};

const Frames = ({ left, top, title1, oneColor = false, data }) => {
  // const dotsRectXCoord = left + 15;
  // const dotsRectYCoord = top + 22;
  // const dotsRectWidth = 149;
  // const dotsRectHeight = 195;

  // const numDotsOfColor = Math.ceil(Math.random() * 20);
  // const dotsColors = ['#CE9587', '#EBE8B0', '#B08194', '#CBC8E5', '#9BCEA2'];
  // const dotsCoordsSlice = oneColor ? 1 : dotsColors.length;

  const dotsCoords = Object.entries(data).reduce((sum, entry) => {
    // const xCoridorStart = Math.random() * (dotsRectWidth - 69);
    // const yCoridorStart = Math.random() * (dotsRectHeight - 55);

    // for (let i = 0; i < entry[1].count; i++) {
    //   const x = dotsRectXCoord + xCoridorStart + Math.random() * 69;
    //   const y = dotsRectYCoord + yCoridorStart + Math.random() * 55;
    // sum.push({ x, y, color: getPitchColorByName(entry[0]) });
    // }

    sum = [...sum, ...entry[1].pitchGraphCoords];

    return sum;
  }, []);


  return (
    <>
      {/* Frames */}
      <text x={left + 179 / 2} y={top - 5} className={cl.title}>
        {title1}
      </text>
      <rect
        x='14'
        y='14'
        width='217'
        height={PARAMS.GRAPH_HEIGHT - 14 - 33}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='transparent'
      />
      {/* <rect x={left} y={top} width='179' height='239' stroke='#B6DBD4' strokeWidth='2' fill='transparent' /> */}
      {/* <text x={left + 179 / 2} y={top - 15 + 31} className={cl.title}>
        {title2}
      </text> */}
      <rect
        // x='48'
        x={left + 18}
        y={top + 22}
        width={179 - 30}
        height={239 - 44}
        stroke='#B6DBD4'
        strokeWidth='2'
        fill='#EAEAEA'
      />
      {/* <text x={left + 179 / 2} y={top - 15 + 31 + 22} className={cl.title}>
        {title3}
      </text> */}

      {/* <text x={left + 179 / 2} y={top - 15 + 31 + 107} className={cl.title}>
        {title4}
      </text> */}
      <rect
        x={left + 18 + 15 * 2}
        y={top + 22 * 3}
        width={179 - 30 * 3}
        height={239 - 44 * 3}
        stroke='#96BCC0'
        strokeWidth='2'
        fill='#B6C6D6'
      />

      {/* Dots */}
      <Dots coords={dotsCoords} />

      {/* Dashed frame */}
      <rect
        x={left + 18 + 15}
        y={top + 22 * 2}
        width={179 - 30 * 2}
        height={239 - 44 * 2}
        stroke='#1A4C96'
        strokeWidth='2'
        strokeDasharray='8 2'
        fill='transparent'
      />
    </>
  );
};

const Column = ({ right, center, coef, data, columnHeight, reverse = false }) => {
  const { value, percents, footer } = data;

  const xCoord = right - 20;
  const yCoordFilled = reverse ? center : center - coef * percents;
  const yCoordEmpty = reverse ? coef * percents + center : center - columnHeight;

  const valueXCoord = xCoord + 10;
  const valueYCoord = reverse ? center + 12 : center - 5;

  const percentsYCoord = reverse ? center + columnHeight + 25 : 25;
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
      <rect
        x={xCoord}
        y={yCoordEmpty}
        width='20'
        height={coef * (100 - percents)}
        fill='#EAEAEA'
        className={cl.animated}
      />
      {/* Value */}
      <text x={valueXCoord} y={valueYCoord} className={cl.valueText}>
        {value}
      </text>
      {/* Percents */}
      <text x={valueXCoord} y={percentsYCoord} className={cl.percentValue}>
        {percents}%
      </text>
      {/* Footer */}
      {footer && (
        <text x={valueXCoord} y={percentsYCoord + 20} className={cl.valueText}>
          {footer}
        </text>
      )}
    </>
  );
};

const Columns = ({ right, center, values }) => {
  const { topRight, topCenter, topLeft, bottomRight, bottomCenter, bottomLeft } = values;

  const columnHeight = 239 / 2;
  const coef = columnHeight / 100;
  return (
    <>
      {/* Top columns */}
      <Column right={right} center={center} coef={coef} data={topRight} columnHeight={columnHeight} />
      <Column right={right - 42} center={center} coef={coef} data={topCenter} columnHeight={columnHeight} />
      <Column right={right - 42 * 2} center={center} coef={coef} data={topLeft} columnHeight={columnHeight} />
      {/* Bottom columns */}
      <Column
        right={right}
        center={center}
        coef={coef}
        data={bottomRight}
        columnHeight={columnHeight}
        reverse
      />
      <Column
        right={right - 42}
        center={center}
        coef={coef}
        data={bottomCenter}
        columnHeight={columnHeight}
        reverse
      />
      <Column
        right={right - 42 * 2}
        center={center}
        coef={coef}
        data={bottomLeft}
        columnHeight={columnHeight}
        reverse
      />
    </>
  );
};

const PercentsGraph = ({ left, center }) => {
  const values = {
    topRight: { value: 999, percents: Math.round(Math.random() * 100), footer: null },
    bottomRight: { value: 999, percents: Math.round(Math.random() * 100), footer: 'Chase' },
    topCenter: { value: 999, percents: Math.round(Math.random() * 100), footer: null },
    bottomCenter: { value: 999, percents: Math.round(Math.random() * 100), footer: 'Shadow' },
    topLeft: { value: 999, percents: Math.round(Math.random() * 100), footer: null },
    bottomLeft: { value: 999, percents: Math.round(Math.random() * 100), footer: 'Heart' }
  };

  return (
    <>
      <text x={left} y={center - 5} className={cl.percentTitle}>
        Swing
      </text>
      <text x={left} y={center + 15} className={cl.percentTitle}>
        Take
      </text>
      <Columns right={left + 167} center={center} values={values} />
      <line x1={left} y1={center} x2={left + 167} y2={center} stroke='#ACACAC' />
    </>
  );
};

const LeftChart = ({ data }) => {
  return (
    <>
      <Frames left={PARAMS.SIDE_PADDING} top={40} title1='All pitches' data={data} />
      <PercentsGraph left={PARAMS.SIDE_PADDING + 179 + 45} center={40 + 239 / 2} />
    </>
  );
};

// const RightChart = () => {
//   const leftCoord = PARAMS.GRAPH_WIDTH / 2 + 38;
//   return (
//     <>
//       <Frames
//         left={leftCoord}
//         top={40}
//         title1='Type1 (124)'
//         title2='+10 runs'
//         title3='+16 runs'
//         title4='+10 runs'
//         oneColor
//       />
//       <PercentsGraph left={leftCoord + 179 + 25} center={40 + 239 / 2} />
//     </>
//   );
// };

const TwinPitchesGraph = ({ data }) => {
  return (
    <svg
      viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
      xmlns='http://www.w3.org/2000/svg'
      className={cl.wrapper}
      preserveAspectRatio='none'>
      <LeftChart data={data} />
      {/* <RightChart /> */}
    </svg>
  );
};

export default TwinPitchesGraph;
