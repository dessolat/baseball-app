import React from 'react';
import cl from './PlaysRunning.module.scss';
import PlaysRunningInfoList from './PlaysRunningInfoList';

const PlaysRunningInfo = () => {
  return (
    <div className={cl.info}>
      <p className={cl.subHeader}>Running</p>
      <PlaysRunningInfoList />
    </div>
  );
};

export default PlaysRunningInfo;
