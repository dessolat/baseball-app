import React, { forwardRef } from 'react';
import FiltersSituationsListItem from './FiltersSituationsListItem';
import cl from './FiltersSituationsList.module.scss';
import { useSortFilteredSituations } from 'hooks/useFilterSituations';

const FiltersSituationsList = ({ situations }, ref) => {
  const filteredSituations = useSortFilteredSituations(situations).map((situation, i) => (
    <FiltersSituationsListItem key={i} situation={situation} />
  ));

  return (
    <ul ref={ref} className={cl.situationsList}>
      {filteredSituations}
    </ul>
  );
};

export default forwardRef(FiltersSituationsList);
