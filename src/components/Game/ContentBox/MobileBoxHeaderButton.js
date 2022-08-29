import React from 'react';

const MobileBoxHeaderButton = ({ value, getClass, handleClick }) => {
  return (
    <button className={getClass(value)} onClick={handleClick(value)}>
      {value}
    </button>
  );
};

export default MobileBoxHeaderButton;
