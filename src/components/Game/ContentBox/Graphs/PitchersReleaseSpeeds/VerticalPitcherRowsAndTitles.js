import { Fragment } from 'react';
import { leftValue } from './PitchersReleaseSpeeds.module.scss';

const VerticalPitcherRowsAndTitles = ({ PARAMS, linesArr, totalPitchesCount, pitchDeltaWidth }) => {
  return (
    <>
      {linesArr.map((lineData, i, arr) => {
        const xCoord = PARAMS.LEFT_PADDING + pitchDeltaWidth * lineData.accum;

        // Top Y coord calc
        let topYCoord = 0;
        if (i === 0 || lineData.count / totalPitchesCount >= 0.14) topYCoord = PARAMS.TOP_PADDING - 45;
        if (
          i !== 0 &&
          lineData.count / totalPitchesCount < 0.14 &&
          arr[i - 1].count / totalPitchesCount >= 0.14
        )
          topYCoord = PARAMS.TOP_PADDING - 70;
        if (
          i !== 0 &&
          lineData.count / totalPitchesCount < 0.14 &&
          arr[i - 1].count / totalPitchesCount < 0.14
        )
          topYCoord = PARAMS.TOP_PADDING - 95;
        return (
          <Fragment key={`pitcher-line-${i}`}>
            <text x={xCoord - 5} y={topYCoord + 12} className={leftValue}>
              {lineData.pitcherName}
            </text>
            <line
              x1={xCoord}
              x2={xCoord}
              y1={topYCoord}
              y2={PARAMS.TOP_PADDING + PARAMS.GRAPH_HEIGHT}
              stroke='#E3E1E1'
              strokeDasharray='4 2'
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default VerticalPitcherRowsAndTitles;
