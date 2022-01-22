import React from 'react';
import { useSelector } from 'react-redux';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';

const PlaysRunning = () => {
	const currentMoment = useSelector(state => state.game.currentMoment)
  return (
    <>
      <PlaysRunningField field={currentMoment.metering?.field} />
      <PlaysRunningInfo />
    </>
  );
};

export default PlaysRunning;
