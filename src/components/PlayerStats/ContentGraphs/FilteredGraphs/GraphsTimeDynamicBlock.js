import { useState } from 'react';
import cl from './FilteredGraphs.module.scss';

const GraphsTimeDynamicBlock = ({ defaultOption, defaultOption2, children, ...props }) => {
  const calculatedDefOptions2 = defaultOption2.reduce(
    (sum, option) => {
      sum.push({ name: option, checked: true });

      return sum;
    },
    [
      {
        name: 'All Pitches',
        checked: true
      }
    ]
  );

  const [currentOption, setCurrentOption] = useState(defaultOption);
  const [currentOption2, setCurrentOption2] = useState(calculatedDefOptions2);

  return (
    <div className={cl.graphsBlock} {...props}>
      {children(currentOption, setCurrentOption, currentOption2, setCurrentOption2)}
    </div>
  );
};

export default GraphsTimeDynamicBlock;
