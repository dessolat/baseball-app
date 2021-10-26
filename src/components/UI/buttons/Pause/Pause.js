import React from 'react';
import cl from './Pause.module.scss'

const Pause = ({className, ...props}) => {
  return (
    <button {...props} className={cl.btn + ' ' + className}>
      <svg width='2' height='11' viewBox='0 0 2 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0.25' y='0.25' width='1.5' height='10.5' fill='#1A4C96' stroke='black' strokeWidth='0.5' />
      </svg>
      <svg width='2' height='11' viewBox='0 0 2 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0.25' y='0.25' width='1.5' height='10.5' fill='#1A4C96' stroke='black' strokeWidth='0.5' />
      </svg>
    </button>
  );
};

export default Pause;
