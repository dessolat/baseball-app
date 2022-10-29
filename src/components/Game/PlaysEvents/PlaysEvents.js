import React from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsList from './PlaysEventsList';
import PlaysEventsTotal from './PlaysEventsTotal';

const PlaysEvents = ({ moments }) => (
  <div className={cl.events}>
    <PlaysEventsList moments={moments} />
    {/* <PlaysEventsTotal moments={moments} /> */}
  </div>
);

export default PlaysEvents;
