import React from 'react';
import cl from './ContentGraphs.module.scss';
import Banner from './Banner/Banner';
import FilteredGraphs from './FilteredGraphs/FilteredGraphs';

const ContentGraphs = ({ pitchesData }) => {
  const isFilteredGraphs = !!pitchesData;
	
  return (
    <div className={cl.graphsWrapper}>
      <Banner />
      {isFilteredGraphs && <FilteredGraphs pitchesData={pitchesData} />}
    </div>
  );
};

export default ContentGraphs;
