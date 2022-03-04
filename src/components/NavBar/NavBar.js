import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from './NavBar.module.scss';

const ROUTES = {
  games: '/games',
  stats: '/stats'
};

const NavBar = () => {
  const location = useLocation();

  const getClass = name => (location.pathname.slice(0, ROUTES[name].length) === ROUTES[name] ? cl.active : '');
  return (
    <nav className={cl.navbar}>
      <Link to='/games' className={getClass('games')}>Schedule</Link>
      <Link to='/stats/player' className={getClass('stats')}>Stats</Link>
    </nav>
  );
};

export default NavBar;
