import { useState } from "react";
import cl from './FilteredGraphs.module.scss';

const GraphsBlock = ({ defaultOption, children }) => {
  const [currentOption, setCurrentOption] = useState(defaultOption);

  return <div className={cl.graphsBlock}>{children(currentOption, setCurrentOption)}</div>;
};

export default GraphsBlock;
