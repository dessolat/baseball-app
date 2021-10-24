import React, { forwardRef } from 'react';
import FiltersSituationsListItem from './FiltersSituationsListItem';
import cl from './FiltersSituationsList.module.scss';

const FiltersSituationsList = forwardRef((props, ref) => {
	const {situationFilter, situations, handleClick} = props

  return (
    <ul ref={ref} className={cl.situationsList}>
      {situations.map((situation, i) => (
        <FiltersSituationsListItem
          key={i}
          situationFilter={situationFilter}
          situation={situation}
          handleClick={handleClick}
          cl={cl}
        />
      ))}
    </ul>
  );
});

export default FiltersSituationsList;