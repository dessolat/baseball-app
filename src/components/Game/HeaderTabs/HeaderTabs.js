import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useTabs from 'hooks/useTabs';
import cl from './HeaderTabs.module.scss';

const HeaderTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  const handleTabClick = e => setSearchParams({ tab: e.target.name });

  const getClass = name => {
    if (tab === name || (name === 'plays' && !tab)) return cl.active;
    return '';
  };

  return (
    <ul className={cl.headerTabs}>
      <li>
        <button name='lineup' onClick={handleTabClick} className={getClass('lineup')}>
          Lineup
        </button>
      </li>
      <li>
        <button name='box' onClick={handleTabClick} className={getClass('box')}>
          Box
        </button>
      </li>
      <li>
        <button name='plays' onClick={handleTabClick} className={getClass('plays')}>
          Plays
        </button>
      </li>
      <li>
        <button name='videos' onClick={handleTabClick} className={getClass('videos')}>
          Videos
        </button>
      </li>
    </ul>
  );
};

export default HeaderTabs;
