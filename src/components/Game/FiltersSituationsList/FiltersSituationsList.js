import React, { forwardRef } from 'react';
import FiltersSituationsListItem from './FiltersSituationsListItem';
import cl from './FiltersSituationsList.module.scss';

const FiltersSituationsList = (props, ref) => {
  const { situations } = props;

  return (
    <ul ref={ref} className={cl.situationsList}>
      {situations.map((situation, i) => (
        <FiltersSituationsListItem key={i} situation={situation} cl={cl} />
      ))}
    </ul>
  );
};

export default forwardRef(FiltersSituationsList);
