import { degToRad } from 'three/src/math/MathUtils';
import BgLayout from './BgLayout';
import cl from './HitsAnglesGraph.module.scss';
import Footer from './Footer';

const PARAMS = {
  GRAPH_WIDTH: 307,
  GRAPH_HEIGHT: 450,
  LINE_WIDTH: 179,
  ZERO_X: 98.45,
  ZERO_Y: 230.35,
  RADIALS_NUMBER: 8
};

const MainTitle = ({ title }) => (
  <text x='0' y='20' className={cl.title}>
    {title}
  </text>
);

const MobileMainTitle = ({ title }) => <p className={cl.mobileTitle}>{title}</p>;

const RadialTitles = ({ minMaxValue, title }) => {
  const { min, max } = minMaxValue;

  const minMaxDelta = max - min;
  const valuePerCircle = minMaxDelta / PARAMS.RADIALS_NUMBER;

  const titles = [];
  for (let i = 1; i <= PARAMS.RADIALS_NUMBER; i++) {
    titles.push((min + valuePerCircle * i).toFixed(1));
  }

  const xCoord = PARAMS.ZERO_X - 4;
  return (
    <>
      {/* Center value */}
      {/* <text x={xCoord} y={PARAMS.ZERO_Y - 1} className={cl.leftValues} textAnchor='end'>
        {min}
      </text> */}

      {/* Top values */}
      {titles.map((value, i) => {
        const yCoord = PARAMS.ZERO_Y - 20 - i * 22.5;
        const filteredValue = title !== 'Hits by angle, hits' ? value : (value * 10) % 10 ? '' : +value;

        return (
          <text key={i} x={xCoord} y={yCoord} className={cl.leftValues} textAnchor='end'>
            {filteredValue}
          </text>
        );
      })}
      {/* Bottom values */}
      {titles.map((value, i) => {
        const yCoord = PARAMS.ZERO_Y + 20 + i * 22.5;
        const filteredValue = title !== 'Hits by angle, hits' ? value : (value * 10) % 10 ? '' : +value;

        return (
          <text key={i} x={xCoord} y={yCoord} className={cl.leftValues} textAnchor='end'>
            {filteredValue}
          </text>
        );
      })}
    </>
  );
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
  return <path d={path} fill={pathFillColor} className={cl.animated} />;
};

const Segments = ({ angleValues, dataField, minMaxValue }) => (
  <>
    {angleValues.map((angle, i) => (
      <Segment key={i} angle={angle} dataField={dataField} minMaxValue={minMaxValue} />
    ))}
  </>
);

const HitsAnglesGraph = ({
  title,
  angleValues,
  dataField,
  isFooter = true,
  footerField = '',
  footerUnits = ''
}) => {
  const minMaxValue = angleValues.reduce(
    (sum, value) => {
      if (value[dataField] > sum.max) sum.max = value[dataField];
      if (value[dataField] < sum.min) sum.min = value[dataField];

      return sum;
    },
    { min: 0, max: 0 }
  );

  return (
    <div className={cl.graphWrapper}>
      <MobileMainTitle title={title} />
      <svg
        width={PARAMS.GRAPH_WIDTH}
        height={PARAMS.GRAPH_HEIGHT}
        viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
        fill='none'
        className={cl.graph}
        xmlns='http://www.w3.org/2000/svg'>
        <BgLayout />

        {/* Title */}
        <MainTitle title={title} />

        {/* Radial Titles */}
        <RadialTitles minMaxValue={minMaxValue} title={title} />

        {/* Segments */}
        <Segments angleValues={angleValues} dataField={dataField} minMaxValue={minMaxValue} />

        {/* Footer */}
        {isFooter && (
          <Footer
            PARAMS={PARAMS}
            angleValues={angleValues}
            footerField={footerField}
            footerUnits={footerUnits}
          />
        )}
      </svg>
    </div>
  );
};

export default HitsAnglesGraph;
