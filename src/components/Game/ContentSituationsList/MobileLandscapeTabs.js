import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParam } from 'utils';
import PlaysFooter from '../PlaysFooter/PlaysFooter';
import { setCurrentTab, setPitchState } from 'redux/gameReducer';
import { useSelector } from 'react-redux';

const MobileLandscapeTabs = ({ cl }) => {
  const currentTab = useSelector(s => s.game.currentTab);

  const dispatch = useDispatch();

  const handleTabClick = e => {
    setSearchParam('ptab', e.target.name);
    dispatch(setCurrentTab(e.target.name));
    dispatch(setPitchState('Field'));
  };

  return (
    <div className={cl.landscapeOnly}>
      <PlaysFooter currentTab={currentTab} handleClick={handleTabClick} />
    </div>
  );
};

export default MobileLandscapeTabs;
