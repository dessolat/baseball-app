import React from 'react';
import cl from './PlayBtn.module.scss';

const PlayBtn = () => {
  return (
    <svg height='100%' version='1.1' viewBox='0 0 36 36' className={cl.playBtn}>
      <use class='ytp-svg-shadow'></use>
      <path
        class='ytp-svg-fill'
        d='M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
        id='ytp-id-576'></path>
    </svg>
  );
};

export default PlayBtn;
