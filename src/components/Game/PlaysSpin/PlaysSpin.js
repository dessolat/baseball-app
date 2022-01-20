import React from 'react';
import cl from './PlaysSpin.module.scss';
import PlaysSpinInfo from './PlaysSpinInfo';

const PlaysSpin = ({ pitch }) => {
  const { strike_zone_x, strike_zone_y } = pitch || 0;

  const isDrawBall = pitch;
  const coordX = 50 + 50 * strike_zone_x;
  const coordY = 50 - 50 * strike_zone_y;

  return (
    <div className={cl.spin}>
      <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <line x1='49.5' y1='100' x2='49.5' stroke='#ACACAC' />
        <line y1='49.5' x2='100' y2='49.5' stroke='#ACACAC' />
        {isDrawBall && <circle cx={coordX} cy={coordY} r='7.5' fill='#2B9D6A' />}
      </svg>
      <PlaysSpinInfo pitch={pitch} />
    </div>
  );
};

export default PlaysSpin;
