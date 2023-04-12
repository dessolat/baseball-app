import { bottomValue } from './FacedGraph.module.scss';

const BottomValues = ({ minMaxSpeed, PARAMS }) => {
  const valuesDelta = (Math.ceil(minMaxSpeed.max) - Math.floor(minMaxSpeed.min)) / PARAMS.COLS_NUMBER;
  const graphDelta = PARAMS.GRAPH_WIDTH / PARAMS.COLS_NUMBER;

  const valuesArr = [];
  for (let i = 0; i <= PARAMS.COLS_NUMBER; i++) {
    valuesArr.push(Math.round((Math.floor(minMaxSpeed.min) + valuesDelta * i) * 10) / 10);
  }

  const yCoord = PARAMS.PADDING_TOP + PARAMS.GRAPH_HEIGHT + 20;
  return (
    <>
      {valuesArr.map((value, i) => {
        const xCoord = PARAMS.PADDING_LEFT + i * graphDelta;

        return (
          <text key={`bottom-value-${i}`} x={xCoord} y={yCoord} className={bottomValue}>
            {value}
          </text>
        );
      })}
    </>
  );
};

export default BottomValues;
