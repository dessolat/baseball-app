import React, { useState } from 'react';
import cl from './ContentMobileBox.module.scss';

const STATE_VALUES = ['Batting', 'Running', 'Fielding', 'Pitching', 'Catching', 'Info'];

const MobileBoxHeader = () => {
  const [currentMode, setCurrentMode] = useState('Batting');

  const getClass = name => (currentMode === name ? cl.active : null);

  const handleClick = name => () => setCurrentMode(name);
  return (
    <div className={cl.boxHeader}>
      {STATE_VALUES.map((value, i) => (
        <button key={i} className={getClass(value)} onClick={handleClick(value)}>
          {value}
        </button>
      ))}
    </div>
  );
};

export default MobileBoxHeader;
