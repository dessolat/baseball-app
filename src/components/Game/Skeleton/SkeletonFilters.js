import React from 'react';
import cl from './SkeletonFilters.module.scss';

const SkeletonFilters = () => {
  return (
    <section className='container'>
      <div className={cl.list}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default SkeletonFilters;
