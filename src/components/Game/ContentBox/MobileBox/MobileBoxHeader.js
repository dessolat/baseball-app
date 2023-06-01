import React from 'react';
import cl from './ContentMobileBox.module.scss';
import MobileBoxHeaderButton from './MobileBoxHeaderButton';
import { setBoxMode } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';

const STATE_VALUES = ['Batting', 'Running', 'Fielding', 'Pitching', 'Catching', 'Info'];

const MobileBoxHeader = ({ currentMode }) => {
  const dispatch = useDispatch();

  const getClass = name => (currentMode === name ? cl.active : null);

  const handleClick = name => () => dispatch(setBoxMode(name));
  return (
    <div className={cl.boxHeader}>
      {STATE_VALUES.map((value, i) => (
        <MobileBoxHeaderButton key={i} value={value} getClass={getClass} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default MobileBoxHeader;
