import { degToRad } from 'three/src/math/MathUtils';
import BgLayout from './BgLayout';
import cl from './HitsAnglesGraph.module.scss';

const PARAMS = {
  GRAPH_WIDTH: 307,
  GRAPH_HEIGHT: 423,
  LINE_WIDTH: 179,
  ZERO_X: 98.45,
  ZERO_Y: 230.35
  // GRAPH_WIDTH: 313,
  // GRAPH_HEIGHT: 428
};

const Segment = ({ angle, dataField, minMaxValue }) => {
  const { min, max } = minMaxValue;
  const { deg } = angle;

  const minMaxDelta = max - min;
  const rel = (angle[dataField] - min) / minMaxDelta;

  let path = `M${PARAMS.ZERO_X},${PARAMS.ZERO_Y}`;

  let secondDotXCoord = PARAMS.LINE_WIDTH * rel * Math.cos(degToRad(deg + 10)) + PARAMS.ZERO_X;
  let secondDotYCoord = PARAMS.ZERO_Y - PARAMS.LINE_WIDTH * rel * Math.sin(degToRad(deg + 10));
  path += `L${secondDotXCoord},${secondDotYCoord}`;

  let centerDotXCoord = PARAMS.LINE_WIDTH * rel * 1.005 * Math.cos(degToRad(deg + 5)) + PARAMS.ZERO_X;
  let centerDotYCoord = PARAMS.ZERO_Y - PARAMS.LINE_WIDTH * rel * 1.005 * Math.sin(degToRad(deg + 5));

  let thirdDotXCoord = PARAMS.LINE_WIDTH * rel * Math.cos(degToRad(deg)) + PARAMS.ZERO_X;
  let thirdDotYCoord = PARAMS.ZERO_Y - PARAMS.LINE_WIDTH * rel * Math.sin(degToRad(deg));

  path += `Q${centerDotXCoord},${centerDotYCoord} ${thirdDotXCoord},${thirdDotYCoord}Z`;

  const pathFillColor = `hsla(${169 + 0.41 * rel * 100}, 30%, ${88 - 0.15 * rel * 100}%, 1)`;
  return <path d={path} fill={pathFillColor} className={cl.animated}/>;
};

const Segments = ({ angleValues, dataField }) => {
  const minMaxValue = angleValues.reduce(
    (sum, value) => {
      if (value[dataField] > sum.max) sum.max = value[dataField];
      if (value[dataField] < sum.min) sum.min = value[dataField];

      return sum;
    },
    { min: 0, max: 0 }
  );

  return (
    <>
      {angleValues.map((angle, i) => (
        <Segment key={i} angle={angle} dataField={dataField} minMaxValue={minMaxValue} />
      ))}
    </>
  );
};

const HitsAnglesGraph = ({ title, angleValues, dataField }) => {
  return (
    <svg
      width='307'
      height='423'
      viewBox='0 0 307 423'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
      <BgLayout />
      {/* <circle r={1} stroke='red' cx={PARAMS.ZERO_X} cy={PARAMS.ZERO_Y} />
      <circle r={1} stroke='red' cx={centerDotXCoord} cy={centerDotYCoord} /> */}

      {/* Title */}
      <text x='0' y='20' className={cl.title}>
        {title}
      </text>

      <Segments angleValues={angleValues} dataField={dataField} />

      {/* <path d={path} fill='lightblue' /> */}
    </svg>
  );
};

export default HitsAnglesGraph;
