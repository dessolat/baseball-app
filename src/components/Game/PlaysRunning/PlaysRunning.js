import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PlaysRunningField from './PlaysRunningField';
import PlaysRunningInfo from './PlaysRunningInfo';

const PlaysRunning = () => {
  const [runningMode, setRunningMode] = useState('Field');

  const currentMoment = useSelector(state => state.game.currentMoment);
  const mobileWidth = useSelector(state => state.shared.mobileWidth);
  return (
    <>
      {(mobileWidth > 1000 || runningMode === 'Field') && (
        <PlaysRunningField field={currentMoment.metering?.field} setRunningMode={setRunningMode} />
      )}
      {(mobileWidth > 1000 || runningMode === 'Info') && <PlaysRunningInfo setRunningMode={setRunningMode} />}
    </>
  );
};

export default PlaysRunning;
