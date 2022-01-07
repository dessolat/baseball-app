import React, { memo } from 'react';
import cl from './PlaysRunning.module.scss';

const PlaysRunningField = ({ field }) => {
  let ballPath = '';

  field
    ?.filter(coords => coords.length > 0)
    .forEach(coords => {
      ballPath += `M${coords[0][0]} ${coords[0][1]}`;
      coords.slice(1).forEach(coord => (ballPath += `L${coord[0]} ${coord[1]}`));
    });

  return (
    <svg
      className={cl.field}
      width='100%'
      height='100%'
      viewBox='0 0 2560 2560'
      fill='none'
      preserveAspectRatio='none'>
      <path
        d={ballPath}
        stroke='red'
        strokeWidth='25'
        strokeLinejoin='round'
        strokeLinecap='round'
        strokeDasharray='1 35'></path>
    </svg>
  );
};

export default memo(PlaysRunningField);
