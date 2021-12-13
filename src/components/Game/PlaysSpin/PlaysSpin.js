import React, { useState, useEffect } from 'react';
import cl from './PlaysSpin.module.scss';

const PlaysSpin = ({ currentMoment }) => {
  const [ballCoords, setBallCoords] = useState({ coordX: 50, coordY: 50 });

  useEffect(() => {
    if (Object.keys(currentMoment).length === 0 || !currentMoment.metering?.is_strike) return;

    const coordX = 50 + 50 * currentMoment.metering.strike_zone_x;
    const coordY = 50 - 50 * currentMoment.metering.strike_zone_y;

    setBallCoords({ coordX, coordY });
  }, [currentMoment]);

  const isDrawBall = currentMoment.metering?.is_strike;

  return (
    <div className={cl.spin}>
      <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <line x1='49.5' y1='100' x2='49.5' stroke='#ACACAC' />
        <line y1='49.5' x2='100' y2='49.5' stroke='#ACACAC' />
        {isDrawBall && <circle cx={ballCoords.coordX} cy={ballCoords.coordY} r='7.5' fill='#2B9D6A' />}
      </svg>
      <div>
        <p className={cl.subHeader}>True spin</p>
        <p className={cl.regularValue}>1952.1 rpm</p>
        <p className={cl.subHeader}>Vertical break</p>
        <p className={cl.breakValue}>52.0 cm</p>
        <p className={cl.subHeader}>Horizontal break</p>
        <p className={cl.breakValue}>24.7 cm</p>
      </div>
    </div>
  );
};

export default PlaysSpin;
