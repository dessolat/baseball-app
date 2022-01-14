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
          prevTable={i !== 0 ? moments[i - 1].table : { balls: 0, strikes: 0 }}
          currentMoment={currentMoment}
          handleClick={handleClick}
        />
      ))}
  </ul>
);

export default PlaysEventsList;
