import ArsenalGraph from 'components/PlayerStats/ArsenalGraph/ArsenalGraph';

const ArsenalGraphs = ({ filteredData, currentOption, currentOption2, pitchClasses }) => {
  return (
    <>
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchClasses={pitchClasses}
        title='Swing'
        graphType='SwingByType'
        classColor
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchClasses={pitchClasses}
        title='Take'
        graphType='TakeByType'
        classColor
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchClasses={pitchClasses}
        title='Miss & soft hit'
        graphType='SoftByType'
        classColor
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchClasses={pitchClasses}
        title='Base hits & Hard hits vs PA'
        graphType='HardByType'
        classColor
      />
    </>
  );
};

export default ArsenalGraphs;
