import React from 'react';
import { useSelector } from 'react-redux';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import cl from './PlaysEvents.module.scss';

const PlaysEventsTotal = ({ moments }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const isTotal = moments.length > 0;
  const { balls_count, strikes_count } = (isTotal && moments.slice(-1)[0].pitcher) || '';

  return (
    <p className={cl.total}>
      {isTotal && (
        <>
          {!isVideo && (
            <div className={cl.pitcherWrapper}>
              <ContentPitcher />
            </div>
          )}
          Total:{' '}
          <span>
            {balls_count + strikes_count} ({balls_count} ball, {strikes_count} strike)
          </span>
        </>
      )}
    </p>
  );
};

export default PlaysEventsTotal;
