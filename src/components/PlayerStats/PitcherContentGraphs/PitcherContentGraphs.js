import React from 'react';
import cl from './PitcherContentGraphs.module.scss';
import Banner from './Banner/Banner';
import FilteredGraphs from './FilteredGraphs/FilteredGraphs';

const PitcherContentGraphs = ({ pitchesData }) => {
  const isFilteredGraphs = !!pitchesData;
	
  return (
    <div className={cl.graphsWrapper}>
      <Banner />
      {isFilteredGraphs && <FilteredGraphs pitchesData={pitchesData} />}
    </div>
  );
};

export default PitcherContentGraphs;
