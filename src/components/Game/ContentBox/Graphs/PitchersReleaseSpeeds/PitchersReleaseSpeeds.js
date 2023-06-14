import cl from './PitchersReleaseSpeeds.module.scss';
import HorizontalRows from './HorizontalRows';
import { memo } from 'react';
import LeftValues from './LeftValues';
import VerticalPitcherRowsAndTitles from './VerticalPitcherRowsAndTitles';
import Dots from './Dots';
import Legend from './Legend/Legend';
import MobileScrollingWrapper from 'components/PlayerStats/MobileScrollingWrapper/MobileScrollingWrapper';

const PARAMS = {
  WRAPPER_WIDTH: 1248,
  WRAPPER_HEIGHT: 330,
  LEFT_PADDING: 99,
  TOP_PADDING: 139,
  GRAPH_HEIGHT: 102,
  GRAPH_WIDTH: 1131,
  ROWS_NUMBER: 4,
  MIN_MAX_VALUES_GAP: 1
};

const PitchersReleaseSpeeds = ({ metrix }) => {
  // Default data
  const addedData = metrix.reduce((sum, { preview, pitches_all }) => {
    const pitcherData = {};
    pitcherData.pitcherName = `${preview.pitcher_name} ${preview.pitcher_surname}`;
    pitcherData.pitches = pitches_all.reduce(
      (pitchesSum, { pitch_info: { pitch_type: pitchType, speed, mom_id, game_id } }) => {
        const pitch = { pitchType, speed: speed * 2.24, mom_id, game_id };
        pitchesSum.push(pitch);

        return pitchesSum;
      },
      []
    );
    pitcherData.pitchTypes = preview.pitch_types;

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
      pitches: pitcherData.pitches,
      pitchTypes: pitcherData.pitchTypes
    };

    sum.push(lineData);
    return sum;
  }, []);

  const totalPitchesCount = addedData.reduce((sum, pitcherData) => sum + pitcherData.pitches.length, 0);
  const pitchDeltaWidth = PARAMS.GRAPH_WIDTH / totalPitchesCount;

  const legendPitchTypes = Array.from(
    new Set(metrix.map(pitcher => pitcher.preview.pitch_types).reduce((sum, arr) => sum.concat(arr), []))
  );

  return (
    <MobileScrollingWrapper>
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
      <Legend legendData={legendPitchTypes} />
    </MobileScrollingWrapper>
  );
};

export default memo(PitchersReleaseSpeeds);
