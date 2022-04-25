import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React from 'react';
import cl from './PlaysRunning.module.scss';
import PlaysRunningInfoList from './PlaysRunningInfoList';

const PlaysRunningInfo = ({ setRunningMode }) => {
  return (
    <div className={cl.info}>
      <p className={cl.subHeader}>Running</p>
      <PlaysRunningInfoList />
      <div className={cl.leftArrowWrapper}>
        <Arrow onClick={() => setRunningMode('Field')} />
      </div>
    </div>
  );
};

export default PlaysRunningInfo;
