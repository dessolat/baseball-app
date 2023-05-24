import React from 'react';
import cl from './Arrow.module.scss';

const Arrow = ({ direction = 'left', fillColor = '#D1D1D1', addedClass = null, ...props }) => (
  <button
    className={cl.arrowBtn + ' ' + addedClass}
    name={direction === 'left' ? 'scroll-left' : 'scroll-right'}
    {...props}>
    {direction === 'left' ? (
      <svg
        className={cl.arrowImg}
        width='11'
        height='19'
        viewBox='0 0 11 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M11 2.2325L8.90688 0L0 9.5L8.90688 19L11 16.7675L4.20108 9.5L11 2.2325Z' fill={fillColor} />
      </svg>
    ) : (
      <svg
        className={cl.arrowImg}
        width='11'
        height='19'
        viewBox='0 0 11 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M2.09312 0L0 2.2325L6.79892 9.5L0 16.7675L2.09312 19L11 9.5L2.09312 0Z' fill={fillColor} />
      </svg>
    )}
  </button>
);

export default Arrow;
