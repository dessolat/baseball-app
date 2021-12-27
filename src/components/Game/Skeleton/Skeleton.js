import React from 'react';
import SkeletonFilters from './SkeletonFilters';
import SkeletonHeader from './SkeletonHeader';

const Skeleton = () => {
  return (
    <>
      <SkeletonHeader />
      <SkeletonFilters />
    </>
  );
};

export default Skeleton;
