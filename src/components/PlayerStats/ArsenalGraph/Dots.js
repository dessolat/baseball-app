import { Fragment } from 'react';
import { getPitchColorByName } from 'utils';

const Dots = ({ PARAMS, leftMarks, pitchTypes, yScaleMultiplier }) => {
  const { leftValues, summary } = leftMarks;

  const minValue = +leftValues[0];

  const typesArr = Object.values(summary);

  const totalColumns = Object.keys(summary).length;

  const columnStartX =
    PARAMS.HORIZONTAL_GRID_LINES_LEFT + PARAMS.HORIZONTAL_GRID_LINES_WIDTH / (totalColumns + 1);
  const rowsStartY = PARAMS.HORIZONTAL_GRID_LINES_TOP + PARAMS.GRAPH_LINES_HEIGHT;
  return (
    <>
      {typesArr.map((types, i) => {
        return (
          <Fragment key={i}>
            {types['-1'] && (
              <circle
                cx={columnStartX * (i + 1)}
                cy={rowsStartY - (types['-1'] - minValue) * yScaleMultiplier}
                r='3'
                fill={getPitchColorByName('All Pitches')}
              />
            )}
            {types['0'] && <circle cx={columnStartX * (i + 1)} cy={rowsStartY - (types['0'] - minValue) * yScaleMultiplier} r='3' fill={getPitchColorByName(pitchTypes[0])} />}
            {types['1'] && <circle cx={columnStartX * (i + 1)} cy={rowsStartY - (types['1'] - minValue) * yScaleMultiplier} r='3' fill={getPitchColorByName(pitchTypes[1])} />}
            {types['2'] && <circle cx={columnStartX * (i + 1)} cy={rowsStartY - (types['2'] - minValue) * yScaleMultiplier} r='3' fill={getPitchColorByName(pitchTypes[2])} />}
            {types['3'] && <circle cx={columnStartX * (i + 1)} cy={rowsStartY - (types['3'] - minValue) * yScaleMultiplier} r='3' fill={getPitchColorByName(pitchTypes[3])} />}
            {types['4'] && <circle cx={columnStartX * (i + 1)} cy={rowsStartY - (types['4'] - minValue) * yScaleMultiplier} r='3' fill={getPitchColorByName(pitchTypes[4])} />}
          </Fragment>
        );
      })}
    </>
  );
};

export default Dots