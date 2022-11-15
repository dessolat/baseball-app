import React from 'react';

const FullscreenBtn = ({ isOff = true, width = '100%', height = '100%' }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 89 89' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {isOff ? (
        <>
          <path
            opacity='0.6'
            d='M15.25 14.5V37.75H0.25V0.25H38.75V14.25H15.5H15.25V14.5Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
          <path
            opacity='0.6'
            d='M73.75 74.5V51.25H88.75V88.75H50.25V74.75H73.5H73.75V74.5Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
          <path
            opacity='0.6'
            d='M14.5 73.75H37.75V88.75H0.25L0.25 50.25H14.25V73.5V73.75H14.5Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
          <path
            opacity='0.6'
            d='M74.5 15.25L51.25 15.25V0.25L88.75 0.25V38.75H74.75V15.5V15.25H74.5Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
        </>
      ) : (
        <>
          <path
            opacity='0.6'
            d='M70.6731 69.4474V87.75H59.25V58.25H88.75V69.1974H70.9231H70.6731V69.4474Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
          <path
            opacity='0.6'
            d='M18.9295 18.5526L18.9295 0.249998H30.75L30.75 29.75L0.25 29.75V18.8026L18.6795 18.8026H18.9295V18.5526Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
          <path
            opacity='0.6'
            d='M70.4474 18.9295H88.75V30.75L59.25 30.75V0.25H70.1974V18.6795V18.9295H70.4474Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
          <path
            opacity='0.6'
            d='M18.5526 69.0705H0.249998V57.25H29.75L29.75 87.75H18.8026V69.3205V69.0705H18.5526Z'
            fill='#D9D9D9'
            stroke='black'
            strokeWidth='0.5'
          />
        </>
      )}
    </svg>
  );
};

export default FullscreenBtn;
