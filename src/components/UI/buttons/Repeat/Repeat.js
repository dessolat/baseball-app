import React from 'react';
import cl from './Repeat.module.scss';

const Repeat = ({ className, ...props }) => {
  return (
    <button {...props} className={cl.btn + ' ' + className}>
      <svg width='15' height='8' viewBox='0 0 15 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M1.16304 5.03704V0.25H14.75V1.52778H2.73913H2.48913V1.77778V5.03704V5.28704H2.73913H2.93839L1.80627 7.49136L0.447742 5.28704H0.913043H1.16304V5.03704Z'
          fill='#1A4C96'
          stroke='black'
          strokeWidth='0.5'
        />
      </svg>
      <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M13.7717 3.33333V8.75L0.249999 8.75V7.25L12.0652 7.25H12.3152V7V3.33333V3.08333H12.0652H11.8136L13.0635 0.528012L14.5634 3.08333H14.0217H13.7717V3.33333Z'
          fill='#1A4C96'
          stroke='black'
          strokeWidth='0.5'
        />
      </svg>
    </button>
  );
};

export default Repeat;
