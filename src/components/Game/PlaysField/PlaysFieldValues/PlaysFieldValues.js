import React from 'react';
import PlaysFieldDistanceValues from './PlaysFieldDistanceValues';
import PlaysFieldSpeedValues from './PlaysFieldSpeedValues';

const PlaysFieldValues = ({ currentMoment, cl }) => (
  <div className={cl.top}>
    <PlaysFieldSpeedValues currentMoment={currentMoment} cl={cl} />
    <PlaysFieldDistanceValues currentMoment={currentMoment} cl={cl} />
  </div>
);

export default PlaysFieldValues;
