import React from 'react';
import cl from './PlayOnlineOld.module.scss';

const PlayOnlineOld = ({ className, ...props }) => (
  <button {...props} className={cl.btn + ' ' + className}>
    <svg
      width='15'
      height='17'
      viewBox='0 0 15 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cl.playOnlineBtn}>
      <path
        d='M7.40515 16.6719L0.673439 10.875H3.70153H3.95153V10.625V0.25H10.8546V3.77778V10.625V10.875H11.1046H14.3132L7.40515 16.6719Z'
        fill='#1A4C96'
        stroke='black'
        strokeWidth='0.5'
      />
    </svg>
  </button>
);

export default PlayOnlineOld;
