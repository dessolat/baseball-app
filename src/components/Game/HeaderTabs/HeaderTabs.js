import React from 'react';
import { useSelector } from 'react-redux';
import cl from './HeaderTabs.module.scss';


const HeaderTabs = ({ currentTab, handleClick }) => {
	const isVideo = useSelector(state => state.game.isVideo)

	const tabsArr = isVideo ? ['box', 'plays', 'videos'] : ['box', 'plays'];

	const getClass = name => (currentTab === name || (currentTab === 'videos' && name === 'plays' && !isVideo) ? cl.active : '');
  return (
    <ul className={cl.headerTabs}>
      {tabsArr.map((item, i) => (
        <li key={i}>
          <button name={item} onClick={handleClick} className={getClass(item)}>
            {item[0].toUpperCase()}
            {item.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HeaderTabs;
