import React from 'react';
import cl from './PitcherContentGraphs.module.scss';
import Banner from './Banner/Banner';
import FilteredGraphs from './FilteredGraphs/FilteredGraphs';
import { useSelector } from 'react-redux';

const PitcherContentGraphs = ({ pitchesData }) => {
  const isFilteredGraphs = !!pitchesData;
	const isMobile = useSelector(s => s.shared.isMobile)
	
  return (
    <div className={cl.graphsWrapper}>
      <Banner />
      {isFilteredGraphs && !isMobile && <FilteredGraphs pitchesData={pitchesData} />}
    </div>
  );
};

export default PitcherContentGraphs;
