import React from 'react';
import cl from './HeaderSelections.module.scss';

const HeaderSelections = () => {
  return (
    <div className={cl.selections}>
      <ul className={cl.years}>
        <li className={cl.active}>2021</li>
        <li>2022</li>
      </ul>
      <ul className={cl.types}>
        <li>All</li>
        <li className={cl.active}>Baseball</li>
        <li>Softball</li>
      </ul>
    </div>
  );
};

export default HeaderSelections;
