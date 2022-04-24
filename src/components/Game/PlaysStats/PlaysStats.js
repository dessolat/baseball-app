import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React from 'react';
import cl from './PlaysStats.module.scss';
import PlaysStatsField from './PlaysStatsField';
import PlaysStatsInfo from './PlaysStatsInfo';

const PlaysStats = ({ hit, setHittingMode }) => (
  <div className={cl.stats}>
    <PlaysStatsField hit={hit} />
    <PlaysStatsInfo hit={hit} />
    <div className={cl.arrowWrapper}>
      <Arrow onClick={() => setHittingMode('Bat')} />
    </div>
  </div>
);

export default PlaysStats;
