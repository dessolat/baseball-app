import React from 'react';
import cl from './PlaysFooter.module.scss';
// import { useSearchParams } from 'react-router-dom';

const PlaysFooter = ({footerTab, setFooterTab}) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const tab = searchParams.get('ptab');

  // const handleTabClick = e => setSearchParams({ ptab: e.target.name });
  const handleTabClick = e => setFooterTab(e.target.name);
  return (
    <ul className={cl.footer}>
      <li>
        <button name='pitch' onClick={handleTabClick} className={footerTab === 'pitch' ? cl.active : ''}>
          Pitch
        </button>
      </li>
      <li>
        <button name='hitting' onClick={handleTabClick} className={footerTab === 'hitting' ? cl.active : ''}>
          Hitting
        </button>
      </li>
      <li>
        <button
          name='running_fielding'
          onClick={handleTabClick}
          className={footerTab === 'running' ? cl.active : ''}>
          Running/Fielding
        </button>
      </li>
    </ul>
  );
};

export default PlaysFooter;
