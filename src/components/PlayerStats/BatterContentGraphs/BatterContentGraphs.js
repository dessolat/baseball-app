import React from 'react';
import cl from './BatterContentGraphs.module.scss';
// import Banner from './Banner/Banner';
import FilteredGraphs from './FilteredGraphs/FilteredGraphs';

const BatterContentGraphs = ({ battingData }) => {
  const isFilteredGraphs = !!battingData;
	
  return (
    <div className={cl.graphsWrapper}>
      {/* <Banner /> */}
      {isFilteredGraphs && <FilteredGraphs battingData={battingData} />}
    </div>
  );
};

export default BatterContentGraphs;
