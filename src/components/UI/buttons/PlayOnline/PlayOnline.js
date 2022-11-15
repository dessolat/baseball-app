import React from 'react';
import cl from './PlayOnline.module.scss';

const PlayOnline = ({ className, ...props }) => (
  <button {...props} className={cl.btn + ' ' + className}>
    <svg viewBox='0 0 35 21' fill='none' xmlns='http://www.w3.org/2000/svg' className={cl.playOnlineBtn}>
      <path d='M4.1125 0L0 3.99595L17.5 21L35 3.99595L30.8875 0L17.5 12.9798L4.1125 0Z' fill='#1A4C96' />
    </svg>
  </button>
);

export default PlayOnline;
