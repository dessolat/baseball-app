import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentGuests, setCurrentHome, setCurrentStadium } from 'redux/gamesReducer';
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

const ContentTable = ({ games }) => {
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);
  const currentGameType = useSelector(state => state.games.currentGameType);
  const currentDate = useSelector(state => state.games.currentDate);
  const dispatch = useDispatch();

  const scrollItemRef = useRef(null);

  useEffect(() => {
    if (scrollItemRef.current === null) return;

    scrollItemRef.current.parentNode.scrollTop = scrollItemRef.current.offsetTop;
  }, [currentDate, currentLeague]);

  const handleStadiumDropdownClick = option => dispatch(setCurrentStadium(option));
  const handleHomeDropdownClick = option => dispatch(setCurrentHome(option));
  const handleGuestsDropdownClick = option => dispatch(setCurrentGuests(option));

  const filteredHeadings = games.filter(game => {
    return currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type;
  });

  //Games filtering
  let filteredData = useMemo(
    () =>
      games.filter(
        game =>
          (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
          (currentLeague.id !== -1
            ? game.league_id === currentLeague.id
            : currentGameType === game.game_type) &&
          (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
          (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
      ),
    [games, currentStadium, currentLeague, currentGameType, currentHome, currentGuests]
  );

  //Games sorting
  filteredData = useMemo(() => filteredData.sort((a, b) => (a.date > b.date ? 1 : -1)), [filteredData]);

  const stadiumOptions = Array.from(
    new Set(
      filteredHeadings.reduce(
        (sum, cur) => {
          sum.push(cur.stadium_name);
          return sum;
        },
        ['All']
      )
    )
  );
  const homeOptions = Array.from(
    new Set(
      filteredHeadings.reduce(
        (sum, cur) => {
          sum.push(cur.owners_name);
          return sum;
        },
        ['All']
      )
    )
  );

  const guestsOptions = Array.from(
    new Set(
      filteredHeadings.reduce(
        (sum, cur) => {
          sum.push(cur.guests_name);
          return sum;
        },
        ['All']
      )
    )
  );

  return (
    <div className={cl.wrapper}>
      <ContentTableHeader />

      <div className={cl.table}>
        <div className={cl.tableHeader}>
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
          <div>
            <Dropdown
              title={'Home'}
              options={homeOptions}
              currentOption={currentHome}
              handleClick={handleHomeDropdownClick}
              listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
            />
          </div>
          <div> </div>
          <div>
            <Dropdown
              title={'Guests'}
              options={guestsOptions}
              currentOption={currentGuests}
              handleClick={handleGuestsDropdownClick}
              listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
            />
          </div>
          <div> </div>
          <div>Inn</div>
        </div>
        <ul className={cl.rows}>
          {filteredData.map((game, index, arr) => {
            const isDate = index === 0 || arr[index].date !== arr[index - 1].date;
            const isActive = currentDate.toJSON().slice(0, 10) === game.date;
            const dataBefore = isDate ? game.date.slice(8, 10) + ' ' + MONTHS[game.date.slice(5, 7)] : null;

            const classes = [cl.tableRow];
            isDate && classes.push(cl.withDate);
            isActive && classes.push(cl.active);
            return (
              <li
                key={game.id}
                ref={isActive && isDate ? scrollItemRef : null}
                className={classes.join(' ')}
                data-before={dataBefore}>
                <div>{game.start_time.slice(0, 5)}</div>
                <div>{game.stadium_name}</div>
                <div>
                  <Link to={`/games/team/${game.owners_name}`}> {getShortName(game.owners_name, 28)}</Link>
                </div>
                <div>
                  {game.score_owners} - {game.score_guests}
                </div>
                <div>
                  <Link to={`/games/team/${game.guests_name}`}> {getShortName(game.guests_name, 28)}</Link>
                </div>
                <div className={cl.links}>
                  <div>
                    <Link to={`/game/${game.id}?tab=box`}>Box</Link>
                    <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
                    {game.hasVideos && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
                  </div>
                </div>
                <div>{game.inn !== null ? `${game.inn} inn` : '—'} </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ContentTable;
