import React from 'react';
import cl from './PlaysEvents.module.scss';
import useCurrentEvents from 'hooks/useCurrentEvents';
import PlaysEventsItem from './PlaysEventsItem';

const PlaysEvents = () => {
  const moments = useCurrentEvents();

  return (
    <ul className={cl.events}>
      {moments.length !== 0 && moments.map((moment, i) => <PlaysEventsItem key={i} moment={moment} />)}
    </ul>
  );
};

export default PlaysEvents;
