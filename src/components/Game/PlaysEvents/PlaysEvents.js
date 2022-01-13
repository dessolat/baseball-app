import React from 'react';
import cl from './PlaysEvents.module.scss';

import PlaysEventsItem from './PlaysEventsItem';

const PlaysEvents = ({ moments, currentMoment, handleClick }) => {
  const isTotal = moments.length > 0;
  const { balls_count, strikes_count } = (isTotal && moments.slice(-1)[0].pitcher) || '';

  return (
    <div className={cl.events}>
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
