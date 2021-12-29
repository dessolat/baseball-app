import React from 'react';
import cl from './PlaysFooter.module.scss';
// import { useSearchParams } from 'react-router-dom';

const PlaysFooter = ({footerTab, setFooterTab}) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const tab = searchParams.get('ptab');

  // const handleTabClick = e => setSearchParams({ ptab: e.target.name });
  const getClass = name => {
    if (tab === name || (name === 'pitch' && !tab)) return cl.active;
    return '';
  };

  return (
    <ul className={cl.footer}>
      <li>
        <button name='pitch' onClick={handleClick} className={getClass('pitch')}>
          Pitch
        </button>
      </li>
      <li>
        <button name='hitting' onClick={handleClick} className={getClass('hitting')}>
          Hitting
        </button>
      </li>
      <li>
        <button name='running' onClick={handleClick} className={getClass('running')}>
          Running/Fielding
        </button>
      </li>
    </ul>
  );
};

export default PlaysFooter;
