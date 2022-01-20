import React from 'react';
import cl from './PlaysSpeed.module.scss';

const PlaysSpeedChart = ({ dataArr, currentDot = 0 }) => {
  return (
    <svg width='95%' height='85%' viewBox='0 0 440 110' className={cl.chart}>
    </svg>
  );
};

export default PlaysSpeedChart;
