import { graphMainTitle } from './TwinPitchesGraph.module.scss';

const GraphTitle = ({ title }) => {
  return <h4 className={graphMainTitle}>{title}</h4>;
};

export default GraphTitle;
