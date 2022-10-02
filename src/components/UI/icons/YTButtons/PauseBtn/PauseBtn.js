import React from 'react';
import cl from './PauseBtn.module.scss';

const PauseBtn = () => {
  return (
    <button className={cl.playBtn}>
      <svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
        <use class='ytp-svg-shadow'></use>
        <path
          class='ytp-svg-fill'
          d='M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
          id='ytp-id-592'></path>
      </svg>
    </button>
  );
};

export default PauseBtn;
