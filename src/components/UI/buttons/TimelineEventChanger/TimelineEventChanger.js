import React from 'react';

const TimelineEventChanger = ({ direction = 'left', handleClick }) => {
  const path = (direction === 'left' ? (
    <path d='M21 4.1125L17.004 0L0 17.5L17.004 35L21 30.8875L8.02024 17.5L21 4.1125Z' fill='#1A4C96' />
  ) : (
    <path d='M0 30.8875L3.99595 35L21 17.5L3.99595 0L0 4.1125L12.9798 17.5L0 30.8875Z' fill='#1A4C96' />
  ));

  return (
    <button onClick={handleClick(direction)}>
      <svg width='100%' height='100%' viewBox='0 0 21 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
        {path}
      </svg>
    </button>
  );
};

export default TimelineEventChanger;
