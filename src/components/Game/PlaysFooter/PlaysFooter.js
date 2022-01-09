import React from 'react';
import cl from './PlaysFooter.module.scss';

const PlaysFooter = ({ currentTab, handleClick }) => {
  const getClass = name => currentTab === name ? cl.active : '';

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
