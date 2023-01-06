import React from 'react';
import { useSelector } from 'react-redux';
import useGameFocus from 'hooks/useGameFocus';
import cl from './PlaysEvents.module.scss';
import PlaysEventsList from './PlaysEventsList';
// import PlaysEventsTotal from './PlaysEventsTotal';

const PlaysEvents = () => {
	const moments = useSelector(state => state.game.moments)

  return (
    <div className={cl.events} onClick={useGameFocus('list')}>
      <PlaysEventsList moments={moments} />
      {/* <PlaysEventsTotal moments={moments} /> */}
    </div>
  );
};

export default PlaysEvents;
