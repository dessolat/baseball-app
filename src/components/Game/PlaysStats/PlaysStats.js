import React from 'react';
import cl from './PlaysStats.module.scss';
import PlaysStatsField from './PlaysStatsField';
import PlaysStatsInfo from './PlaysStatsInfo';

const PlaysStats = ({ hit }) => (
  <div className={cl.stats}>
    <PlaysStatsField hit={hit} />
    <PlaysStatsInfo hit={hit} />
  </div>
);

export default PlaysStats;
