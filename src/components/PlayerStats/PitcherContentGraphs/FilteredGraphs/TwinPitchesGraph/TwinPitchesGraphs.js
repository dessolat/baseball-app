import { twinGraphsWrapper } from '../FilteredGraphs.module.scss';
import TwinPitchesGraph from './TwinPitchesGraph';

const TwinPitchesGraphs = ({ relValuesData, preview, currentOption, filteredData }) => {
  return (
    <div className={twinGraphsWrapper}>
      <TwinPitchesGraph
        data={relValuesData}
        filteredData={filteredData}
        preview={preview}
        currentOption={currentOption}
      />

      {Object.entries(relValuesData)
        .sort((a, b) => (a[1].count > b[1].count ? -1 : 1))
        .map((entry, index) => (
          <TwinPitchesGraph
            key={index}
            data={relValuesData}
            filteredData={filteredData}
            selectedPitchType={entry[0]}
            preview={preview}
            currentOption={currentOption}
          />
        ))}
    </div>
  );
};

export default TwinPitchesGraphs;
