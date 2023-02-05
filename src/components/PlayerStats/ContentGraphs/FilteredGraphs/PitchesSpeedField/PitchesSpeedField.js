import FrequencySpeedGraph from './FrequencySpeedGraph/FrequencySpeedGraph';
import FieldImg from 'images/player_stats_field.jpg';
import cl from './PitchesSpeedField.module.scss'

const PitchesSpeedField = () => {
  return (
    <div className={cl.pitchesSpeedFieldWrapper}>
      <FrequencySpeedGraph />
      <img src={FieldImg} alt='field' />
    </div>
  );
};

export default PitchesSpeedField