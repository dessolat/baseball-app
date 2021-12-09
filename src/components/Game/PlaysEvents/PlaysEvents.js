import React from 'react';
import cl from './PlaysEvents.module.scss';

import PlaysEventsItem from './PlaysEventsItem';

const PlaysEvents = ({ moments, currentMoment, handleClick }) => {
  return (
    <ul className={cl.events}>
      {moments.length !== 0 &&
        moments.map((moment, i) => (
          <PlaysEventsItem key={i} moment={moment} currentMoment={currentMoment} handleClick={handleClick} />
        ))}
    </ul>
  );
};

export default PlaysEvents;
