import React from 'react';
import cl from './Cross.module.scss';

const Cross = ({ imgSrc, handleClick, alt = 'close' }) => {
  return (
    <button className={cl.crossBtn} onClick={handleClick}>
      <img src={imgSrc} alt={alt} />
    </button>
  );
};

export default Cross;
