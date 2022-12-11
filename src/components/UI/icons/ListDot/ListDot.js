import React from 'react';

const ListDot = ({ fill = '#1A4C96' }) => {
  return (
    <svg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='3' cy='3' r='2.75' fill={fill} stroke='black' strokeWidth='0.5' />
    </svg>
  );
};

export default ListDot;
