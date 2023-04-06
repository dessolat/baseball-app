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

const FacedGraph = () => {
  return (
    <svg
      viewBox={`0 0 ${PARAMS.WRAPPER_WIDTH} ${PARAMS.WRAPPER_HEIGHT}`}
      width='100%'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
      <StaticLayout PARAMS={PARAMS} />
    </svg>
  );
};

export default FacedGraph;
