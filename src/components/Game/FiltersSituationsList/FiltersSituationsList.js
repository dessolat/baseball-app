import React, { forwardRef } from 'react';
import FiltersSituationsListItem from './FiltersSituationsListItem';
import cl from './FiltersSituationsList.module.scss';
import useFilterSituations from 'hooks/useFilterSituations';

const FiltersSituationsList = ({ situations }, ref) => {
  const filteredSituations = useFilterSituations(situations);

  return (
    <ul ref={ref} className={cl.situationsList}>
      {filteredSituations.map((situation, i) => (
        <FiltersSituationsListItem key={i} situation={situation} />
      ))}
    </ul>
  );
};

export default forwardRef(FiltersSituationsList);
