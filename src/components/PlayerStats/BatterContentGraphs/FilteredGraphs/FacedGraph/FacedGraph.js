import cl from './FacedGraph.module.scss';

const PARAMS = {
  GRAPH_WIDTH: 940,
  GRAPH_HEIGHT: 365
};

const FacedGraph = () => {
  return (
    <svg
      viewBox={`0 0 ${PARAMS.GRAPH_WIDTH} ${PARAMS.GRAPH_HEIGHT}`}
      width='100%'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
				
			</svg>
  );
};

export default FacedGraph;
