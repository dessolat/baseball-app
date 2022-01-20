import React from 'react';
import cl from './PlaysStats.module.scss';

const PlaysStatsInfo = ({ hit }) => {
  const { init_speed_x, distance, angle } = hit || 0;

  const exitVelocityValue = init_speed_x ? init_speed_x.toFixed(1) + ' mph' : ' ';
  const distanceValue = distance ? distance.toFixed(1) + ' m' : ' ';
  const angleValue = angle ? angle.toFixed(0) + '°' : ' ';

  return (
    <div className={cl.info}>
      <p className={cl.row}>
        <span className={cl.title}>At Bats</span>
        <span className={cl.value}>2</span>
      </p>
      <p className={cl.row}>
        <span className={cl.title}>Hits</span>
        <span className={cl.value}>0</span>
      </p>
      <p className={cl.row}>
        <span className={cl.title}>Runs</span>
        <span className={cl.value}>0</span>
      </p>
      <p className={cl.row}>
        <span className={cl.title}>Exit Velocity</span>
        <span className={cl.value}>{exitVelocityValue}</span>
      </p>
      <p className={cl.row}>
        <span className={cl.title}>Launch Angle</span>
        <span className={cl.value}>{angleValue}</span>
      </p>
      <p className={cl.row}>
        <span className={cl.title}>Height</span>
        <span className={cl.value}>37.2 m</span>
      </p>
      <p className={cl.row}>
        <span className={cl.title}>Distance</span>
        <span className={cl.value}>{distanceValue}</span>
      </p>
    </div>
  );
};

export default PlaysStatsInfo;
