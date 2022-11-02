import React from 'react';
import cl from './VideoOptions.module.scss';
import TriangleIcon from 'icons/triangle_icon.svg';

const SpeedSelector = () => {
  return (
    <div className={cl.speedSelectorWrapper}>
      <p>Speed</p>
      <div>
        x2 <img src={TriangleIcon} alt='triangle-icon' />
      </div>
    </div>
  );
};

export default SpeedSelector;
