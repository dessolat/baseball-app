import React from 'react';
import cl from './PlaysSpin.module.scss';

const PlaysSpinInfo = ({ pitch }) => {
  const { offset_x, offset_y, rotation } = pitch || 0;

  const trueSpinValue = rotation ? rotation.toFixed(2) + ' rpm' : ' ';
  const verticalBreakValue = offset_y ? (offset_y * 100).toFixed(2) + ' cm' : ' ';
  const horizontalBreakValue = offset_x ? (offset_x * 100).toFixed(2) + ' cm' : ' ';

  return (
    <div>
      <p className={cl.subHeader}>True spin</p>
      <p className={cl.regularValue}>{trueSpinValue}</p>
      <p className={cl.subHeader}>Vertical break</p>
      <p className={cl.breakValue}>{verticalBreakValue}</p>
      <p className={cl.subHeader}>Horizontal break</p>
      <p className={cl.breakValue}>{horizontalBreakValue}</p>
    </div>
  );
};

export default PlaysSpinInfo;
