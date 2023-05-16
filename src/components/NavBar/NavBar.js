import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cl from './NavBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

const ROUTES = {
  game: ['/game', '/game/'],
  games: ['/games', '/games/'],
  stats: ['/stats/player', '/stats/player/', '/stats/team', '/stats/team/']
};

const NavBar = () => {
  const location = useLocation();

  const currentTab = useSelector(s => s.game.currentTab);

  const isLandscapeVideos = currentTab === 'videos' && location.pathname.includes('/game/');

  const getClass = name => (ROUTES[name].includes(location.pathname) ? cl.active : '');

  const wrapperClasses = classNames(cl.navbar, {
    [cl.landscapeDisplayNone]: isLandscapeVideos
  });
  return (
    <nav className={wrapperClasses}>
      <Link to='/games' className={getClass('games')}>
        Schedule
      </Link>
      <Link to='/stats/player' className={getClass('stats')}>
        Stats
      </Link>
    </nav>
  );
};

export default NavBar;
