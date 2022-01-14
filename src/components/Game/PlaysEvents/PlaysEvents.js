import React from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsList from './PlaysEventsList';

const PlaysEvents = ({ moments, currentMoment, handleClick }) => {
  const isTotal = moments.length > 0;
  const { balls_count, strikes_count } = (isTotal && moments.slice(-1)[0].pitcher) || '';

  return (
    <div className={cl.events}>
      <PlaysEventsList moments={moments} currentMoment={currentMoment} handleClick={handleClick}/>
      <p className={cl.total}> 
        {isTotal && (
          <>
            Total:{' '}
            <span>
              {balls_count + strikes_count} ({balls_count} strike, {strikes_count} ball)
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default PlaysEvents;
