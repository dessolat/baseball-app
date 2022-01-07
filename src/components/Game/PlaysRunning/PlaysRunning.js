import React from 'react';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';

const PlaysRunning = ({ currentMoment }) => {
  return (
    <>
      <PlaysRunningField field={currentMoment.metering?.field} />
      <PlaysRunningInfo />
    </>
  );
};

export default PlaysRunning;
