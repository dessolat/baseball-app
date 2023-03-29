import React from 'react';
import cl from './BatterContentGraphs.module.scss';
import Banner from './Banner/Banner';
// import FilteredGraphs from './FilteredGraphs/FilteredGraphs';

const BatterContentGraphs = ({ pitchesData }) => {
  // const isFilteredGraphs = !!pitchesData;
	
  return (
    <div className={cl.graphsWrapper}>
      <Banner />
      {/* {isFilteredGraphs && <FilteredGraphs pitchesData={pitchesData} />} */}
    </div>
  );
};

export default BatterContentGraphs;
