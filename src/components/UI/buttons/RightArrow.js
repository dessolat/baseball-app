import React from 'react';

const RightArrow = ({cl, scroll}) => {
  return (
    <button className={cl.arrowBtn} onClick={scroll} name='scroll-right'>
      <svg className={cl.arrowImg} viewBox='0 0 11 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M2.09312 0L0 2.2325L6.79892 9.5L0 16.7675L2.09312 19L11 9.5L2.09312 0Z' fill='#D1D1D1' />
      </svg>
    </button>
  );
};

export default RightArrow;
