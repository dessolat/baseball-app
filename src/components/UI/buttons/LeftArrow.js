import React from 'react';

const LeftArrow = ({ cl, scroll }) => {
  return (
    <button className={cl.arrowBtn} onClick={scroll} name='scroll-left'>
      <svg className={cl.arrowImg} viewBox='0 0 11 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M11 2.2325L8.90688 0L0 9.5L8.90688 19L11 16.7675L4.20108 9.5L11 2.2325Z' fill='#D1D1D1' />
      </svg>
    </button>
  );
};

export default LeftArrow;
