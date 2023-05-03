import { leftValue } from './PitchersReleaseSpeeds.module.scss';

const LeftValues = ({ PARAMS, minMaxValues }) => {
  const minMaxDelta = minMaxValues.max - minMaxValues.min;

  const valueStep = minMaxDelta / (PARAMS.ROWS_NUMBER - 1);

  const leftValues = [];
  for (let i = 0; i < PARAMS.ROWS_NUMBER; i++) {
    if (i === 0) {
      leftValues.push(Math.round(minMaxValues.max));
      continue;
    }

    if (i === PARAMS.ROWS_NUMBER - 1) {
      leftValues.push(Math.round(minMaxValues.min));
      continue;
    }

    leftValues.push(Math.round(minMaxValues.max - valueStep * i));
  }

  const rowStep = PARAMS.GRAPH_HEIGHT / (PARAMS.ROWS_NUMBER - 1);
  return (
    <>
      {leftValues.map((value, i) => (
        <text
          key={`left-value-${i}`}
          x={PARAMS.LEFT_PADDING - 25}
          y={PARAMS.TOP_PADDING + rowStep * i + 4}
          className={leftValue}>
          {value}
        </text>
      ))}
    </>
  );
};

export default LeftValues;
