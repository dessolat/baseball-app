import React from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsList from './PlaysEventsList';
import PlaysEventsTotal from './PlaysEventsTotal';

const PlaysEvents = ({ moments, currentMoment, handleClick }) => (
  <div className={cl.events}>
    <PlaysEventsList moments={moments} currentMoment={currentMoment} handleClick={handleClick} />
    <PlaysEventsTotal moments={moments} />
  </div>
);

export default PlaysEvents;
