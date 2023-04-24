import cl from './PitchersReleaseSpeeds.module.scss';
import HorizontalRows from './HorizontalRows';
import { getRndValue } from 'utils';
import { memo } from 'react';
import LeftValues from './LeftValues';
import VerticalPitcherRowsAndTitles from './VerticalPitcherRowsAndTitles';
import Dots from './Dots';

const PARAMS = {
  WRAPPER_WIDTH: 1248,
  WRAPPER_HEIGHT: 330,
  LEFT_PADDING: 99,
  TOP_PADDING: 139,
  GRAPH_HEIGHT: 102,
  GRAPH_WIDTH: 1131,
  ROWS_NUMBER: 4,
  MIN_MAX_VALUES_GAP: 5
};

const PitchersReleaseSpeeds = () => {
  // Default data
  const data = [
    { pitcherName: 'SURNAME Name Pitcher 1', pitches: [] },
    { pitcherName: 'SURNAME Name Pitcher 2', pitches: [] },
    { pitcherName: 'SURNAME Name Pitcher 3', pitches: [] },
    { pitcherName: 'SURNAME Name Pitcher 4', pitches: [] }
  ];

  // Data generation
  const addedData = data.reduce((sum, pitcherData) => {
    const pitchesCount = getRndValue(8, 25);

    for (let i = 0; i < pitchesCount; i++) {
      const pitchType = getRndValue(0, 3);
      const speed = getRndValue(55, 90);

      pitcherData.pitches.push({ speed, pitchType });
    }

    sum.push(pitcherData);

    return sum;
  }, []);

  // Min & max values calculating
  const minMaxValues = addedData.reduce((sum, pitcherData) => {
    const speedsArr = pitcherData.pitches.map(({ speed }) => speed);

    const minSpeed = Math.min(...speedsArr);
    const maxSpeed = Math.max(...speedsArr);

    if (!sum.min || minSpeed < sum.min) sum.min = minSpeed;
    if (!sum.max || maxSpeed > sum.max) sum.max = maxSpeed;

    return sum;
  }, {});

  minMaxValues.min -= PARAMS.MIN_MAX_VALUES_GAP;
  minMaxValues.max += PARAMS.MIN_MAX_VALUES_GAP;

  // Lines and balls calc
  const linesArr = addedData.reduce((sum, pitcherData, i) => {
    const lineData = {
      pitcherName: pitcherData.pitcherName,
      count: pitcherData.pitches.length,
      accum: (sum[i - 1]?.accum ?? 0) + pitcherData.pitches.length,
      pitches: pitcherData.pitches
    };

    sum.push(lineData);
    return sum;
  }, []);

  const totalPitchesCount = addedData.reduce((sum, pitcherData) => sum + pitcherData.pitches.length, 0);
  const pitchDeltaWidth = PARAMS.GRAPH_WIDTH / totalPitchesCount;
  return (
    <svg
      viewBox={`0 0 ${PARAMS.WRAPPER_WIDTH} ${PARAMS.WRAPPER_HEIGHT}`}
      width='100%'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
      <HorizontalRows PARAMS={PARAMS} />
      <LeftValues PARAMS={PARAMS} minMaxValues={minMaxValues} />
      <VerticalPitcherRowsAndTitles
        PARAMS={PARAMS}
        linesArr={linesArr}
        totalPitchesCount={totalPitchesCount}
        pitchDeltaWidth={pitchDeltaWidth}
      />
      <Dots
        PARAMS={PARAMS}
        linesArr={linesArr}
        minMaxValues={minMaxValues}
        pitchDeltaWidth={pitchDeltaWidth}
      />
    </svg>
  );
};

export default memo(PitchersReleaseSpeeds);
