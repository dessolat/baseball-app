import React from 'react';
import cl from './ContentMobileBox.module.scss';
import MobileBoxHeaderButton from './MobileBoxHeaderButton';

const STATE_VALUES = ['Batting', 'Running', 'Fielding', 'Pitching', 'Catching', 'Info'];

const MobileBoxHeader = ({ currentMode, setCurrentMode }) => {
  const getClass = name => (currentMode === name ? cl.active : null);

  const handleClick = name => () => setCurrentMode(name);
  return (
    <div className={cl.boxHeader}>
      {STATE_VALUES.map((value, i) => (
        <MobileBoxHeaderButton key={i} value={value} getClass={getClass} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default MobileBoxHeader;
