import classNames from 'classnames';
import Ellipse from 'components/UI/icons/Ellipse';
import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentTab } from 'redux/gameReducer';
import { getShortName } from 'utils';

const MONTHS = {
  '01': 'january',
  '02': 'february',
  '03': 'march',
  '04': 'april',
  '05': 'may',
  '06': 'june',
  '07': 'july',
  '08': 'august',
  '09': 'september',
  10: 'october',
  11: 'november',
  12: 'december'
};

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ItemLinks = ({ game, linksClass }) => {
  const dispatch = useDispatch();

  const handleLinkClick = tabTitle => () => dispatch(setCurrentTab(tabTitle));
  return (
    <div className={linksClass}>
      <div>
        {game.has_moments && (
          <>
            <Link to={`/game/${game.id}?tab=box`} onClick={handleLinkClick('box')}>
              Box
            </Link>
            <Link
              to={`/game/${game.id}?tab=${game.has_videos ? 'pitch' : 'plays'}`}
              onClick={handleLinkClick(game.has_videos ? 'pitch' : 'plays')}>
              {game.has_videos ? 'Pitch' : 'Plays'}
            </Link>
          </>
        )}
        {game.has_videos && (
          <Link to={`/game/${game.id}?tab=videos`} onClick={handleLinkClick('videos')}>
            Videos
          </Link>
        )}
      </div>
    </div>
  );
};

const ContentTableListItem = ({ game, index, arr, cl }, ref) => {
  const leagues = useSelector(state => state.games.leagues);
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentDate = useSelector(state => state.shared.currentDate);
  const scrollItemRef = ref;

  const isDate = index === 0 || arr[index].date !== arr[index - 1].date;
  const isActive = currentDate.toJSON().slice(0, 10) === game.date;
  const weekDay = ', ' + WEEK_DAYS[new Date(game.date).getDay()];
  const dataBefore = isDate ? game.date.slice(8, 10) + ' ' + MONTHS[game.date.slice(5, 7)] + weekDay : null;

  const gameStartFullTime = new Date(game.date + ' ' + game.start_time);

  const tableRowClasses = classNames(cl.tableRow, {
    [cl.withDate]: isDate,
    [cl.active]: isActive,
    [cl.paddingRightOne]: currentLeague.id !== -1
  });

  const completionClasses = classNames(cl.completionSign, {
    [cl.completedGame]: game.end_status,
    [cl.scheduledGame]: !game.end_status && gameStartFullTime > new Date(),
    [cl.incompletedGame]: !game.end_status && gameStartFullTime <= new Date()
  });
  return (
    <li ref={isActive && isDate ? scrollItemRef : null} className={tableRowClasses} data-before={dataBefore}>
      <div>{game.start_time.slice(0, 5)}</div>
      <div className={cl.stadiumName}>
        {game.stadium_name}
        {currentLeague.id === -1 && (
          <span> / {leagues.find(league => league.id === game.league_id)?.name}</span>
        )}
      </div>
      <div className={cl.underlineHover}>
        <Link to={`/games/team/${currentGameType.toLowerCase()}/${game.owners_name}`}>
          {' '}
          {getShortName(game.owners_name, isMobile ? 20 : 28)}
        </Link>
      </div>
      <div>
        {game.score_owners} - {game.score_guests}
      </div>
      <div className={cl.underlineHover}>
        <Link to={`/games/team/${currentGameType.toLowerCase()}/${game.guests_name}`}>
          {' '}
          {getShortName(game.guests_name, isMobile ? 20 : 28)}
        </Link>
      </div>
      <ItemLinks game={game} linksClass={cl.links} />
      <div>{game.inn !== null ? `${game.inn} inn` : '—'} </div>
      <div className={completionClasses}>
        {game.end_status !== null ? game.end_status : (game.has_moments && gameStartFullTime <= new Date()) ? 'In progress' : ''}
        {/* <Ellipse /> */}
      </div>
      {currentLeague.id === -1 && <div>{leagues.find(league => league.id === game.league_id)?.name}</div>}
    </li>
  );
};

export default forwardRef(ContentTableListItem);
