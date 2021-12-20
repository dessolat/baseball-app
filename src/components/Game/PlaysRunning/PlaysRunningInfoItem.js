import React from 'react';
import cl from './PlaysRunning.module.scss';

const PlaysRunningInfoItem = ({ item }) => {
  return (
    <li className={cl.infoItem}>
      <p className={cl.infoTitle}>{item.title}</p>
      <p className={cl.infoValue}>{item.value}</p>
    </li>
  );
};

export default PlaysRunningInfoItem;
