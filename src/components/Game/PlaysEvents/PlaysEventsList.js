import React from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsItem from './PlaysEventsItem';

const PlaysEventsList = ({ moments, currentMoment, handleClick }) => (
  <ul className={cl.list}>
    {moments.length !== 0 &&
      moments.map((moment, i) => (
        <PlaysEventsItem
          key={i}
          moment={moment}
          currentMoment={currentMoment}
          handleClick={handleClick}
        />
      ))}
  </ul>
);

export default PlaysEventsList;
