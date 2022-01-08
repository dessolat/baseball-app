import React from 'react';
import cl from './HeaderTabs.module.scss';

const tabsArr = ['lineup', 'box', 'plays', 'videos'];

const HeaderTabs = ({ currentTab, handleClick }) => {
  const getClass = name => (currentTab === name ? cl.active : '');

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
