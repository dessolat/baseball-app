import React from 'react';
import cl from './FilteredGraphs.module.scss';

const LeftColumnOptions = () => {
  return (
    <div className={cl.leftColumnWrapper}>
      <h3>Dataset filter</h3>
    </div>
  );
};

const GraphsHeader = () => {
  return <h3>Machine vision statistics</h3>;
};

const RightColumnGraphs = () => {
  return (
    <div className={cl.rightColumnWrapper}>
      <GraphsHeader />
    </div>
  );
};

const FilteredGraphs = () => {
  return (
    <div className={cl.filteredGraphsWrapper}>
      <LeftColumnOptions />
      <RightColumnGraphs />
    </div>
  );
};

export default FilteredGraphs;
