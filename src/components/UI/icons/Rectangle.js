import React from 'react';

const Rectangle = ({ fill, ...props }) => {
  return (
    <svg {...props} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='0.646447'
        y='8.07104'
        width='10.5'
        height='10.5'
        transform='rotate(-45 0.646447 8.07104)'
        fill={fill === false ? 'none' : fill}
        stroke='black'
        strokeWidth='0.5'
      />
    </svg>
  );
};

export default Rectangle;
