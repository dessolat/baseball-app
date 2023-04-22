import { useState } from 'react';
import cl from './GraphsBlock.module.scss';

const GraphsBlock = ({ defaultOption = null, children, noSelector = false, ...props }) => {
  const [currentOption, setCurrentOption] = useState(defaultOption);

  if (noSelector)
    return (
      <div className={cl.graphsBlock} {...props}>
        {children}
      </div>
    );

  return (
    <div className={cl.graphsBlock} {...props}>
      {children(currentOption, setCurrentOption)}
    </div>
  );
};

export default GraphsBlock;
