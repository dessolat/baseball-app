import FrequencySpeedGraph from './FrequencySpeedGraph/FrequencySpeedGraph';
import FieldGraph from './FieldGraph/FieldGraph';

const PitchesSpeedField = ({ filteredData = [], preview = {}, relValuesData = {}, ...props }) => {
  return (
    <>
      <FrequencySpeedGraph data={filteredData} relValuesData={relValuesData} style={{ flex: 457 }} />
      <FieldGraph filteredData={filteredData} relValuesData={relValuesData} preview={preview} style={{ flex: 457 }} {...props} />
    </>
  );
};

export default PitchesSpeedField;
