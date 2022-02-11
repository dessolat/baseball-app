import React from 'react';
import cl from './HeaderSelections.module.scss';

const HeaderSelections = () => {
  return (
    <div className={cl.selections}>
      <ul className={cl.years}>
        <li>
          2021 
          <svg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0.904896 0.455675L0.00390625 1.5116L3.8379 6.00488L7.6719 1.5116L6.77091 0.455675L3.8379 3.88555L0.904896 0.455675Z'
              fill='#D1D1D1'
            />
          </svg>
        </li>
      </ul>
      <ul className={cl.types}>
        <li className={cl.active}>Baseball</li>
        <li>Softball</li>
      </ul>
    </div>
  );
};

export default HeaderSelections;
