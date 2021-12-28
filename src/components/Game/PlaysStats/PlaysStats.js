import React from 'react';
import cl from './PlaysStats.module.scss';

const PlaysStats = ({ hit }) => {
  const { init_speed_x, distance, angle, data_2d } = hit || 0;

  const exitVelocityValue = init_speed_x ? init_speed_x.toFixed(1) + ' mph' : ' ';
  const distanceValue = distance ? distance.toFixed(1) + ' m' : ' ';
  const angleValue = angle ? angle.toFixed(0) + '°' : ' ';

  let ballPath = data_2d ? `M${data_2d[0][0]} ${data_2d[0][1]}` : '';
  data_2d && data_2d.slice(1).forEach(coords => (ballPath += `L${coords[0]} ${coords[1]}`));

  const intermediatePoints = data_2d
    ? data_2d
        .filter(coords => coords[3] === 1)
        .map(coords => <circle cx={coords[0]} cy={coords[1]} r={18} fill='red'></circle>)
    : '';

  return (
    <div className={cl.stats}>
      <div className={cl.field}>
        <svg width='100%' height='100%' viewBox='0 0 2560 2560' fill='none' preserveAspectRatio='none'>
          <path
            d={ballPath}
            stroke='#4AA0F0'
            strokeWidth='20'
            strokeLinejoin='round'
            strokeLinecap='round'></path>
          {intermediatePoints}
        </svg>
      </div>
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
    </div>
  );
};

export default PlaysStats;
