import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import cl from './PlaysFooter.module.scss';

const PlaysFooter = () => {
  const [tab, setTab] = useQueryParam('ptab', StringParam);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const tab = searchParams.get('ptab');

  // const handleTabClick = e => setSearchParams({ ptab: e.target.name });
  const handleClick = e => setTab(e.target.name);

  const getClass = name => {
    const values = ['pitch', 'hitting', 'running'];

    if (tab === name || (name === 'pitch' && (!tab || !values.includes(tab)))) return cl.active;
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
