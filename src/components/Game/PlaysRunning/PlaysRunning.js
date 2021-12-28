import React from 'react';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';

const PlaysRunning = ({ currentMoment, moments }) => {
  return (
    <>
      <PlaysRunningField field={currentMoment.metering?.field} moments={moments}/>
      <PlaysRunningInfo />
    </>
  );
};

export default PlaysRunning;
