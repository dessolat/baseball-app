import FrequencySpeedGraph from './FrequencySpeedGraph/FrequencySpeedGraph';
// import FieldImg from 'images/player_stats_field.jpg';
import cl from './PitchesSpeedField.module.scss';
import FieldGraph from './FieldGraph/FieldGraph';

const PitchesSpeedField = ({ data, relValuesData, ...props }) => {
  return (
    <div className={cl.pitchesSpeedFieldWrapper}>
      <FrequencySpeedGraph data={data} relValuesData={relValuesData} />
      <FieldGraph {...props} />
      {/* <img src={FieldImg} alt='field' /> */}
    </div>
  );
};

export default PitchesSpeedField;
