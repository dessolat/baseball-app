import React from 'react';
import cl from './FirstLastMoment.module.scss';

const FirstLastMoment = ({ isLastMomentMode, ...props }) => {
  return (
    <button {...props} className={cl.btn}>
      <svg width='100%' height='100%' viewBox='0 0 28 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
        {/* Left side */}
        <circle
          cx='7.75'
          cy='13.75'
          r='4.75'
          fill={isLastMomentMode ? '#E1E1E1' : '#2B9D6A'}
          stroke={isLastMomentMode ?'rgba(0, 0, 0, 0.2)': 'black'}
          strokeWidth='0.5'
        />
        <circle
          cx='7.75'
          cy='26.25'
          r='4.75'
          fill={isLastMomentMode ? '#E1E1E1' : '#E2001C'}
          stroke={isLastMomentMode ?'rgba(0, 0, 0, 0.2)': 'black'}
          strokeWidth='0.5'
        />
        <circle
          cx='7.75'
          cy='38.5'
          r='4.75'
          fill={isLastMomentMode ? '#E1E1E1' : '#4AA0F0'}
          stroke={isLastMomentMode ?'rgba(0, 0, 0, 0.2)': 'black'}
          strokeWidth='0.5'
        />
        {/* Right side */}
        <circle cx='20.25' cy='13.75' r='4.75' fill='white' stroke={!isLastMomentMode ?'rgba(0, 0, 0, 0.2)': 'black'} strokeWidth='0.5' />
        <circle cx='20.25' cy='26.25' r='4.75' fill='white' stroke={!isLastMomentMode ?'rgba(0, 0, 0, 0.2)': 'black'} strokeWidth='0.5' />
        <circle cx='20.25' cy='38.5' r='4.75' fill={!isLastMomentMode ? '#E1E1E1' : '#4AA0F0'} stroke={!isLastMomentMode ?'rgba(0, 0, 0, 0.2)': 'black'} strokeWidth='0.5' />
      </svg>
    </button>
  );
};

export default FirstLastMoment;
