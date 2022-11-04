import React from 'react';
import cl from './PauseBtn.module.scss';

const PauseBtn = ({ setPlayPause }) => {
  const handleClickBtn = () => {
    setPlayPause('pause');
  };

  return (
    <button className={cl.pauseBtn} onClick={handleClickBtn}>
      <svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
        <use className='ytp-svg-shadow'></use>
        <path
          className='ytp-svg-fill'
          d='M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
          id='ytp-id-592'></path>
      </svg>
    </button>
  );
};

export default PauseBtn;
