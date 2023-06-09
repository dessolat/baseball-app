import TwinPitchesGraph from './TwinPitchesGraph';
import { twinGraphsWrapper } from '../FilteredGraphs.module.scss';
import { Fragment } from 'react';

const TwinPitchesGraphs = ({ relValuesData, preview, currentOption }) => {
  return (
    <div className={twinGraphsWrapper}>
      {Object.entries(relValuesData)
        .sort((a, b) => (a[1].count > b[1].count ? -1 : 1))
        .map((entry, index) => (
          <Fragment key={index}>
            <TwinPitchesGraph
              data={relValuesData}
              filteredData={entry[1].pitches}
              preview={preview}
              currentOption={currentOption}
              selectedPitchClass={entry[0]}
              title={entry[0]}
              subTitle1='Swing'
              subTitle2='Take'
            />
            <TwinPitchesGraph
              data={relValuesData}
              filteredData={entry[1].pitches}
              preview={preview}
              currentOption={currentOption}
              selectedPitchClass={entry[0]}
              subTitle1='Miss & soft hit'
              subTitle2='Base hit & Hard hit'
            />
          </Fragment>
        ))}
    </div>
  );
};

export default TwinPitchesGraphs;
