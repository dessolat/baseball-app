import React from 'react';
import { useSelector } from 'react-redux';
import cl from './PlaysRunning.module.scss';
import PlaysRunningInfoItem from './PlaysRunningInfoItem';


const PlaysRunningInfoList = () => {
  const { metering } = useSelector(state => state.game.currentMoment);

  return (
    <div className={cl.list}>
      {metering?.field && metering.field.map((item, i) => (
        <PlaysRunningInfoItem key={i} item={item} />
      ))}
    </div>
  );
};

export default PlaysRunningInfoList;
