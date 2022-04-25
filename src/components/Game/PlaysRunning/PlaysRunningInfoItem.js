import React from 'react';
import cl from './PlaysRunning.module.scss';

const PlaysRunningInfoItem = ({ item }) => {
  return (
    <div className={cl.infoItem}>
      <p className={cl.infoTitle}>{item.title}</p>
      <p className={cl.infoValue}>{item.value}</p>
    </div>
  );
};

export default PlaysRunningInfoItem;
