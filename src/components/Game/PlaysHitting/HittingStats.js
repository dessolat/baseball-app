import React from 'react';
import cl from './PlaysHitting.module.scss';

const HittingStats = ({ hit }) => {
  const { start_speed: startSpeed, distance, angle, max_height: maxHeight } = hit || 0;

  const exitVelocityValue = startSpeed !== undefined ? startSpeed.toFixed(1) + ' mph' : '—';
  const distanceValue = distance !== undefined ? distance.toFixed(1) + ' m' : '—';
  const maxHeightValue = maxHeight !== undefined ? maxHeight.toFixed(1) + ' m' : '—';
  const angleValue = angle !== undefined ? angle.toFixed(0) + '°' : '—';

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
          <span className={cl.value}>{maxHeightValue}</span>
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
