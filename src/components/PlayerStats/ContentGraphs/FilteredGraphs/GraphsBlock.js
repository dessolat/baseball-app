import { useState } from 'react';
import cl from './FilteredGraphs.module.scss';

const GraphsBlock = ({ defaultOption, children, ...props }) => {
  const [currentOption, setCurrentOption] = useState(defaultOption);

  return (
    <div className={cl.graphsBlock} {...props}>
      {children(currentOption, setCurrentOption)}
    </div>
  );
};

export default GraphsBlock;
