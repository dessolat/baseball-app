import React from 'react';
import cl from './SortArrows.module.scss';

const SortArrows = ({ direction = 'asc' }) => {
  return (
    <span className={cl.wrapper}>
      <svg width='8' height='13' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M4.04272 0.595703V11.7334M3.8 12L7.48012 7.74575M4.2 12L0.880371 7.74575'
          stroke={direction === 'asc' ? 'black' : '#838383'}
          strokeLinecap='butt'
        />
      </svg>
      <svg width='8' height='13' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M4.29176 12.4L4.29176 2.05M4.7 0.9L0.854349 5.08335M4 0.9L7.4541 5.08335'
          stroke={direction === 'asc' ? '#838383' : 'black'}
          strokeLinecap='butt'
        />
      </svg>
    </span>
  );
};

export default SortArrows;
