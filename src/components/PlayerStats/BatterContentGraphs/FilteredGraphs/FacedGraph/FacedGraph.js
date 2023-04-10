import BottomValues from './BottomValues';
import cl from './FacedGraph.module.scss';
import StaticLayout from './StaticLayout';

const PARAMS = {
  WRAPPER_WIDTH: 940,
  WRAPPER_HEIGHT: 365,
  GRAPH_WIDTH: 829,
  GRAPH_HEIGHT: 277,
  PADDING_LEFT: 63,
  PADDING_TOP: 27,
  ROWS_NUMBER: 4,
  COLS_NUMBER: 12
};

const FacedGraph = ({ data, preview }) => {
  console.log(data);
  console.log(preview);

  const { pitch_types: pitchTypes, pitch_classes: pitchClasses } = preview;

  const summary = data.reduce((sum, { pitch_info: { speed } }) => {
    if (sum.min === undefined || speed < sum.min) sum.min = speed;
    if (sum.max === undefined || speed > sum.max) sum.max = speed;

    return sum;
  }, {});

  summary.min *= 2.24;
  summary.max *= 2.24;

  return (
    <svg
      viewBox={`0 0 ${PARAMS.WRAPPER_WIDTH} ${PARAMS.WRAPPER_HEIGHT}`}
      width='100%'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
      {/* Layout */}
      <StaticLayout PARAMS={PARAMS} />

      {/* Bottom values */}
      <BottomValues summary={summary} PARAMS={PARAMS} />
    </svg>
  );
};

export default FacedGraph;
