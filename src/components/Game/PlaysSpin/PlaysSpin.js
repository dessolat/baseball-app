import React from 'react';
import cl from './PlaysSpin.module.scss';

const PlaysSpin = ({ pitch }) => {
	const {strike_zone_x, strike_zone_y, offset_x, offset_y,rotation} = pitch || 0

  const isDrawBall = pitch;
  const coordX = 50 + 50 * strike_zone_x;
  const coordY = 50 - 50 * strike_zone_y;
  const trueSpinValue = rotation ? rotation.toFixed(2) + ' rpm' : ' ';
	const verticalBreakValue = offset_y ? (offset_y * 100).toFixed(2) + ' cm' : ' ';
	const horizontalBreakValue = offset_x ? (offset_x * 100).toFixed(2) + ' cm' : ' ';

  return (
    <div className={cl.spin}>
      <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <line x1='49.5' y1='100' x2='49.5' stroke='#ACACAC' />
        <line y1='49.5' x2='100' y2='49.5' stroke='#ACACAC' />
        {isDrawBall && <circle cx={coordX} cy={coordY} r='7.5' fill='#2B9D6A' />}
      </svg>
      <div>
        <p className={cl.subHeader}>True spin</p>
        <p className={cl.regularValue}>{trueSpinValue}</p>
        <p className={cl.subHeader}>Vertical break</p>
        <p className={cl.breakValue}>{verticalBreakValue}</p>
        <p className={cl.subHeader}>Horizontal break</p>
        <p className={cl.breakValue}>{horizontalBreakValue}</p>
      </div>
    </div>
  );
};

export default PlaysSpin;
