import React from 'react';

const ListDot = ({ fill = '#1A4C96' }) => {
  return (
    <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='4' cy='4' r='3.8' fill={fill} stroke='black' strokeWidth='0.5' />
    </svg>
  );
};

export default ListDot;
