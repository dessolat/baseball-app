import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useTabs from 'hooks/useTabs';
import cl from './HeaderTabs.module.scss';

const HeaderTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  const handleTabClick = e => setSearchParams({ tab: e.target.name });


  return (
    <ul className={cl.headerTabs}>
      <li>
        <button name='lineup' onClick={handleTabClick} className={tab === 'lineup' ? cl.active : ''}>
          Lineup
        </button>
      </li>
      <li>
        <button name='box' onClick={handleTabClick} className={tab === 'box' ? cl.active : ''}>
          Box
        </button>
      </li>
      <li>
        <button name='plays' onClick={handleTabClick} className={useTabs(tab) ? cl.active : ''}>
          Plays
        </button>
      </li>
      <li>
        <button name='videos' onClick={handleTabClick} className={tab === 'videos' ? cl.active : ''}>
          Videos
        </button>
      </li>
    </ul>
  );
};

export default HeaderTabs;
