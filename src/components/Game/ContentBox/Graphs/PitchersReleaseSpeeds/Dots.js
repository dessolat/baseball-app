import { Fragment } from 'react';
import { getPitchColorByName } from 'utils';

const Dots = ({ PARAMS, linesArr, minMaxValues, pitchDeltaWidth }) => {
  const minMaxSpeedDelta = minMaxValues.max - minMaxValues.min;
  const heightPerValue = PARAMS.GRAPH_HEIGHT / minMaxSpeedDelta;

  const zeroYCoord = PARAMS.TOP_PADDING + PARAMS.GRAPH_HEIGHT;
  return (
    <>
      {linesArr.map((pitcherData, i) => {
        const { pitchTypes } = pitcherData;
        return (
          <Fragment key={`dots-${i}`}>
            {pitcherData.pitches.map((pitch, j, arr) => {
              let xCoord = PARAMS.LEFT_PADDING + pitchDeltaWidth * (j + 1);
              if (i > 0) xCoord += pitchDeltaWidth * (pitcherData.accum - arr.length);

              const yCoord = zeroYCoord - heightPerValue * (pitch.speed - minMaxValues.min);
              return (
                <circle
                  key={`dot-${i}-${j}`}
                  cx={xCoord}
                  cy={yCoord}
                  r='8'
                  stroke='black'
                  strokeWidth='.5'
                  fill={getPitchColorByName(pitchTypes[pitch.pitchType])}
                />
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
};

export default Dots;
