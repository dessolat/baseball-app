import { useState } from 'react';
import { graphsBlock } from './FilteredGraphs.module.scss';

const GraphsTimeDynamicBlock = ({ defaultOption, defaultOption2, defaultOption3, children, ...props }) => {
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
  const [currentOption3, setCurrentOption3] = useState(defaultOption3);

  return (
    <div
      className={graphsBlock}
      style={{ overflowY: 'clip', maxHeight: currentOption3 === 'opened' ? '100%' : '4.2rem' }}
      {...props}>
      {children(
        currentOption,
        setCurrentOption,
        currentOption2,
        setCurrentOption2,
        currentOption3,
        setCurrentOption3
      )}
    </div>
  );
};

export default GraphsTimeDynamicBlock;
