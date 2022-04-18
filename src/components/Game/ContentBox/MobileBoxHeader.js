import React from 'react';
import cl from './ContentMobileBox.module.scss';

const STATE_VALUES = ['Batting', 'Running', 'Fielding', 'Pitching', 'Catching', 'Info'];

const MobileBoxHeader = () => {
  return (
    <div className={cl.boxHeader}>
      {STATE_VALUES.map((value, i) => (
        <button key={i}>{value}</button>
      ))}
    </div>
  );
};

export default MobileBoxHeader;
