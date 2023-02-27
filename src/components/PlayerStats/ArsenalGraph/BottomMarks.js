import { Fragment } from 'react';
import { MONTHS } from 'utils';
import cl from './ArsenalGraph.module.scss';

const BottomMarks = ({ PARAMS, bottomMarks, currentTimeInterval }) => {
  const marksInterval = PARAMS.HORIZONTAL_GRID_LINES_WIDTH / (bottomMarks.length + 1);
  const yCoords = [PARAMS.ZERO_COORDS.Y + 1, PARAMS.ZERO_COORDS.Y + 6];

  return (
    <>
      {bottomMarks.map((mark, i) => {
        const xCoord = PARAMS.ZERO_COORDS.X + marksInterval * (i + 1);

        const text =
          currentTimeInterval === 'Season'
            ? mark
            : currentTimeInterval === 'Month'
            ? `${MONTHS[+mark.slice(5, 7) - 1]}, ${mark.slice(2, 4)}`
            : mark.split('-').reverse().join('.');
        return (
          <Fragment key={'mark-' + i}>
            <line x1={xCoord} y1={yCoords[0]} x2={xCoord} y2={yCoords[1]} stroke='#ACACAC' />
            <text x={xCoord} y={PARAMS.ZERO_COORDS.Y + 18} className={cl.bottomNumber}>
              {text}
            </text>
          </Fragment>
        );
      })}
    </>
  );
};

export default BottomMarks;
