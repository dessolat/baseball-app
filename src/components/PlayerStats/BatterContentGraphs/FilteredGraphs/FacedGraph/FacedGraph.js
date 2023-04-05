import GraphImg from 'images/faced_graph.jpg';
import cl from './FacedGraph.module.scss';

const FacedGraph = () => {
  return <img src={GraphImg} className={cl.graphThumb} alt='' />;
};

export default FacedGraph;
