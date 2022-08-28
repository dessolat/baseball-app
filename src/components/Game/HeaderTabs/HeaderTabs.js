import React from 'react';
import { useSelector } from 'react-redux';
import cl from './HeaderTabs.module.scss';
import HeaderTabsButton from './HeaderTabsButton';

const HeaderTabs = ({ currentTab, handleClick }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const tabsArr = isVideo ? ['box', 'plays', 'videos'] : ['box', 'plays'];

  const getClass = name =>
    currentTab === name || (currentTab === 'videos' && name === 'plays' && !isVideo) ? cl.active : '';
  return (
    <ul className={cl.headerTabs}>
      {tabsArr.map((item, i) => (
        <HeaderTabsButton key={i} item={item} handleClick={handleClick} getClass={getClass} />
      ))}
    </ul>
  );
};

export default HeaderTabs;
