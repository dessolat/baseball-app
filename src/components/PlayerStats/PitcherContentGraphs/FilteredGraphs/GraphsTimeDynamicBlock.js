import { useState } from 'react';
import cl from './FilteredGraphs.module.scss';
import classNames from 'classnames';

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
        checked: true
      }
    ]
  );

  const [currentOption, setCurrentOption] = useState(defaultOption);
  const [currentOption2, setCurrentOption2] = useState(calculatedDefOptions2);
  const [currentOption3, setCurrentOption3] = useState(defaultOption3);

  const wrapperClasses = classNames(cl.graphsBlock, cl.dynamicBlock, {
    [cl.openedHeight]: currentOption3 === 'opened',
    [cl.closedHeight]: currentOption3 !== 'opened'
  });
  return (
    <div className={wrapperClasses} {...props}>
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
