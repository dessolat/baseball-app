import React from 'react';
import cl from './PlaysRunning.module.scss';

const PlaysRunningField = ({ field }) => {
  let ballPath = '';

  moments
    .filter(moment => moment.metering?.field?.data_2d)
    .forEach(moment => {
      const { data_2d } = moment.metering.field;

      ballPath += `M${data_2d[0][0]} ${data_2d[0][1]}`;
      data_2d.slice(1).forEach(coords => (ballPath += `L${coords[0]} ${coords[1]}`));
    });

  // let ballPath = data_2d ? `M${data_2d[0][0]} ${data_2d[0][1]}` : '';
  // data_2d && data_2d.slice(1).forEach(coords => (ballPath += `L${coords[0]} ${coords[1]}`));

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

export default PlaysRunningField;
