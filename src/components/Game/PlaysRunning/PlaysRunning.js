import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';

const PlaysRunning = () => {
  const [runningMode, setRunningMode] = useState('Field');

  const currentMoment = useSelector(state => state.game.currentMoment);
  return (
    <>
      <PlaysRunningField field={currentMoment.metering?.field} />
      <PlaysRunningInfo />
    </>
  );
};

export default PlaysRunning;
