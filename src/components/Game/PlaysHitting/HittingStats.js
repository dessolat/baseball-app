import React from 'react';
import cl from './PlaysHitting.module.scss';

const HittingStats = ({ hit }) => {
  const { init_speed_x, distance, angle } = hit || 0;

  const exitVelocityValue = init_speed_x ? init_speed_x.toFixed(1) + ' mph' : ' ';
  const distanceValue = distance ? distance.toFixed(1) + ' m' : ' ';
  const angleValue = angle ? angle.toFixed(0) + '°' : ' ';
  return (
    <div className={cl.stats}>
      <div className={cl.leftSide}>
        <div className={cl.row}>
          <span className={cl.title}>Exit Velocity</span>
          <span className={cl.value}>{exitVelocityValue}</span>
        </div>
        <div className={cl.row}>
          <span className={cl.title}>Launch Angle</span>
          <span className={cl.value}>{angleValue}</span>
        </div>
      </div>
      <div className={cl.rightSide}>
        <div className={cl.row}>
          <span className={cl.title}>Height</span>
          <span className={cl.value}>37.2 m</span>
        </div>
        <div className={cl.row}>
          <span className={cl.title}>Distance</span>
          <span className={cl.value}>{distanceValue}</span>
        </div>
      </div>
    </div>
  );
};

export default HittingStats;