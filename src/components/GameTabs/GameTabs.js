import React from 'react';
import { NavLink } from 'react-router-dom';
import cl from './GameTabs.module.scss'

const GameTabs = () => {
  return (
    <ul className={cl.gameTabs}>
      <li>
        <NavLink to={`/game/lineup`} activeClassName={cl.active}>
          Lineup
        </NavLink>
      </li>
      <li>
        <NavLink to={`/game/box`} activeClassName={cl.active}>
          Box
        </NavLink>
      </li>
      <li>
        <NavLink to={`/game/plays`} activeClassName={cl.active}>
          Plays
        </NavLink>
      </li>
      <li>
        <NavLink to={`/game/videos`} activeClassName={cl.active}>
          Videos
        </NavLink>
      </li>
    </ul>
  );
};

export default GameTabs;
