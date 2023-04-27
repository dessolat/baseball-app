import PitchesSpeedField from '../PitchesSpeedField/PitchesSpeedField';
import TwinPitchesGraph from '../TwinPitchesGraph/TwinPitchesGraph';
import cl from './ThreeGraphsRow.module.scss';

const ThreeGraphsRow = ({ currentOption, setCurrentOption }) => {
  return (
    <div className={cl.wrapper}>
      <TwinPitchesGraph style={{ flex: 278 }} />
      <PitchesSpeedField
        optionsArr={['Types', 'All Pitches']}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
      />
    </div>
  );
};

export default ThreeGraphsRow;
