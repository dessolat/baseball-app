import { leftValue } from './FacedGraph.module.scss';

const LeftValues = ({ maxCount, PARAMS }) => {
  const valuesDelta = maxCount / PARAMS.ROWS_NUMBER;
  const graphDelta = PARAMS.GRAPH_HEIGHT / PARAMS.ROWS_NUMBER;

  const hitsValues = [];
  for (let i = 0; i <= PARAMS.ROWS_NUMBER; i++) {
    hitsValues.push(valuesDelta * i);
  }
  hitsValues.reverse();

  const xCoord = PARAMS.PADDING_LEFT - 8;
  return (
    <>
      {hitsValues.map((value, i) => {
        const yCoord = PARAMS.PADDING_TOP + graphDelta * i + 5;

        return (
          <>
            {!(value % 1 || value === 0) && (
              <text key={`left-value-${i}`} x={xCoord} y={yCoord} className={leftValue}>
                {value}
              </text>
            )}
          </>
        );
      })}
    </>
  );
};

export default LeftValues;
