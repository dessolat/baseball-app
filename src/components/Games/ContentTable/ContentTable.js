import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentStadium } from 'redux/gamesReducer';
import { getShortName } from 'utils';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';

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

const ContentTable = ({ games }) => {
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentDate = useSelector(state => state.shared.currentDate);
  const leagues = useSelector(state => state.games.leagues);
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);
  const dispatch = useDispatch();

  const scrollItemRef = useRef(null);

  useEffect(() => {
    if (scrollItemRef.current === null) return;

    scrollItemRef.current.parentNode.scrollTop = scrollItemRef.current.offsetTop;
  }, [currentDate, currentLeague]);

  const handleStadiumDropdownClick = option => dispatch(setCurrentStadium(option));

  const filteredHeadings = games.filter(game => {
    return currentLeague.id === -1 ? currentGameType === game.game_type : game.league_id === currentLeague.id;
  });

  //Games filtering
  let filteredData = useMemo(() => {
    const filteredGames = games.filter(
      game =>
        (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
        (currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type)
      // 	&&
      // (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
      // (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
    );

    if (currentHome !== 'All' && currentGuests !== 'All') {
      return filteredGames.filter(
        game =>
          (game.owners_name === currentHome || game.owners_name === currentGuests) &&
          (game.guests_name === currentHome || game.guests_name === currentGuests)
      );
    }

    return currentHome !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentHome || game.guests_name === currentHome)
      : currentGuests !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentGuests || game.guests_name === currentGuests)
      : filteredGames;
  }, [games, currentStadium, currentLeague, currentGameType, currentHome, currentGuests]);

  //Games sorting
  filteredData = useMemo(
    () =>
      filteredData
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .sort((a, b) => (a.date === b.date && a.start_time < b.start_time ? -1 : 1)),
    [filteredData]
  );

  //stadiumOptions calculation
  const stadiumOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredHeadings.reduce(
            (sum, cur) => {
              sum.push(cur.stadium_name);
              return sum;
            },
            ['All']
          )
        )
      ),
    [filteredHeadings]
  );

  const headerStyles = [cl.tableHeader];
  currentLeague.id !== -1 && headerStyles.push(cl.paddingRightOne);

  return (
    <div className={cl.wrapper}>
      <ContentTableHeader games={games} />

      {(!isMobile || mobileTableMode === 'Calendar') && JSON.stringify(currentDate) !== null && (
        <div className={cl.table}>
          <div className={headerStyles.join(' ')}>
            <div>Time</div>
            <div>
              <Dropdown
                title={'Stadium'}
                options={stadiumOptions}
                currentOption={currentStadium}
                handleClick={handleStadiumDropdownClick}
                listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
              />
            </div>
            <div>Home</div>
            <div> </div>
            <div>Guests</div>
            <div> </div>
            <div>Inn</div>
            {currentLeague.id === -1 && <div>League</div>}
          </div>
          <ul className={cl.rows}>
            {filteredData.map((game, index, arr) => {
              const isDate = index === 0 || arr[index].date !== arr[index - 1].date;
              const isActive = currentDate.toJSON().slice(0, 10) === game.date;
              const weekDay = ', ' + WEEK_DAYS[new Date(game.date).getDay()];
              const dataBefore = isDate
                ? game.date.slice(8, 10) + ' ' + MONTHS[game.date.slice(5, 7)] + weekDay
                : null;

              const classes = [cl.tableRow];
              isDate && classes.push(cl.withDate);
              isActive && classes.push(cl.active);
              currentLeague.id !== -1 && classes.push(cl.paddingRightOne);
              return (
                <li
                  key={game.id}
                  ref={isActive && isDate ? scrollItemRef : null}
                  className={classes.join(' ')}
                  data-before={dataBefore}>
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
                  <div className={cl.links}>
                    <div>
                      <Link to={`/game/${game.id}?tab=box`}>Box</Link>
                      <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
                      {game.hasVideos && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
                    </div>
                  </div>
                  <div>{game.inn !== null ? `${game.inn} inn` : '—'} </div>
                  {currentLeague.id === -1 && (
                    <div>{leagues.find(league => league.id === game.league_id)?.name}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentTable;
