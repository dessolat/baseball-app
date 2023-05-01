import { getPitchColorByName } from 'utils';
import PitchesSpeedField from '../PitchesSpeedField/PitchesSpeedField';
import TwinPitchesGraph from '../TwinPitchesGraph/TwinPitchesGraph';
import cl from './ThreeGraphsRow.module.scss';

const ThreeGraphsRow = ({ currentOption, setCurrentOption, pitcher }) => {
  const { pitch_types: pitchTypes } = pitcher.preview;

	const relValuesData = pitcher.pitches_all.reduce((sum, pitch) => {
    const { speed, pitch_type, pitchGraphCoords } = pitch.pitch_info;
    const pitchType = pitchTypes[pitch_type];

    if (sum[pitchType] !== undefined) {
      sum[pitchType].count += 1;
      sum[pitchType].speeds.push(speed * 2.24);
      sum[pitchType].pitchGraphCoords.push({ ...pitchGraphCoords, color: getPitchColorByName(pitchType) });

      return sum;
    }

    sum[pitchType] = {
      count: 1,
      speeds: [speed * 2.24],
      pitchGraphCoords: [{ ...pitchGraphCoords, color: getPitchColorByName(pitchType) }]
    };

    return sum;
  }, {});

  return (
    <div className={cl.wrapper}>
      <TwinPitchesGraph filteredData={pitcher.pitches_all} preview={pitcher.preview} style={{ flex: 278 }} />
      <PitchesSpeedField
        optionsArr={['Types', 'All Pitches']}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
        filteredData={pitcher.pitches_all}
        preview={pitcher.preview}
				relValuesData={relValuesData}
      />
    </div>
  );
};

export default ThreeGraphsRow;
