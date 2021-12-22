import React from 'react';
import cl from './PlaysStats.module.scss';

const PlaysStats = () => {
  return (
    <div className={cl.stats}>
      <div className={cl.field}>
        <svg width='100%' height='100%' viewBox='0 0 2560 2560' fill='none'>
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
          <span className={cl.value}>91.0 mph</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Launch Angle</span>
          <span className={cl.value}>41°</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Height</span>
          <span className={cl.value}>37.2 m</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Distance</span>
          <span className={cl.value}>132.6 m</span>
        </p>
      </div>
    </div>
  );
};

export default PlaysStats;
