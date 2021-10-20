import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import cl from './GameHeader.module.scss';

const GameHeader = () => {
  const { url } = useRouteMatch();

  return (
    <header className={cl.header}>
      <div>
        <p className={cl.date}>Aug 23, 2021</p>
        <p className={cl.location}>at Moscow (Russtar Arena)</p>
        <ul className={cl.gameTabs}>
          <li>
            <NavLink to={`${url}/lineup`} activeClassName={cl.active}>
              Lineup
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}/box`} activeClassName={cl.active}>
              Box
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}/plays`} activeClassName={cl.active}>
              Plays
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}/videos`} activeClassName={cl.active}>
              Videos
            </NavLink>
          </li>
        </ul>
      </div>
			
    </header>
  );
};

export default GameHeader;
