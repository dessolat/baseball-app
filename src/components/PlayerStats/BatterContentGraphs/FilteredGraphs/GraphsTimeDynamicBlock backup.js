import { useState } from 'react';
import cl from './FilteredGraphs.module.scss';

const GraphsTimeDynamicBlock = ({ defaultOption, defaultOption2, children, ...props }) => {
  const calculatedDefOptions2 = defaultOption2.reduce(
    (sum, option, index) => {
      sum.push({ name: option, type: index, checked: true });

      return sum;
    },
    [
      {
        name: 'All Pitches',
				type: -1,
        checked: false
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
