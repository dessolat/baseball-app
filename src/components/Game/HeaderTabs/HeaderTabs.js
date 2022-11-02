import React from 'react';
import { useSelector } from 'react-redux';
import cl from './HeaderTabs.module.scss';
import HeaderTabsButton from './HeaderTabsButton';

const HeaderTabs = ({ currentTab, handleClick }) => {
  const isVideo = useSelector(state => state.game.isVideo);

  const tabsArr = ['box'];
  isVideo ? tabsArr.push('videos', 'pitch', 'hit', 'run') : tabsArr.push('plays');

  const getClass = name =>
    currentTab === name ||
    (currentTab === 'plays' && name === 'pitch') ||
    (currentTab === 'pitch' && name === 'plays') ||
    (currentTab === 'videos' && name === 'plays' && !isVideo)
      ? cl.active
      : '';

  return (
    <ul className={cl.headerTabs}>
      {tabsArr.map((item, i) => (
        <HeaderTabsButton key={i} item={item} handleClick={handleClick} getClass={getClass} />
      ))}
    </ul>
  );
};

export default HeaderTabs;
