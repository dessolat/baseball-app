import { Fragment } from 'react';
import cl from './ArsenalGraph.module.scss';

const HorizontalLinesAndNumbers = ({ PARAMS, marks, graphType }) => {
  const isLeftMarks = marks.some(value => !isNaN(value));

  return (
    <>
      {marks.map((number, i) => {
        const leftMarkValue = graphType !== 'VerticalBreak' ? number : (-number).toFixed(1);

        return (
          <Fragment key={i}>
            {/* Horizontal lines */}
            <line
              x1={PARAMS.ZERO_COORDS.X}
              y1={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
              x2={PARAMS.ZERO_COORDS.X + PARAMS.HORIZONTAL_GRID_LINES_WIDTH}
              y2={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * (i + 1)}
              stroke='#E3E1E1'
              strokeDasharray='4 2'
            />
            {/* Left numbers */}
            {isLeftMarks && (
              <text
                x={PARAMS.LEFT_PADDING}
                y={PARAMS.ZERO_COORDS.Y - PARAMS.HORIZONTAL_GRID_LINES_STEP * i + 5}
                className={cl.leftNumber}>
                {leftMarkValue}
              </text>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default HorizontalLinesAndNumbers;
