import React from 'react';
import cl from './PlayBtn.module.scss';

const PlayBtn = () => {
  return (
    <button className={cl.playBtn}>
      <svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
        <use className='ytp-svg-shadow'></use>
        <path
          className='ytp-svg-fill'
          d='M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
          id='ytp-id-576'></path>
      </svg>
    </button>
  );
};

export default PlayBtn;
