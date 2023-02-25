import { useState } from 'react';
import cl from './FilteredGraphs.module.scss';

const GraphsTimeDynamicBlock = ({ defaultOption, defaultOption2, children, ...props }) => {
  const [currentOption, setCurrentOption] = useState(defaultOption);
  const [currentOption2, setCurrentOption2] = useState(defaultOption2);

  return (
    <div className={cl.graphsBlock} {...props}>
      {children(currentOption, setCurrentOption, currentOption2, setCurrentOption2)}
    </div>
  );
};

export default GraphsTimeDynamicBlock;
