import useQuery from 'hooks/useQuery';
import React from 'react';
import { Link } from 'react-router-dom';
import cl from './HeaderTabs.module.scss';

const HeaderTabs = () => {
  const tab = useQuery().get('tab');
  return (
    <ul className={cl.headerTabs}>
      <li>
        <Link to='?tab=lineup' className={tab === 'lineup' ? cl.active : ''}>
          Lineup
        </Link>
      </li>
      <li>
        <Link to='?tab=box' className={tab === 'box' ? cl.active : ''}>
          Box
        </Link>
      </li>
      <li>
        <Link to='?tab=plays' className={tab === 'plays' ? cl.active : ''}>
          Plays
        </Link>
      </li>
      <li>
        <Link to='?tab=videos' className={tab === 'videos' ? cl.active : ''}>
          Videos
        </Link>
      </li>
    </ul>
  );
};

export default HeaderTabs;
