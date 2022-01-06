import React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import cl from './HeaderTabs.module.scss';

const tabsArr = ['lineup', 'box', 'plays', 'videos']

const HeaderTabs = () => {
  const [tab, setTab] = useQueryParam('tab', StringParam);

  const handleTabClick = e => setTab(e.target.name);

  const getClass = name => {
		const values = ['lineup', 'box', 'videos']

    if (tab === name || (name === 'plays' && (!tab || !values.includes(tab)))) return cl.active;
    return '';
  };

  return (
    <ul className={cl.headerTabs}>
			{tabsArr.map(item => <li>
        <button name={item} onClick={handleTabClick} className={getClass(item)}>
          {item[0].toUpperCase()}{item.slice(1)}
        </button>
      </li>)}
    </ul>
  );
};

export default HeaderTabs;
