import ArsenalGraph from 'components/PlayerStats/ArsenalGraph/ArsenalGraph';

const ArsenalGraphs = ({ filteredData, currentOption, currentOption2, pitchTypes }) => {
  return (
    <>
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Pitches'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Pitch, %'
        graphType='PitchesRel'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Speed, mph'
        graphType='Speed'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Spin, rpm'
        graphType='Spin'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Vertical break, sm'
        graphType='VerticalBreak'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Horizontal break, sm'
        graphType='HorizontalBreak'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='In zone, %'
        graphType='InZone'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Out zone, %'
        graphType='OutZone'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Inside, %'
        graphType='Inside'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Outside, %'
        graphType='Outside'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='Low, %'
        graphType='Low'
      />
      <ArsenalGraph
        filteredData={filteredData}
        currentTimeInterval={currentOption}
        currentPitchTypes={currentOption2}
        pitchTypes={pitchTypes}
        title='High, %'
        graphType='High'
      />
    </>
  );
};

export default ArsenalGraphs;
