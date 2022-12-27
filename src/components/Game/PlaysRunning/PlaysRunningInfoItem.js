import React from 'react';
import { getFixedNumber } from 'utils';
import cl from './PlaysRunning.module.scss';

const BASES_BY_NUMBER = ['H', '1B', '2B', '3B'];

const PlaysRunningInfoItem = ({ item }) => {
  const {
    max_speed: maxSpeed,
    who,
    run_from: runFrom,
    run_to: runTo,
    time_end: timeEnd,
    time_start: timeStart
  } = item;

  const timeDelta = timeEnd - timeStart;
  return (
    <div className={cl.infoItem}>
      <p
        className={
          cl.infoTitle
        }>{`${who} run from ${BASES_BY_NUMBER[runFrom]} to ${BASES_BY_NUMBER[runTo]} base:`}</p>
      <p className={cl.infoValue}>{`S: ${getFixedNumber(maxSpeed, 1)} km/h T: ${getFixedNumber(
        timeDelta,
        1
      )} s`}</p>
    </div>
  );
};

export default PlaysRunningInfoItem;
