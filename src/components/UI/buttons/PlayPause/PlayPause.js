import React from 'react';
import cl from './PlayPause.module.scss';

const PlayPause = ({ className, playbackMode, ...props }) => {
  const classes = [className];
  playbackMode === 'play' ? classes.push(cl.pause) : classes.push(cl.play);

  return (
    <button {...props} className={classes.join(' ')}>
      {playbackMode === 'play' ? (
        <>
          <svg width='2' height='11' viewBox='0 0 2 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect
              x='0.25'
              y='0.25'
              width='1.5'
              height='10.5'
              fill='#1A4C96'
              stroke='black'
              strokeWidth='0.5'
            />
          </svg>
          <svg width='2' height='11' viewBox='0 0 2 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect
              x='0.25'
              y='0.25'
              width='1.5'
              height='10.5'
              fill='#1A4C96'
              stroke='black'
              strokeWidth='0.5'
            />
          </svg>
        </>
      ) : (
        <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.25 16.573V0.404935L15.467 8.03137L0.25 16.573Z'
            fill='#1A4C96'
            stroke='black'
            strokeWidth='0.5'
          />
        </svg>
      )}
    </button>
  );
};

export default PlayPause;
