import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from './NavBar.module.scss';

const ROUTES = {
  games: ['/games', '/games/'],
  stats: ['/stats/player', '/stats/player/', '/stats/team', '/stats/team/']
};

const NavBar = () => {
  const location = useLocation();

  const getClass = name => (ROUTES[name].includes(location.pathname) ? cl.active : '');
  return (
    <nav className={cl.navbar}>
      <Link to='/games' className={getClass('games')}>
        Schedule
      </Link>
      <Link to='/stats/player' className={getClass('stats')}>
        Stats
      </Link>
      <Link to='/stats/player' className={getClass('stats')}>
        Stats
      </Link>
    </nav>
  );
};

export default NavBar;
